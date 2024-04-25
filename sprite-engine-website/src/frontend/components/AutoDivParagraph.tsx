import React, { useRef, useEffect, useState } from 'react';

interface AutoWidthDivProps {
    text: string;
    clas: string;
}

export const AutoWidthDiv: React.FC<AutoWidthDivProps> = ({ text, clas }) => {
    const [paragraphWidth, setParagraphWidth] = useState<number>(text.length);
    const divRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
  
    useEffect(() => {
      if(!paragraphRef.current)
      {
        return;
      }
      const text = paragraphRef.current.textContent;
      if (text) {
        const computedStyle = window.getComputedStyle(paragraphRef.current);
        const fontSize = computedStyle.getPropertyValue("font-size");
        const span = document.createElement("span");
        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "nowrap";
        span.style.fontSize = fontSize; // Set font size to match the paragraph
        span.textContent = text;
        paragraphRef.current.appendChild(span);
        let width = span.offsetWidth;
        paragraphRef.current.removeChild(span);

        console.log(width);

        if(width < 40)
        {
            width = 40;
        }

        setParagraphWidth(width);
      }
    }, [text]);
  
    return (
      <div ref={divRef} style={{ width: paragraphWidth + 30 }} className={clas} >
        <p ref={paragraphRef}>{text}</p>
      </div>
    );
  };
  