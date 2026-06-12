import React from "react";
import { Villain } from "../types";
import { Award, Skull, Star, Flame, Swords } from "lucide-react";

interface LeaderboardProps {
  villains: Villain[];
}

export default function Leaderboard({ villains }: LeaderboardProps) {
  // Sort villains by (fearLevel + reliability) / 2
  const sortedVillains = [...villains].sort((a, b) => {
    const scoreA = (a.fearLevel + a.reliability) / 2;
    const scoreB = (b.fearLevel + b.reliability) / 2;
    return scoreB - scoreA;
  });

  return (
    <div 
      className="rounded border border-white/5 bg-[#0c0c0c]/95 p-4 font-sans relative overflow-hidden glass-panel"
      id="top_nightmares_leaderboard"
    >
      <div className="absolute inset-0 bg-fog-texture opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="border-b border-white/5 pb-2.5 mb-3 text-center sm:text-left">
        <h2 className="font-cinzel text-sm font-bold text-red-500 flex items-center justify-center sm:justify-start space-x-1.5">
          <Award className="h-4 w-4 text-yellow-500 candle-flicker" />
          <span className="gold-text text-glow-gold tracking-widest uppercase">კოშმარების ლიდერბორდი და რეიტინგები</span>
        </h2>
        <p className="text-[10px] text-zinc-500 mt-1 leading-tight font-medium">საუკეთესო პაროდიული აგენტების რეიტინგი შიშისა და სანდოობის ინტეგრირებული კოეფიციენტით</p>
      </div>

      {/* Ranking List */}
      <div className="space-y-2 relative z-10">
        {sortedVillains.map((v, index) => {
          const ratingScore = ((v.fearLevel + v.reliability) / 2).toFixed(1);

          return (
            <div
              key={v.id}
              className={`flex flex-col sm:flex-row items-center justify-between p-2.5 rounded border transition ${
                index === 0
                  ? "bg-yellow-950/10 border-yellow-500/20"
                  : index === 1
                  ? "bg-white/5 border-slate-500/20"
                  : index === 2
                  ? "bg-zinc-900/40 border-amber-800/25"
                  : "bg-black/20 border-white/5"
              }`}
              id={`leaderboard_row_${index + 1}`}
            >
              {/* Rank Badge and Information */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {/* Ranking Position */}
                <div className={`h-7 w-7 flex items-center justify-center rounded font-mono font-bold text-xs shrink-0 border uppercase ${
                  index === 0
                    ? "bg-yellow-500 text-black border-yellow-600 shadow-[0_0_8px_rgba(234,179,8,0.4)]"
                    : index === 1
                    ? "bg-slate-400 text-black border-slate-500"
                    : index === 2
                    ? "bg-amber-700 text-white border-amber-805"
                    : "bg-zinc-900 text-zinc-500 border-white/5"
                }`}>
                  #{index + 1}
                </div>

                <img src={v.image} alt={v.name} className="w-8 h-8 object-cover rounded shrink-0 border border-white/5" referrerPolicy="no-referrer" />

                <div className="overflow-hidden">
                  <span className="font-cinzel text-xs font-bold text-zinc-100 block truncate capitalize hover:text-red-500 transition-colors tracking-wide">
                    {v.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 block truncate leading-none font-sans mt-0.5">
                    {v.title}
                  </span>
                </div>
              </div>

              {/* Stats & Progress indicators */}
              <div className="flex items-center space-x-4 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
                <div className="hidden sm:flex gap-3 text-[9.5px] text-zinc-400 uppercase font-bold tracking-wide">
                  <span className="flex items-center gap-0.5">💀 შიში: <strong className="text-red-500 font-mono">{v.fearLevel}%</strong></span>
                  <span className="flex items-center gap-0.5">🛡️ სანდოობა: <strong className="text-emerald-500 font-mono">{v.reliability}%</strong></span>
                </div>

                {/* Score Circular metric */}
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="text-right">
                    <span className="text-[8px] uppercase text-zinc-550 block font-bold">კოეფიციენტი:</span>
                    <span className="text-xs font-mono font-bold text-yellow-500">
                      {ratingScore} %
                    </span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
