#!/bin/bash
set -e
TARGET_SIZE="$1"
TARGET_QUALITY="$2"
INPUT_FILE="$3"


usage () {
  printf "\n\nUsage: %s <target_size> [target_quality] <input_file>\n" "$(basename "$0")"
  exit 1
}
if [[ -f "$TARGET_SIZE" ]]; then
  INPUT_FILE="$TARGET_SIZE"
  TARGET_SIZE=200
  TARGET_QUALITY=90
fi
if [[ -f "$TARGET_QUALITY" ]]; then
  INPUT_FILE="$TARGET_QUALITY"
  TARGET_QUALITY=90
fi

if [[ ! -f "$INPUT_FILE" ]]; then
  printf "\n❌ Input file %s does not exist\n" "$INPUT_FILE"
  usage
fi

TARGET_FILE="$(dirname "$INPUT_FILE")/$(basename "$INPUT_FILE" .webp)-${TARGET_SIZE}__${TARGET_QUALITY}.webp"

if [[ -f "$TARGET_FILE" ]]; then
  printf "\n⚠️  Target file %s already exists\n" "$TARGET_FILE"
  usage
fi

cwebp \
  -q "$TARGET_QUALITY" \
  -resize "$TARGET_SIZE" "$TARGET_SIZE" \
  "$INPUT_FILE" \
  -o "$TARGET_FILE"

# TARGET_FILE="$(dirname "$INPUT_FILE")/$(basename "$INPUT_FILE" .webp)-${TARGET_SIZE}__90.webp"
# cwebp -q 90 -resize "$TARGET_SIZE" "$TARGET_SIZE" "$INPUT_FILE" -o "$TARGET_FILE"
# TARGET_FILE="$(dirname "$INPUT_FILE")/$(basename "$INPUT_FILE" .webp)-${TARGET_SIZE}__80.webp"
# cwebp -q 80 -resize "$TARGET_SIZE" "$TARGET_SIZE" "$INPUT_FILE" -o "$TARGET_FILE"
# TARGET_FILE="$(dirname "$INPUT_FILE")/$(basename "$INPUT_FILE" .webp)-${TARGET_SIZE}__70.webp"
# cwebp -q 70 -resize "$TARGET_SIZE" "$TARGET_SIZE" "$INPUT_FILE" -o "$TARGET_FILE"


if [[ $? -ne 0 ]]; then
  printf "\n❌ Error resizing %s to %s\n" "$INPUT_FILE" "$TARGET_SIZE"
  exit 1
fi