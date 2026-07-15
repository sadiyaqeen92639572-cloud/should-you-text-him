import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center mt-12 pt-6 border-t-4 border-black flex flex-col items-center gap-2">
      <span className="text-xs font-extrabold uppercase text-gray-600 tracking-widest">
        No data collected. No judgment. Just pure vibes.
      </span>
      <span className="text-sm font-black uppercase tracking-wider text-black">
        © 2026 ShouldIText
      </span>
      <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
        Made for highly indecisive people everywhere
      </span>
      <span className="text-[11px] font-black uppercase tracking-widest text-black/30 mt-1">
        textorwait.com
      </span>
      <span className="text-[9px] font-medium normal-case text-gray-400 tracking-normal mt-2 max-w-md px-4">
        ShouldIText is part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.
      </span>
    </footer>
  );
}
