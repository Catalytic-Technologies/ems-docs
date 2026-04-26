#!/usr/bin/env node
/**
 * generate-tts.js
 *
 * Converts narration scripts in docs-automation/scripts/ to MP3 audio files
 * using the Azure Cognitive Services Text-to-Speech REST API with the
 * Asilia neural voice (sw-KE-AsiliiaNeural).
 *
 * Usage:
 *   node docs-automation/generate-tts.js              # process all scripts
 *   node docs-automation/generate-tts.js --module attendance  # single module
 *
 * Prerequisites:
 *   cp docs-automation/.env.example docs-automation/.env
 *   # fill in AZURE_TTS_KEY, AZURE_TTS_REGION, AZURE_TTS_VOICE
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

// ─── Config ──────────────────────────────────────────────────────────────────
const KEY = process.env.AZURE_TTS_KEY;
const REGION = process.env.AZURE_TTS_REGION || 'eastus';
const VOICE = process.env.AZURE_TTS_VOICE || 'sw-KE-AsiliiaNeural';
const SCRIPTS_DIR = path.join(__dirname, 'scripts');
const AUDIO_DIR = path.join(__dirname, 'audio');

if (!KEY) {
  console.error('❌ AZURE_TTS_KEY is not set in docs-automation/.env');
  process.exit(1);
}

if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build SSML from plain text.
 * Adds a slight pause between paragraphs for natural pacing.
 */
function buildSsml(text, voice) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n\n/g, '\n<break time="700ms"/>\n');

  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="sw-KE">
  <voice name="${voice}">
    <prosody rate="0.95" pitch="0%">
      ${escaped}
    </prosody>
  </voice>
</speak>`;
}

/**
 * Call the Azure TTS REST API and write the MP3 to disk.
 */
async function synthesise(ssml, outputPath) {
  return new Promise((resolve, reject) => {
    const endpoint = `${REGION}.tts.speech.microsoft.com`;
    const options = {
      hostname: endpoint,
      path: '/cognitiveservices/v1',
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-96kbitrate-mono-mp3',
        'User-Agent': 'ems-docs-tts-generator',
        'Content-Length': Buffer.byteLength(ssml, 'utf8'),
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => reject(new Error(`Azure TTS API error ${res.statusCode}: ${body}`)));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        fs.writeFileSync(outputPath, Buffer.concat(chunks));
        resolve();
      });
    });

    req.on('error', reject);
    req.write(ssml, 'utf8');
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const moduleArg = process.argv.includes('--module')
    ? process.argv[process.argv.indexOf('--module') + 1]
    : null;

  const scriptFiles = fs
    .readdirSync(SCRIPTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => !moduleArg || f === `${moduleArg}.md`);

  if (scriptFiles.length === 0) {
    console.error(moduleArg
      ? `❌ No script found for module "${moduleArg}". Expected: scripts/${moduleArg}.md`
      : '❌ No script files found in docs-automation/scripts/'
    );
    process.exit(1);
  }

  console.log(`🎙  Generating TTS audio using Azure voice: ${VOICE}`);
  console.log(`📂  Processing ${scriptFiles.length} script(s)...\n`);

  for (const file of scriptFiles) {
    const moduleName = path.basename(file, '.md');
    const scriptPath = path.join(SCRIPTS_DIR, file);
    const outputPath = path.join(AUDIO_DIR, `${moduleName}.mp3`);

    const text = fs.readFileSync(scriptPath, 'utf8').trim();
    if (!text) {
      console.warn(`⚠  Skipping empty script: ${file}`);
      continue;
    }

    const wordCount = text.split(/\s+/).length;
    const estDuration = Math.round(wordCount / 2.5); // ~150 wpm at 0.95 rate
    process.stdout.write(`  ${moduleName}.md (${wordCount} words, ~${estDuration}s) → audio/${moduleName}.mp3 ... `);

    const ssml = buildSsml(text, VOICE);
    await synthesise(ssml, outputPath);

    const sizeKb = Math.round(fs.statSync(outputPath).size / 1024);
    console.log(`✅ ${sizeKb} KB`);
  }

  console.log(`\n✅ All audio files saved to docs-automation/audio/`);
  console.log('Next step: run Playwright video specs, then merge-video.sh');
}

main().catch((err) => {
  console.error('❌ TTS generation failed:', err.message);
  process.exit(1);
});
