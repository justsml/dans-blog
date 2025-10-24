import React from 'react';
import MathRenderer from './MathRenderer';

interface TextWithMathProps {
  text: string;
  className?: string;
}

// Regex to match LaTeX expressions: \\[...\\] or \[...\] for display math
// and \\(...\\) or \(...\) for inline math
const LATEX_REGEX = /(\\\\\[[\s\S]*?\\\\\]|\\\[[\s\S]*?\\\]|\\\\\([\s\S]*?\\\\\)|\\\([\s\S]*?\\\))/g;

export default function TextWithMath({ text, className = '' }: TextWithMathProps) {
  // Split text by LaTeX expressions, keeping the delimiters
  const parts = text.split(LATEX_REGEX);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part is a LaTeX expression
        if (LATEX_REGEX.test(part)) {
          // Determine if it's inline or display math
          const isInline = part.startsWith('\\\\(') || part.startsWith('\\(');
          return (
            <MathRenderer
              key={index}
              math={part}
              inline={isInline}
            />
          );
        } else {
          // Regular text
          return part || null;
        }
      })}
    </span>
  );
}