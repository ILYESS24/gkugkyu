"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const Skiper19 = () => {
  const [totalHeight, setTotalHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setTotalHeight(document.documentElement.scrollHeight);
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    window.addEventListener('scroll', updateHeight);
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('scroll', updateHeight);
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll();

  // Chemin SVG personnalisé qui parcourt la page de manière organique
  // Commence en haut à gauche, se déplace vers la droite, puis descend en formant des courbes
  const customPath = `M 50 50 
    Q 200 100, 350 80 
    T 600 120 
    T 850 100 
    T 1100 150 
    Q 1200 200, 1150 350 
    T 1100 550 
    T 1000 750 
    Q 900 900, 800 1100 
    T 700 1300 
    T 600 1500 
    T 500 1700 
    Q 400 1900, 300 2100 
    T 200 2300 
    Q 300 2400, 500 2450 
    T 800 2500 
    T 1100 2550 
    Q 1200 2600, 1150 2700`;

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section 
      className="fixed inset-0 w-screen pointer-events-none z-0"
      style={{ height: `${totalHeight}px` }}
    >
      <div className="relative w-full h-full">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 2800"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          overflow="visible"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d={customPath}
            stroke="#000000"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength,
              strokeDasharray: 1,
              strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export { Skiper19 };
