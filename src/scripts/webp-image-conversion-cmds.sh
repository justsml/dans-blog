#!/usr/bin/env bash

function webp_utils_help () {
  printf "\n📸 Shell/Bash Helper Functions for converting images to WebP format!\n\n"

  # Functions
  printf "Functions:\n"
  printf "\tfix_erroneous_webp_extensions - fixes files with erroneous .webp.ext patterns (e.g., .webp.webp, .webp.jpg)\n"
  printf "\tfind_old_image_formats [path] - finds .png, .jpg, .jpeg, .bmp, .tif, .tiff images under a file or directory.\n"
  printf "\tconvert_images_to_webp [remove] [path] - converts images to WebP format\n"
  printf "\tgenerate_rm_cmds - generates rm commands for old format images\n\n"

  printf "Usage:\n"

  printf "\t0. Run 'convert_and_cleanup_images [path]' to convert images and remove the old formats. The path defaults to the current directory.\n"
  printf "\tOR\n"
  printf "\t1. Run 'find_old_image_formats' to find images in the project.\n"
  printf "\t2. Run 'convert_images_to_webp' to convert images to WebP format.\n"
  printf "\t3. Run 'generate_rm_cmds' to generate 'rm' commands to remove original images.\n\n"
}

webp_utils_help

function find_erroneous_webp_extensions () {
  local target="${1:-$PWD}"
  local print_action="-print"
  if [[ "$target" == "--print0" ]]; then
    target="$PWD"
    print_action="-print0"
  elif [[ "${2:-}" == "--print0" ]]; then
    print_action="-print0"
  fi

  # Find files with erroneous .webp.ext patterns like .webp.webp or .webp.jpg
  find "$target" -type f -iname "*.webp.*" \
    \( \
    -not -iregex ".*/dist/.*" \
    -and -not -iregex ".*/.cache/.*" \
    -and -not -iregex ".*/\.screens/.*" \
    -and -not -iregex ".*/node_modules/.*" \
    -and -not -iregex ".*/public/icons/.*" \
    -and -not -iregex ".*/public/apple/.*" \
    -and -not -iregex ".*/public/apple.*" \) \
    "$print_action"
}

function fix_erroneous_webp_extensions () {
  local target="${1:-$PWD}"
  printf "\n🔧 Checking for files with erroneous .webp.ext patterns...\n\n"

  local count=0
  local file dir base_name new_basename new_file
  while IFS= read -r -d '' file; do
    # Extract directory, basename, and extension
    dir=$(dirname "$file")
    base_name=$(basename "$file")

    # Remove .webp from the middle: foo.webp.jpg -> foo.jpg, bar.webp.webp -> bar.webp
    # This removes the first occurrence of .webp from the filename
    new_basename="${base_name/.webp./.}"
    new_file="$dir/$new_basename"

    if [[ "$file" != "$new_file" ]]; then
      printf "  Renaming: %s\n           -> %s\n" "$base_name" "$new_basename"
      mv -- "$file" "$new_file"
      count=$((count + 1))
    fi
  done < <(find_erroneous_webp_extensions "$target" --print0)

  if [[ $count -eq 0 ]]; then
    printf "  No files with erroneous .webp extensions found.\n"
  else
    printf "\n✅ Fixed %d file(s) with erroneous .webp extensions.\n\n" "$count"
  fi
}

function find_old_image_formats () {
  local target="${1:-$PWD}"
  local print_action="-print"
  if [[ "$target" == "--print0" ]]; then
    target="$PWD"
    print_action="-print0"
  elif [[ "${2:-}" == "--print0" ]]; then
    print_action="-print0"
  fi

  # Find legacy images, ignoring the `dist`, `node_modules`, `.cache` folders
  find "$target" -type f \( \
       -iname "*.jpg" \
    -o -iname "*.jpeg" \
    -o -iname "*.png" \
    -o -iname "*.gif" \
    -o -iname "*.bmp" \
    -o -iname "*.tif" \
    -o -iname "*.tiff" \) \
    \( \
    -not -iregex ".*/dist/.*" \
    -and -not -iregex ".*/.cache/.*" \
    -and -not -iregex ".*/.screens/.*" \
    -and -not -iregex ".*/node_modules/.*" \
    -and -not -iregex ".*/public/icons/.*" \
    -and -not -iregex ".*/public/apple/.*" \
    -and -not -iregex ".*/public/apple.*" \) \
    "$print_action"
}


function convert_images_to_webp () {
  set +e

  local auto_remove_old_images="${1:-false}"
  local target="${2:-$PWD}"
  local file output_file

  # Convert images with `cwebp` (w/ 90 quality)
  while IFS= read -r -d '' file; do
    output_file="${file%.*}.webp"

    if [[ "$file" == *.[gG][iI][fF] ]]; then
      # GIFs need a different tool, gif2webp
      gif2webp -q 90 -mt "$file" -o "$output_file"
    else
      cwebp -q 90 "$file" -o "$output_file"
    fi

    if [[ $? -ne 0 ]]; then
      printf "\n❌ Error converting %s\n" "$file"
    else
      if [[ "$auto_remove_old_images" == true ]]; then
        rm -- "$file"
      fi
    fi
  done < <(find_old_image_formats "$target" --print0)
  printf "\n✅ Completed converting images to webp!\n\n"
}

# for file in src/content/posts/*.png; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# for file in src/content/posts/*.jpg; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# for file in src/content/posts/*.jpeg; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# printf "\n✅ Completed converting images to webp!\n\n"
# sleep 3

function generate_rm_cmds () {
  local target="${1:-$PWD}"
  # print cmds to remove original images
  local file
  while IFS= read -r -d '' file; do
    printf "rm -- %q\n" "$file"
  done < <(find_old_image_formats "$target" --print0)
  printf "\n\n🔥 Optional: you can remove the old images by running the above 'rm' commands.\n"
}

function convert_and_cleanup_images () {
  local target="${1:-$PWD}"

  if [[ ! -e "$target" ]]; then
    printf "\n❌ Input path %s does not exist\n" "$target" >&2
    return 1
  fi

  fix_erroneous_webp_extensions "$target"
  convert_images_to_webp true "$target"
  # for file in $(find_old_image_formats); do rm "$file"; done
}

# print cmds to remove original images
# for file in src/content/posts/*/*.png; do echo rm "$file"; done
# for file in src/content/posts/*/*.jpg; do echo rm "$file"; done
# for file in src/content/posts/*/*.jpeg; do echo rm "$file"; done
# for file in src/content/posts/*/*.gif; do echo rm "$file"; done
