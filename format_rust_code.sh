#!/bin/bash

# Function to format Rust code blocks
format_rust_code() {
  local input_file=$1
  local temp_file=$(mktemp)

  # Extract Rust code blocks, format them, and replace in the original file
  awk '
  BEGIN { in_rust_block = 0; code = "" }
  /```rust/ { in_rust_block = 1; next }
  /```/ { if (in_rust_block) { in_rust_block = 0; system("echo \"" code "\" | rustfmt --config max_width=49 > " FILENAME ".formatted"); code = ""; next } }
  { if (in_rust_block) { code = code $0 "\n" } else { print } }
  ' "$input_file"

  # Re-apply indentation/whitespace and replace original code block
  awk '
  BEGIN { in_rust_block = 0; formatted_code = ""; while ((getline line < FILENAME ".formatted") > 0) { formatted_code = formatted_code line "\n" } }
  /```rust/ { in_rust_block = 1; print; next }
  /```/ { if (in_rust_block) { in_rust_block = 0; print formatted_code; formatted_code = ""; print; next } }
  { print }
  ' "$input_file" > "$temp_file"

  mv "$temp_file" "$input_file"
  rm -f "$input_file.formatted"
}

# Call the function with the input file
format_rust_code "/Users/dan/code/oss/dans-blog/src/content/posts/2024-12-28--quiz-is-your-memory-rusty/index.mdx"
