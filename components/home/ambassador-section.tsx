"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AmbassadorSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-24 bg-white text-black overflow-hidden relative">
      {/* Subtle Dot/Grid Pattern Background to match light theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a192f]/10 border border-[#0a192f]/20 text-[#0a192f] text-sm font-bold tracking-wide">
              <Trophy className="w-4 h-4" />
              <span>Launching Soon</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Become a <br />
              <span className="text-[#0a192f]">Student Ambassador</span>
            </h2>
            
            <p className="text-lg md:text-xl text-black/70 max-w-lg leading-relaxed font-medium">
              Represent BSPrep at your campus. Build leadership skills, get exclusive perks, and help your peers excel in the IITM BS Degree. 
            </p>
            
            <div className="flex gap-4 items-center pt-4">
              <Link 
                href="https://ambassador.bsprep.in/"
                target="_blank"
                className="group inline-flex items-center gap-2 bg-[#0a192f] text-white px-8 py-4 rounded-full font-bold hover:bg-[#112a52] transition-colors shadow-lg"
              >
                Apply for Cohort 1
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Sponsors Marquee/Row */}
            <div className="pt-10 border-t border-black/10 mt-12">
              <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-6">Supported by our sponsors</p>
              <div className="flex flex-wrap gap-8 items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default">
                 <img src="/sponsors/unstop.png" alt="Unstop" className="h-8 md:h-10 w-auto object-contain" />
                 <img src="/sponsors/truscholar.png" alt="Truscholar" className="h-8 md:h-10 w-auto object-contain" />
                 <img src="/sponsors/stickerfever.png" alt="Stickerfever" className="h-8 md:h-10 w-auto object-contain" />
                 <img src="/sponsors/xyz.png" alt=".xyz" className="h-8 md:h-10 w-auto object-contain" />
              </div>
            </div>
          </div>
          
          {/* Illustration/SVG Container */}
          <div className="relative w-full aspect-square flex justify-center items-center">
             <div className="absolute inset-0 bg-[#0a192f]/5 blur-3xl rounded-full scale-75" />
             
             {!imgError ? (
               <img 
                  src="/leader.svg" 
                  alt="Ambassador Program"
                  className="relative z-10 w-[90%] h-auto object-contain drop-shadow-xl"
                  onError={() => setImgError(true)}
               />
             ) : (
               <div 
                 className="relative z-10 w-64 h-64 bg-white rounded-[3rem] border border-black/10 flex flex-col items-center justify-center gap-4 shadow-xl ring-1 ring-black/5"
               >
                  <Star className="w-16 h-16 text-yellow-400" fill="currentColor" />
                  <p className="text-center font-bold text-black/50 text-sm px-6">
                    Download an SVG from unDraw and save it as <br/><span className="text-[#0a192f] font-mono mt-2 block">public/leader.svg</span>
                  </p>
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
  )
}
