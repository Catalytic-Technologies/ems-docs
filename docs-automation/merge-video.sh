#!/usr/bin/env bash
# merge-video.sh
#
# Merges silent Playwright .webm screen recordings with Azure TTS .mp3
# narration audio to produce final tutorial .mp4 files.
#
# Usage:
#   bash docs-automation/merge-video.sh              # process all modules
#   bash docs-automation/merge-video.sh attendance   # single module
#
# Requirements:
#   ffmpeg must be installed: brew install ffmpeg  (macOS)
#                             apt install ffmpeg   (Linux)
#
# Input:
#   docs-automation/recordings/<module>/*.webm   — Playwright screen recording
#   docs-automation/audio/<module>.mp3           — Azure TTS narration
#
# Output:
#   docs-automation/output/<module>-final.mp4

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RECORDINGS_DIR="$SCRIPT_DIR/recordings"
AUDIO_DIR="$SCRIPT_DIR/audio"
TMP_DIR="$SCRIPT_DIR/tmp"
OUTPUT_DIR="$SCRIPT_DIR/output"

mkdir -p "$TMP_DIR" "$OUTPUT_DIR"

# ── Check ffmpeg ──────────────────────────────────────────────────────────────
if ! command -v ffmpeg &>/dev/null; then
  echo "❌ ffmpeg is not installed."
  echo "   macOS : brew install ffmpeg"
  echo "   Linux : sudo apt install ffmpeg"
  exit 1
fi

# ── Determine which modules to process ───────────────────────────────────────
if [[ $# -gt 0 ]]; then
  MODULES=("$1")
else
  MODULES=()
  for dir in "$RECORDINGS_DIR"/*/; do
    module="$(basename "$dir")"
    MODULES+=("$module")
  done
fi

if [[ ${#MODULES[@]} -eq 0 ]]; then
  echo "❌ No recordings found in $RECORDINGS_DIR"
  echo "   Run Playwright video specs first:"
  echo "   npx playwright test docs-automation/videos/ --project=videos"
  exit 1
fi

echo "🎬 Processing ${#MODULES[@]} module(s)..."
echo ""

# ── Process each module ───────────────────────────────────────────────────────
SUCCESS=0
SKIP=0
FAIL=0

for module in "${MODULES[@]}"; do
  echo "── $module ──────────────────────────────────────────────"

  RECORDING_DIR="$RECORDINGS_DIR/$module"
  AUDIO_FILE="$AUDIO_DIR/${module}.mp3"
  TMP_SILENT="$TMP_DIR/${module}-silent.mp4"
  OUTPUT_FILE="$OUTPUT_DIR/${module}-final.mp4"

  # Find the most recent .webm in the recording dir
  WEBM_FILE="$(find "$RECORDING_DIR" -name '*.webm' -type f 2>/dev/null | sort -t_ -k2 -n | tail -1)"

  if [[ -z "$WEBM_FILE" ]]; then
    echo "  ⚠  No .webm found in $RECORDING_DIR — skipping"
    ((SKIP++)) || true
    continue
  fi

  if [[ ! -f "$AUDIO_FILE" ]]; then
    echo "  ⚠  No audio file at $AUDIO_FILE — run generate-tts.js first"
    ((SKIP++)) || true
    continue
  fi

  echo "  📹 Screen  : $(basename "$WEBM_FILE")"
  echo "  🔊 Audio   : $(basename "$AUDIO_FILE")"

  # Step 1: Convert .webm → .mp4 (re-encode video for broad compatibility)
  echo "  ⚙  Converting .webm → .mp4 ..."
  ffmpeg -y -i "$WEBM_FILE" \
    -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" \
    -c:v libx264 -preset fast -crf 20 \
    -an \
    "$TMP_SILENT" 2>/dev/null

  # Step 2: Get durations
  VIDEO_DURATION=$(ffprobe -v error -show_entries format=duration \
    -of default=noprint_wrappers=1:nokey=1 "$TMP_SILENT" 2>/dev/null)
  AUDIO_DURATION=$(ffprobe -v error -show_entries format=duration \
    -of default=noprint_wrappers=1:nokey=1 "$AUDIO_FILE" 2>/dev/null)

  echo "  ⏱  Video : ${VIDEO_DURATION}s | Audio : ${AUDIO_DURATION}s"

  # Step 3: Merge — audio drives the final duration (-shortest trims whichever is longer)
  echo "  🔗 Merging video + audio ..."
  ffmpeg -y \
    -i "$TMP_SILENT" \
    -i "$AUDIO_FILE" \
    -c:v copy \
    -c:a aac -b:a 128k \
    -shortest \
    "$OUTPUT_FILE" 2>/dev/null

  FINAL_SIZE=$(du -sh "$OUTPUT_FILE" | cut -f1)
  echo "  ✅ Output  : output/${module}-final.mp4 (${FINAL_SIZE})"
  echo ""
  ((SUCCESS++)) || true
done

# ── Summary ───────────────────────────────────────────────────────────────────
echo "════════════════════════════════════════"
echo "  Done: $SUCCESS merged, $SKIP skipped, $FAIL failed"
echo "  Output directory: $OUTPUT_DIR"
echo ""
echo "  Next steps:"
echo "  1. Review each video in $OUTPUT_DIR"
echo "  2. Upload to YouTube (unlisted)"
echo "  3. Add the YouTube video ID to the <iframe> in the corresponding doc page"
echo "════════════════════════════════════════"
