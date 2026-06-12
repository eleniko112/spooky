import React from "react";
import { Villain, MembershipTier } from "../types";
import { Skull, ShieldX, CalendarCheck, HelpCircle } from "lucide-react";

interface VillainCardProps {
  key?: string;
  villain: Villain;
  userTier: MembershipTier;
  onViewDetails: (villain: Villain) => void;
  onBookNow: (villain: Villain) => void;
  onAddToCompare: (villain: Villain) => void;
  isComparing: boolean;
}

export default function VillainCard({
  villain,
  userTier,
  onViewDetails,
  onBookNow,
  onAddToCompare,
  isComparing,
}: VillainCardProps) {
  // Check if character is locked for current user tier
  const tierWeights = { Bronze: 1, Silver: 2, Gold: 3, "Eldritch Elite": 4 };
  const requiredWeight = tierWeights[villain.exclusiveTier];
  const userWeight = tierWeights[userTier];
  const isLocked = userWeight < requiredWeight;

  return (
    <div 
      className="villain-card glass-panel group relative flex flex-col overflow-hidden rounded border border-white/5 bg-[#0c0c0c]/95"
      id={`villain_card_${villain.id}`}
    >
      {/* Horror Poster Backdrop Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden border-b border-white/5">
        {isLocked ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/95 p-3 text-center">
            <ShieldX className="h-10 w-10 text-red-600 animate-pulse" />
            <h4 className="mt-2 font-cinzel text-sm font-bold text-red-500 uppercase tracking-widest">წვდომა დაცულია</h4>
            <p className="mt-1 text-[11px] text-zinc-400 font-sans leading-relaxed">
              საჭიროა <span className="font-bold text-yellow-500">{villain.exclusiveTier}</span>. თქვენი დონეა: <span className="text-glow-red font-bold">{userTier}</span>.
            </p>
            <p className="mt-1 text-[10px] text-zinc-500 italic">აირჩიეთ სხვა ტარიფი ზედა მენიუში</p>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90 transition-opacity group-hover:via-black/40" />
        )}

        <img
          src={villain.image}
          alt={villain.name}
          referrerPolicy="no-referrer"
          className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
            isLocked ? "scale-105 blur-lg" : "group-hover:scale-105"
          }`}
        />

        {/* Dynamic Badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
          {/* Fear level */}
          <span className="flex items-center space-x-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-red-500 border border-red-950">
            <Skull className="h-3 w-3" />
            <span>შიში: {villain.fearLevel}%</span>
          </span>

          {/* Exclusive badge */}
          <span className={`rounded px-1.5 py-0.2 text-[9px] font-semibold tracking-wider border ${
            villain.exclusiveTier === "Bronze" ? "bg-amber-950/80 text-amber-500 border-amber-800/30" :
            villain.exclusiveTier === "Silver" ? "bg-zinc-900/80 text-zinc-300 border-white/5" :
            villain.exclusiveTier === "Gold" ? "bg-yellow-950/80 text-yellow-400 border-yellow-800/40" :
            "bg-red-950/80 text-red-500 border-red-900/60 animate-pulse text-glow-red"
          }`}>
            {villain.exclusiveTier}
          </span>
        </div>

        {/* Price Tag badge */}
        <div className="absolute top-2 right-2 z-20">
          <span className="rounded bg-black/90 px-1.5 py-0.5 text-[10px] font-mono font-bold text-yellow-500 border border-white/5">
            🪙 {villain.price} CC / დღე
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-1.5">
          <h3 className="font-cinzel text-[15px] font-bold text-white group-hover:text-red-500 tracking-wide transition-colors">
            {villain.name}
          </h3>
          <p className="min-h-[28px] text-[10.5px] font-semibold text-yellow-500/80 tracking-wide font-sans mt-0.5 leading-tight">
            {villain.title}
          </p>
        </div>

        <p className="line-clamp-2 text-[11px] text-zinc-400 leading-snug card-description mb-3 min-h-[34px]" id={`villain_desc_${villain.id}`}>
          {villain.description}
        </p>

        {/* Absurd task preview */}
        <div className="mb-3 mt-auto rounded border border-white/5 bg-white/5 p-2 leading-tight">
          <span className="text-[9px] uppercase tracking-wider text-red-400 font-bold block mb-0.5">სერვისი:</span>
          <p className="text-[11px] text-zinc-300 italic font-medium line-clamp-2">
            „{villain.absurdTask}“
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-auto">
          <button
            onClick={() => onAddToCompare(villain)}
            disabled={isLocked}
            className={`rounded py-1.5 text-[11px] font-semibold transition tracking-wide border ${
              isComparing
                ? "bg-yellow-950/20 text-yellow-500 border-yellow-800/40"
                : "border-white/5 text-zinc-400 hover:bg-white/5 hover:text-white"
            } disabled:opacity-30`}
            id={`compare_btn_${villain.id}`}
          >
            {isComparing ? "✓ შესადარებშია" : "⚖ შედარება"}
          </button>

          <button
            onClick={() => onViewDetails(villain)}
            className="rounded bg-white/5 py-1.5 text-[11px] font-semibold text-zinc-350 hover:bg-white/10 hover:text-white transition border border-white/5"
            id={`details_btn_${villain.id}`}
          >
            🔎 დეტალები
          </button>
        </div>

        <button
          onClick={() => onBookNow(villain)}
          disabled={isLocked}
          className="mt-2 w-full rounded bg-red-900/10 py-2 text-[11px] font-bold text-red-500 border border-red-900/30 hover:bg-red-800 hover:text-white transition-all disabled:opacity-20"
          id={`book_btn_${villain.id}`}
        >
          {isLocked ? "🔒 პრემიუმ წვდომა" : "✨ ახლავე დაჯავშნა"}
        </button>
      </div>
    </div>
  );
}
