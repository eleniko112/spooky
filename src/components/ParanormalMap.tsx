import React, { useState } from "react";
import { HauntedZone } from "../types";
import { HAUNTED_ZONES } from "../villainsData";
import { Skull, ShieldAlert, MapPin, Eye } from "lucide-react";

export default function ParanormalMap() {
  const [activeZone, setActiveZone] = useState<HauntedZone | null>(HAUNTED_ZONES[0]);

  return (
    <div 
      className="rounded-2xl border border-red-950/40 bg-zinc-950 p-6 font-sans relative overflow-hidden"
      id="paranormal_map_section"
    >
      <div className="absolute inset-0 bg-fog-texture opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="border-b border-zinc-900 pb-4 mb-6 text-center sm:text-left">
        <h2 className="font-cinzel text-lg font-bold text-red-500 flex items-center justify-center sm:justify-start space-x-2">
          <Skull className="h-5 w-5 text-red-500 animate-pulse" />
          <span>აქტიური პარანორმალური აქტივობების რუკა</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1">საქართველოს ტერიტორიაზე მონსტრებისა და წყევლების რეგისტრაციის ლოკაციები</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* SVG Interactive Map Canvas */}
        <div className="lg:col-span-8 flex flex-col justify-center items-center bg-black/60 rounded-2xl border border-zinc-900 p-4 relative min-h-[300px] overflow-hidden">
          
          {/* Ambient grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_30px] opacity-40" />

          {/* Glowing radar line */}
          <div className="absolute inset-x-0 h-0.5 bg-red-900/60 shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-bounce pointer-events-none" style={{ top: "40%" }} />

          {/* SVG Map representing Georgian outline in high-tech sci-fi green/crimson minimal vector style */}
          <svg
            viewBox="0 0 100 80"
            className="w-full max-w-[500px] h-auto text-red-900/10 drop-shadow-[0_0_15px_rgba(239,68,68,0.05)] select-none"
          >
            {/* Outline of Caucasus / Georgia parody shape */}
            <path
              d="M 5,30 Q 15,20 25,25 T 45,22 T 60,18 T 80,15 T 95,20 T 90,45 T 75,50 T 60,55 T 40,65 T 20,62 T 5,50 Z"
              fill="currentColor"
              stroke="#581c1c"
              strokeWidth="0.8"
            />
            {/* Mountain symbols */}
            <path d="M 12,24 L 17,16 L 22,24 M 45,21 L 50,14 L 55,21 M 75,17 L 80,11 L 85,17" stroke="#220d0d" strokeWidth="0.5" fill="none" />
            
            {/* Black Sea boundary */}
            <path d="M -5,35 Q 2,42 4,50" stroke="#100" strokeWidth="1" fill="none" />
          </svg>

          {/* Active Interactive Hotspots Pinpoints */}
          {HAUNTED_ZONES.map((zone) => {
            const isSelected = activeZone?.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone)}
                onMouseEnter={() => setActiveZone(zone)}
                className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer transition-all duration-300"
                style={{ left: `${zone.coordinates.x}%`, top: `${zone.coordinates.y}%` }}
                id={`map_pin_${zone.id}`}
              >
                {/* Outer radar pulse */}
                <div className={`absolute -inset-2.5 rounded-full border-2 border-red-650/40 opacity-75 ${
                  isSelected ? "animate-ping opacity-90 scale-125" : "group-hover/pin:animate-ping"
                }`} />
                
                {/* Pin core */}
                <div className={`relative h-6 w-6 rounded-full border flex items-center justify-center transition-all shadow-[0_0_10px_rgba(0,0,0,0.8)] ${
                  isSelected 
                    ? "bg-red-700 border-yellow-500 scale-125" 
                    : "bg-black/90 border-red-900 hover:border-red-500"
                }`}>
                  <MapPin className={`h-3 w-3 ${isSelected ? "text-yellow-400 rotate-12" : "text-red-500 animate-pulse"}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar displaying localized lore files */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-850/80 leading-relaxed font-sans space-y-3 min-h-[220px]">
            {activeZone ? (
              <div id="active_zone_hud">
                <span className={`inline-block font-bold text-[10px] uppercase px-2 py-0.5 rounded-full border mb-2 ${
                  activeZone.dangerLevel === "კოშმარული" ? "bg-red-950/40 text-red-500 border-red-900/60 animate-pulse" :
                  activeZone.dangerLevel === "კრიტიკული" ? "bg-orange-950/40 text-orange-400 border-orange-900/50" :
                  activeZone.dangerLevel === "საშუალო" ? "bg-yellow-950/30 text-yellow-500 border-yellow-900/40" :
                  "bg-zinc-800 text-gray-400 border-zinc-700"
                }`}>
                  საფრთხის ინდექსი: {activeZone.dangerLevel}
                </span>

                <h3 className="font-cinzel text-base font-bold text-gray-100 mb-1 leading-snug">
                  {activeZone.name}
                </h3>

                <p className="text-xs text-gray-400 font-sans leading-relaxed min-h-[90px]">
                  {activeZone.lore}
                </p>

                <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-500">აქტიური არსება:</span>
                  <span className="text-yellow-500 capitalize">{activeZone.activeEntity}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-500 py-10">
                <Eye className="h-8 w-8 text-zinc-700 animate-pulse mb-2" />
                <p className="text-xs">გთხოვთ მიუთითოთ ლოკაცია რუკაზე ინფორმაციის სანახავად</p>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-red-950/10 border border-red-900/20 rounded-xl leading-snug">
            <div className="flex items-center space-x-2 text-xs font-bold text-red-500 uppercase font-cinzel mb-1">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>სააგენტოს რეკომენდაცია:</span>
            </div>
            <p className="text-[11px] text-gray-400 font-sans">
              ამ ლოკაციებზე მოგზაურობა სრულიად უსაფრთხოა, თუმცა უმჯობესია არ დატოვოთ ძვირფასი ნივთები მაგიდაზე – ისინი შეიძლება უბრალოდ „იდუმალი გაქრობის“ მსხვერპლი გახდნენ.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
