#!/usr/bin/env node
/**
 * generate-tts.js
 *
 * Converts narration scripts in docs-automation/scripts/ to MP3 audio files
 * using the Azure Cognitive Services Text-to-Speech REST API with the
 * Asilia neural voice (en-KE-AsiliaNeural).
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
const VOICE = process.env.AZURE_TTS_VOICE || 'en-KE-AsiliaNeural';
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
  // Derive locale from voice name prefix, e.g. "en-KE-AsiliaNeural" → "en-KE"
  const lang = voice.split('-').slice(0, 2).join('-');

  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n\n/g, '\n<break time="700ms"/>\n');

  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${lang}">
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
    const body = Buffer.from(ssml, 'utf8');
    const endpoint = `${REGION}.tts.speech.microsoft.com`;
    const options = {
      hostname: endpoint,
      path: '/cognitiveservices/v1',
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': KEY,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-96kbitrate-mono-mp3',
        'User-Agent': 'ems-docs-tts/1.0',
        'Content-Length': body.length,
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
      res.on('end', () => {
        if (res.statusCode !== 200) {
          const errorBody = Buffer.concat(chunks).toString('utf8');
          const hint = res.statusCode === 401
            ? ' (check AZURE_TTS_KEY)'
            : res.statusCode === 400
            ? ' (invalid SSML or voice not available in this region)'
            : '';
          reject(new Error(
            `Azure TTS API error ${res.statusCode}${hint}\n` +
            `  Endpoint : https://${endpoint}/cognitiveservices/v1\n` +
            `  Region   : ${REGION}\n` +
            `  Voice    : ${VOICE}\n` +
            `  Response : ${errorBody || '(empty body)'}`
          ));
          return;
        }
        fs.writeFileSync(outputPath, Buffer.concat(chunks));
        resolve();
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Credential check ─────────────────────────────────────────────────────────

/**
 * GET /cognitiveservices/voices/list — quick check that KEY + REGION are valid.
 * Exits with a descriptive message if they are not.
 */
async function checkCredentials() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: `${REGION}.tts.speech.microsoft.com`,
      path: '/cognitiveservices/voices/list',
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': KEY },
    };
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const voices = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            const swVoices = voices.filter((v) => v.Locale && v.Locale.startsWith('sw-'));
            console.log(`✅ Credentials valid — ${voices.length} voices available in "${REGION}"`);
            if (swVoices.length) {
              console.log('   Swahili voices in this region:');
              swVoices.forEach((v) => console.log(`     ${v.ShortName}  (${v.Gender})`));
            } else {
              console.warn('   ⚠  No Swahili voices found in this region. Try: eastus, westeurope, southeastasia');
            }
            resolve();
          } catch {
            resolve(); // response wasn't JSON but status was 200 — still valid
          }
        } else {
          const body = Buffer.concat(chunks).toString('utf8');
          reject(new Error(
            `Credential check failed — HTTP ${res.statusCode}\n` +
            `  Endpoint : https://${REGION}.tts.speech.microsoft.com/cognitiveservices/voices/list\n` +
            `  Region   : ${REGION}\n` +
            `  Response : ${body || '(empty)'}\n\n` +
            `  Possible fixes:\n` +
            `    1. Check AZURE_TTS_REGION in .env — must match your Speech resource location in the Azure Portal.\n` +
            `       Common values: eastus  westeurope  southeastasia  australiaeast  uksouth\n` +
            `    2. Check AZURE_TTS_KEY — use the key from your Speech resource (not Azure OpenAI or AI Foundry).\n` +
            `       Portal → Speech resource → Keys and Endpoint → KEY 1 (32 hex characters)\n`
          ));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // --check: validate credentials and list available Swahili voices, then exit.
  if (process.argv.includes('--check')) {
    await checkCredentials();
    return;
  }

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
