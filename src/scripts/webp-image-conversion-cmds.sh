# Find legacy images, ignoring the `dist`, `node_modules`, `.cache` folders
find . -type f \( -iname \*.jpg \
  -o -iname \*.jpeg \
  -o -iname \*.png \
  -o -iname \*.gif \
  -o -iname \*.bmp \
  -o -iname \*.tif \
  -o -iname \*.tiff \) \
  -not -path "./dist/*" \
  -not -path "./node_modules/*" \
  -not -path "./.cache/*"

find . -type f \
  \( -iname \*.jpg \
  -o -iname \*.jpeg \
  -o -iname \*.png \
  -o -iname \*.gif \
  -o -iname \*.bmp \
  -o -iname \*.tif \
  -o -iname \*.tiff \) \
  -not -path "./dist/*"

# Convert images with `cwebp` (w/ 90 quality)
for file in src/content/posts/*.png; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
for file in src/content/posts/*.jpg; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
for file in src/content/posts/*.jpeg; do cwebp -q 90 "$file" -o "${file%.*}.webp"; done
# GIFs need a different tool, gif2webp
for file in src/content/posts/*/*.gif; do gif2webp -q 90 -mt "$file" -o "${file%.*}.webp"; done

printf "\n✅ Completed converting images to webp!\n\n"
sleep 3

# print cmds to remove original images
for file in src/content/posts/*/*.png; do echo rm "$file"; done
for file in src/content/posts/*/*.jpg; do echo rm "$file"; done
for file in src/content/posts/*/*.jpeg; do echo rm "$file"; done
for file in src/content/posts/*/*.gif; do echo rm "$file"; done
printf "\n\n🔥 Optional: you can remove the old images by running the above 'rm' commands.\n"
