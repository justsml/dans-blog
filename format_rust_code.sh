#!/bin/bash
set -eou pipefail
IFS=$'\n\t'

# Function to format Rust code blocks
format_rust_code() {
  local input_file=$1
  local leftPad=$2
  local temp_file
  temp_file=$(mktemp)
  local error_file
  error_file=$(mktemp)

  echo "Formatting Rust code blocks in $input_file"
  echo "Temp file: $temp_file"
  echo "Error file: $error_file"

  # Extract Rust code blocks, format them, and print to terminal
  awk -v leftPad="$leftPad" -v error_file="$error_file" '
  BEGIN { in_rust_block = 0; code = "" }
  /```rust/ { in_rust_block = 1; next }
  /```/ { 
    if (in_rust_block) { 
      in_rust_block = 0; 
      gsub(/"/, "\\\"", code);  # Escape quotes
      if (system("echo \"" code "\" | rustfmt --config max_width=49,wrap_comments=true > temp.formatted 2>>" error_file) == 0) {
        system("cat temp.formatted >> " FILENAME ".formatted");
      }
      code = ""; 
      next 
    } 
  }
  { 
    if (in_rust_block) { 
      code = code $0 "\n" 
    } else { 
      print 
    } 
  }
  ' "$input_file"

  # Apply indentation/whitespace and print formatted code block
  awk -v leftPad="$leftPad" '
  BEGIN { in_rust_block = 0; formatted_code = ""; while ((getline line < FILENAME ".formatted") > 0) { formatted_code = formatted_code line "\n" } }
  /```rust/ { in_rust_block = 1; next }
  /```/ { 
    if (in_rust_block) { 
      in_rust_block = 0; 
      split(formatted_code, lines, "\n");
      for (i in lines) {
        if (lines[i] != "") {
          printf "%" leftPad "s%s\n", "", lines[i];
        }
      }
      formatted_code = ""; 
      next 
    } 
  }
  { 
    if (in_rust_block) { 
      formatted_code = formatted_code $0 "\n" 
    } else { 
      print 
    } 
  }
  ' "$input_file"

  if [ -s "$error_file" ]; then
    echo "Errors encountered during formatting:"
    cat "$error_file"
  fi

  rm -f temp.formatted "$error_file"
}

# Call the function with the input file and leftPad spaces
format_rust_code "/Users/dan/code/oss/dans-blog/src/content/posts/2024-12-28--quiz-is-your-memory-rusty/index.mdx" 4
