import { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathRendererProps {
  math: string;
  inline?: boolean;
  className?: string;
}

export default function MathRenderer({ math, inline = false, className = '' }: MathRendererProps) {
  const mathRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mathRef.current && math) {
      try {
        // Clean up the LaTeX string - remove display delimiters if present
        let cleanMath = math;
        
        // Remove display delimiters \\[...\\] or \[...\]
        if (cleanMath.startsWith('\\\\[') && cleanMath.endsWith('\\\\]')) {
          cleanMath = cleanMath.slice(3, -3);
        } else if (cleanMath.startsWith('\\[') && cleanMath.endsWith('\\]')) {
          cleanMath = cleanMath.slice(2, -2);
        }
        
        // Remove inline delimiters \\(...\\) or \(...\) 
        if (cleanMath.startsWith('\\\\(') && cleanMath.endsWith('\\\\)')) {
          cleanMath = cleanMath.slice(3, -3);
        } else if (cleanMath.startsWith('\\(') && cleanMath.endsWith('\\)')) {
          cleanMath = cleanMath.slice(2, -2);
        }

        // Render with KaTeX
        katex.render(cleanMath, mathRef.current, {
          displayMode: !inline,
          throwOnError: false,
          errorColor: '#cc0000',
          strict: false,
        });
      } catch (error) {
        console.warn('KaTeX render error:', error);
        // Fallback to plain text if KaTeX fails
        if (mathRef.current) {
          mathRef.current.textContent = math;
        }
      }
    }
  }, [math, inline]);

  return <span ref={mathRef} className={className} />;
}