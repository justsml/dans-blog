#!/bin/bash

# credit: https://gist.github.com/oneohthree/f528c7ae1e701ad990e6
function slugify () {
  echo "$1" | iconv -t ascii//TRANSLIT | sed -r s/[^a-zA-Z0-9]+/-/g | sed -r s/^-+\|-+$//g | tr '[:upper:]' '[:lower:]'
}

title="${1:-'title'}"
slug="$(slugify "$title")"
folder="./content/posts/$(date +%F)--$slug"

# echo "title: $title"
# echo "slug: $slug"
# echo "folder: $folder"

if [ -d "$folder" ]; then
  printf "\\nWARNING: Post already exists: \"%s\"\\n\\n" "$title"
  printf "To delete current post: \\n  rm -rf %s\\n\\n" "$folder"
  exit -1
fi

if [ "" != "$2" ]; then
  subtitle="$2"
else
  read -rp "Enter post subtitle: " subtitle
fi
if [ "" != "$3" ]; then
  category="$3"
else
  read -rp "Enter post category: " category
fi
if [ "" != "$4" ]; then
  tags="$4"
else
  read -rp "Enter post tags (comma delimited): " tags
fi

mkdir "$folder"
cat << EOF > "$folder/index.md"
---
title: "$title"
subTitle: $subtitle
date: $(date +%F)
modified: null
tags: [$tags]
category: $category
cover: null
---

# $title


EOF

printf "\\nDone: Post created at %s/index.md\\n\\n" "$folder"

