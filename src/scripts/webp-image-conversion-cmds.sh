#!/usr/bin/env bash

function webp_utils_help () {
  printf "\n📸 Shell/Bash Helper Functions for converting images to WebP format!\n\n"

  # Functions
  printf "Functions:\n"
  printf "\tfix_erroneous_webp_extensions - fixes files with erroneous .webp.ext patterns (e.g., .webp.webp, .webp.jpg)\n"
  printf "\tfind_old_image_formats - finds .png, .jpg, .jpeg, .bmp, .tif, .tiff images in the current folder.\n"
  printf "\tconvert_images_to_webp - converts images to WebP format\n"
  printf "\tgenerate_rm_cmds - generates rm commands for old format images\n\n"

  printf "Usage:\n"

  printf "\t0. Run 'convert_and_cleanup_images' to convert images to WebP format and auto remove the old formats.\n"
  printf "\tOR\n"
  printf "\t1. Run 'find_old_image_formats' to find images in the project.\n"
  printf "\t2. Run 'convert_images_to_webp' to convert images to WebP format.\n"
  printf "\t3. Run 'generate_rm_cmds' to generate 'rm' commands to remove original images.\n\n"
}

webp_utils_help

function find_erroneous_webp_extensions () {
  # Find files with erroneous .webp.ext patterns like .webp.webp or .webp.jpg
  find "$PWD" -type f -iname "*.webp.*" \
    \( \
    -not -iregex ".*/dist/.*" \
    -and -not -iregex ".*/.cache/.*" \
    -and -not -iregex ".*/\.screens/.*" \
    -and -not -iregex ".*/node_modules/.*" \
    -and -not -iregex ".*/public/icons/.*" \
    -and -not -iregex ".*/public/apple/.*" \
    -and -not -iregex ".*/public/apple.*" \)
}

function fix_erroneous_webp_extensions () {
  printf "\n🔧 Checking for files with erroneous .webp.ext patterns...\n\n"

  local count=0
  for file in $(find_erroneous_webp_extensions); do
    # Extract directory, basename, and extension
    dir=$(dirname "$file")
    basename=$(basename "$file")

    # Remove .webp from the middle: foo.webp.jpg -> foo.jpg, bar.webp.webp -> bar.webp
    # This removes the first occurrence of .webp from the filename
    new_basename="${basename/.webp./.}"
    new_file="$dir/$new_basename"

    if [[ "$file" != "$new_file" ]]; then
      printf "  Renaming: %s\n           -> %s\n" "$basename" "$new_basename"
      mv "$file" "$new_file"
      count=$((count + 1))
    fi
  done

  if [[ $count -eq 0 ]]; then
    printf "  No files with erroneous .webp extensions found.\n"
  else
    printf "\n✅ Fixed %d file(s) with erroneous .webp extensions.\n\n" "$count"
  fi
}

function find_old_image_formats () {
  # Find legacy images, ignoring the `dist`, `node_modules`, `.cache` folders
  find "$PWD" -type f \( \
       -iname \*.jpg \
    -o -iname \*.jpeg \
    -o -iname \*.png \
    -o -iname \*.gif \
    -o -iname \*.bmp \
    -o -iname \*.tif \
    -o -iname \*.tiff \) \
    \( \
    -not -iregex ".*/dist/.*" \
    -and -not -iregex ".*/.cache/.*" \
    -and -not -iregex ".*/.screens/.*" \
    -and -not -iregex ".*/node_modules/.*" \
    -and -not -iregex ".*/public/icons/.*" \
    -and -not -iregex ".*/public/apple/.*" \
    -and -not -iregex ".*/public/apple.*" \)
}


function convert_images_to_webp () {
  set +e

  AUTO_REMOVE_OLD_IMAGES="$1"

  # Convert images with `cwebp` (w/ 90 quality)
  for file in $(find_old_image_formats); do
    if [[ $file == *.gif ]]; then
      # GIFs need a different tool, gif2webp
      gif2webp -q 90 -mt "$file" -o "${file%.*}.webp"
    else
      cwebp -q 90 "$file" -o "${file%.*}.webp"
    fi

    # Ensure no errors occurred, optionally remove the old image
    if [[ $? -ne 0 ]]; then
      printf "\n❌ Error converting %s\n" "$file"
    else
      if [[ $AUTO_REMOVE_OLD_IMAGES == true ]]; then
        rm "$file"
      fi
    fi
  done
  printf "\n✅ Completed converting images to webp!\n\n"
}

# for file in src/content/posts/*.png; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# for file in src/content/posts/*.jpg; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# for file in src/content/posts/*.jpeg; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# printf "\n✅ Completed converting images to webp!\n\n"
# sleep 3

function generate_rm_cmds () {
  # print cmds to remove original images
  for file in $(find_old_image_formats); do echo rm "$file"; done
  printf "\n\n🔥 Optional: you can remove the old images by running the above 'rm' commands.\n"
}

function convert_and_cleanup_images () {
  fix_erroneous_webp_extensions
  convert_images_to_webp true
  # for file in $(find_old_image_formats); do rm "$file"; done
}

# print cmds to remove original images
# for file in src/content/posts/*/*.png; do echo rm "$file"; done
# for file in src/content/posts/*/*.jpg; do echo rm "$file"; done
# for file in src/content/posts/*/*.jpeg; do echo rm "$file"; done
# for file in src/content/posts/*/*.gif; do echo rm "$file"; done
