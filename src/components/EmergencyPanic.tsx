import React, { useState } from "react";
import { AlertTriangle, Power } from "lucide-react";

export default function EmergencyPanic() {
  const [panicActive, setPanicActive] = useState(false);

  const triggerPanic = () => {
    setPanicActive(true);
    // Play sound or vibrate if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 500]);
    }
    // Turn off panic mode after 4.5 seconds automatically
    setTimeout(() => {
      setPanicActive(false);
    }, 4500);
  };

  return (
    <div id="emergency_panic_container" className="font-sans">
      
      {/* Panic trigger widget */}
      <div className="rounded border border-white/5 bg-[#0c0c0c]/95 p-4 text-center shadow-[0_0_20px_rgba(220,38,38,0.05)] relative overflow-hidden glass-panel">
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-red-900/40" />
        
        <h3 className="font-cinzel text-sm font-black text-red-500 uppercase tracking-widest text-glow-red">
          საგანგებო პანიკის ღილაკი
        </h3>
        <p className="text-[11px] text-zinc-500 mt-1 mb-4 leading-snug">
          თუ გრძნობთ, რომ არსება რეალურად მოვიდა თქვენთან – დააჭირეთ დაუყოვნებლივ!
        </p>

        <button
          onClick={triggerPanic}
          className="relative inline-flex items-center justify-center p-0.5 mb-1 overflow-hidden font-bold rounded-full group bg-gradient-to-br from-red-750 to-amber-600 hover:text-white dark:text-white focus:ring-2 focus:ring-red-900 cursor-pointer shadow-[0_0_30px_rgba(220,38,38,0.35)] active:scale-95 transition-transform"
          id="panic_trigger_button"
        >
          <span className="relative px-4 py-4 transition-all ease-in duration-75 bg-black rounded-full group-hover:bg-opacity-0 flex flex-col items-center justify-center h-22 w-22 border border-red-955 group-hover:border-transparent">
            <Power className="h-6 w-6 text-red-650 animate-pulse" />
            <span className="text-[9px] text-red-500 uppercase tracking-widest font-black mt-1">პანიკა</span>
          </span>
        </button>

        <p className="text-[9px] text-zinc-650 italic mt-2.5 leading-tight">
          ⚠️ ყურადღება: ღილაკზე დაჭერამ შეიძლება გამოიწვიოს კოსმოსური სიხშირეების აბურდვა.
        </p>
      </div>

      {/* Epic Panic Glitch Fullscreen Simulation Overlay */}
      {panicActive && (
        <div 
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-red-500 p-6 select-none glitch-active font-mono"
          id="panic_fullscreen_barrier"
        >
          {/* Audio effect or warnings */}
          <div className="absolute inset-0 bg-red-950/15 animate-pulse pointer-events-none" />
          
          <div className="text-center relative z-10 space-y-4 max-w-lg">
            
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-950/40 border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.7)] animate-bounce">
              <AlertTriangle className="h-10 w-10 text-red-500 glitch-text" />
            </div>

            <h1 className="font-cinzel text-2xl md:text-4xl font-black tracking-widest text-glow-red uppercase glitch-text">
              კავშირი გაწყდა...
            </h1>
            
            <p className="font-sans text-lg text-yellow-500 font-bold tracking-wide animate-pulse">
              მათ შეგამჩნიეს ! (They Found You)
            </p>

            <div className="text-left bg-zinc-950 p-4 rounded-xl border border-red-900/60 text-xs font-mono text-red-500 space-y-1.5 shadow-inner">
              <div>&gt;&gt; [SYS_ALERT_RADAR]: UNSCHEDULED ENTITY INBOUND</div>
              <div>&gt;&gt; [LOCATION_TAG]: CLOUD_RUN_CONTAINER_3000</div>
              <div>&gt;&gt; [ENERGY_STATE]: 3.00 AM MODE ACTIVATED</div>
              <div>&gt;&gt; [SYSTEM_LOG]: DISAPPEARANCE CHANCE REACHED 100%</div>
              <div className="text-emerald-500">&gt;&gt; [RESOLUTION]: დაწყნარდით, ეს მხოლოდ პაროდიული სიმულაციაა!</div>
            </div>

            <p className="text-[11px] text-gray-500 italic pt-4">
              კავშირი ავტომატურად აღდგება 3 წამში...
            </p>

          </div>
        </div>
      )}
    </div>
  );
}
