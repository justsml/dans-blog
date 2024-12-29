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
  echo "Temporary file: $temp_file"
  echo "Error file: $error_file"

  # Extract Rust code blocks, format them, and replace in the original file
  awk -v leftPad="$leftPad" -v error_file="$error_file" -v temp_file="$temp_file" '
  BEGIN { in_rust_block = 0; code = "" }
  
  /```rust/ {
    in_rust_block = 1;
    print > temp_file;
    next;
  }
  
  /```/ {
    if (in_rust_block) {
      in_rust_block = 0;
      gsub(/"/, "\\\"", code); # Escape quotes
      
      # Write code to a temporary file for rustfmt
      cmd = "echo \"" code "\" | rustfmt --config max_width=49,wrap_comments=true 2>>" error_file;
      if (system(cmd) == 0) {
        while ((getline line < "temp.formatted") > 0) {
          printf "%" leftPad "s%s\n", "", line >> temp_file;
        }
        close("temp.formatted");
      } else {
        # On error, leave the block unchanged
        print "```rust" >> temp_file;
        print code >> temp_file;
      }
      print "```" >> temp_file;
      code = "";
      next;
    }
  }
  
  {
    if (in_rust_block) {
      code = code $0 "\n";
    } else {
      print >> temp_file;
    }
  }
  END {
    if (in_rust_block) {
      # Handle unclosed code block
      print code >> temp_file;
    }
  }
  ' "$input_file"

  # Report errors if any
  if [ -s "$error_file" ]; then
    echo "Errors encountered during formatting:" >&2
    cat "$error_file" >&2
  fi

  # Replace the input file with the formatted content
  mv "$temp_file" "$input_file"
  rm -f temp.formatted "$error_file"
}

# Call the function with the input file and leftPad spaces
format_rust_code "/Users/dan/code/oss/dans-blog/src/content/posts/2024-12-28--quiz-is-your-memory-rusty/index.mdx" 6
