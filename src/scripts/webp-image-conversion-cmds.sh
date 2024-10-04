#!/usr/bin/env bash

function webp_utils_help () {
  printf "\n📸 Shell/Bash Helper Functions for converting images to WebP format!\n\n"

  # Functions
  printf "Functions:\n"
  printf "\tfind_old_image_formats - finds .png, .jpg, .jpeg, .bmp, .tif, .tiff images in the current folder.\n"
  printf "\tconvert_images_to_webp - \n"
  printf "\tgenerate_rm_cmds\n\n"

  printf "Usage:\n"
  printf "\t1. Run 'find_old_image_formats' to find images in the project.\n"
  printf "\t2. Run 'convert_images_to_webp' to convert images to WebP format.\n"
  printf "\t3. Run 'generate_rm_cmds' to generate 'rm' commands to remove original images.\n\n"
}

webp_utils_help

function find_old_image_formats () {
  # Find legacy images, ignoring the `dist`, `node_modules`, `.cache` folders
  find "$PWD" -type f \( -iname \*.jpg \
    -o -iname \*.jpeg \
    -o -iname \*.png \
    -o -iname \*.gif \
    -o -iname \*.bmp \
    -o -iname \*.tif \
    -o -iname \*.tiff \) \
    -not -path "./dist/*" \
    -not -path "./node_modules/*" \
    -not -path "./.cache/*"
}


function convert_images_to_webp () {
  # Convert images with `cwebp` (w/ 90 quality)
  for file in $(find_old_image_formats); do
    if [[ $file == *.gif ]]; then
      # GIFs need a different tool, gif2webp
      gif2webp -q 90 -mt "$file" -o "${file%.*}.webp"
    else
      cwebp -q 90 "$file" -o "${file%.*}.webp"
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
# print cmds to remove original images
# for file in src/content/posts/*/*.png; do echo rm "$file"; done
# for file in src/content/posts/*/*.jpg; do echo rm "$file"; done
# for file in src/content/posts/*/*.jpeg; do echo rm "$file"; done
# for file in src/content/posts/*/*.gif; do echo rm "$file"; done
