"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export function HeroShowcase() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize to a -1 to 1 range
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    // Only track on non-touch devices for better performance
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // 3D Parallax Transforms for the main composition
  const mainRotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const mainRotateY = useTransform(smoothX, [-1, 1], [-6, 6]);
  const mainX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const mainY = useTransform(smoothY, [-1, 1], [-15, 15]);

  // Foreground Cards Parallax (moves opposite/faster to create depth)
  const card1X = useTransform(smoothX, [-1, 1], [-35, 35]);
  const card1Y = useTransform(smoothY, [-1, 1], [-35, 35]);

  const card2X = useTransform(smoothX, [-1, 1], [25, -25]);
  const card2Y = useTransform(smoothY, [-1, 1], [25, -25]);

  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center" style={{ perspective: 1200 }}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0a192f]/10 via-blue-500/5 to-transparent blur-3xl rounded-full scale-110 pointer-events-none" />
      
      {/* Main Image (Classroom/Community) */}
      <motion.div
        style={{ rotateX: mainRotateX, rotateY: mainRotateY, x: mainX, y: mainY, z: -50 }}
        className="absolute z-10 w-[85%] max-w-[500px]"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/10 bg-white"
        >
          <img src="/hero-section/image-1.png" alt="Live Class" className="w-full h-full object-cover" />
        </motion.div>
      </motion.div>

      {/* Floating Card 1 - Left (Notes) */}
      <motion.div
        style={{ x: card1X, y: card1Y, z: 40 }}
        className="absolute left-[0%] bottom-[12%] w-[40%] max-w-[200px] z-20"
      >
        <motion.div
          animate={{ y: [12, -12, 12], rotate: [-8, -4, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-[6px] border-white ring-1 ring-black/5 bg-white"
        >
          <img src="/hero-section/image-2.png" alt="Notes 1" className="w-full h-full object-cover object-top scale-[1.05]" />
        </motion.div>
      </motion.div>

      {/* Floating Card 2 - Right (Notes) */}
      <motion.div
        style={{ x: card2X, y: card2Y, z: 80 }}
        className="absolute right-[0%] top-[12%] w-[35%] max-w-[180px] z-30"
      >
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [6, 10, 6] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)] border-[6px] border-white ring-1 ring-black/5 bg-white"
        >
          <img src="/hero-section/image-3.png" alt="Notes 2" className="w-full h-full object-cover object-top scale-[1.05]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
