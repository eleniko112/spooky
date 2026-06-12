import React from "react";
import { Villain } from "../types";
import { X, Flame, ShieldAlert, CheckCircle, Calendar, Sparkles } from "lucide-react";

interface DetailModalProps {
  villain: Villain;
  onClose: () => void;
  onBookNow: (villain: Villain) => void;
}

export default function DetailModal({ villain, onClose, onBookNow }: DetailModalProps) {
  
  // Custom helper to generate active calendar visualization
  const daysInMonth = 15; // mock visual calendar range
  const mockDays = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 11; // June 11 to June 25
    const dateStr = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const isBooked = villain.availability.includes(dateStr);
    return { dayNum, dateStr, isBooked };
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-4 backdrop-blur-md">
      <div className="flex min-h-full items-center justify-center py-4 md:py-8">
        <div 
          className="relative w-full max-w-4xl rounded-3xl border border-red-950/60 bg-zinc-950 p-6 md:p-8 shadow-[0_0_50px_rgba(185,28,28,0.3)] overflow-hidden"
          id={`detail_modal_${villain.id}`}
        >
        {/* Background fog effect overlay */}
        <div className="absolute inset-0 bg-fog-texture opacity-20 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-zinc-900 p-2.5 text-gray-400 hover:bg-red-950 hover:text-red-500 transition border border-zinc-800"
          id="close_modal_btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Grid Layout */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 z-10">
          
          {/* Column 1: Horror Poster Image (Span 4 of 12) */}
          <div className="md:col-span-5 flex flex-col">
            <div className="overflow-hidden rounded-2xl border border-red-950 shadow-2xl relative aspect-[3/4]">
              <img
                src={villain.image}
                alt={villain.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/20 to-transparent p-4 text-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-yellow-500">{villain.posterPrompt}</span>
              </div>
            </div>

            {/* Price section */}
            <div className="mt-4 rounded-xl bg-gradient-to-r from-red-950/40 to-transparent p-4 border-l-4 border-red-600">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">დღიური საკომისიო:</span>
              <span className="text-xl font-mono font-bold text-yellow-500">🪙 {villain.price} Cursed Coins</span>
              <span className="text-xs text-gray-400 block mt-0.5">შედის იდუმალი გაქრობის დაზღვევა.</span>
            </div>
          </div>

          {/* Column 2: Profile statistics & lore info (Span 7 of 12) */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="border-b border-zinc-900 pb-4 mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-red-500 font-mono-accent">
                  {villain.exclusiveTier} კლასის კოშმარი
                </span>
                <h2 className="font-cinzel text-2xl md:text-3xl font-extrabold text-white mt-1 leading-tight">
                  {villain.name}
                </h2>
                <p className="text-sm font-sans font-medium text-yellow-500 italic mt-1 leading-snug">
                  {villain.title}
                </p>
              </div>

              {/* Parody description */}
              <div className="mb-6 font-sans">
                <h4 className="text-xs uppercase font-semibold text-gray-400 mb-1.5 font-mono">ბიოგრაფია & პროვაიდერი:</h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed card-description" id={`villain_desc_modal_${villain.id}`}>
                  {villain.description}
                </p>
              </div>

              {/* Horror Parody Metrics / Scores */}
              <div className="mb-6 font-sans">
                <h4 className="text-xs uppercase font-semibold text-gray-400 mb-3 font-mono">კოშმარული მონაცემები:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Metric 1: Fear Level */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-300">
                      <span>💀 შიშის ხარისხი</span>
                      <span className="text-red-500 font-bold">{villain.fearLevel}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-850">
                      <div className="bg-red-600 h-1.5 rounded-full" style={{ width: `${villain.fearLevel}%` }} />
                    </div>
                  </div>

                  {/* Metric 2: Reliability Score */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-300">
                      <span>🛡️ სანდოობის რეიტინგი</span>
                      <span className="text-emerald-500 font-bold">{villain.reliability}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-850">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${villain.reliability}%` }} />
                    </div>
                  </div>

                  {/* Metric 3: Dramatic Entrance */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-300">
                      <span>🎬 ეფექტური გამოჩენა</span>
                      <span className="text-yellow-500 font-bold">{villain.entranceRating}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-850">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: `${villain.entranceRating}%` }} />
                    </div>
                  </div>

                  {/* Metric 4: Voice Score */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-300">
                      <span>🗣️ კოშმარული ხმა</span>
                      <span className="text-purple-500 font-bold">{villain.voiceScore}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-850">
                      <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${villain.voiceScore}%` }} />
                    </div>
                  </div>

                  {/* Metric 5: Disappearance Chance */}
                  <div className="col-span-2">
                    <div className="flex justify-between text-xs mb-1 font-medium text-gray-300">
                      <span>💨 იდუმალი გაქრობის ალბათობა (Disappearance Chance)</span>
                      <span className="text-sky-500 font-bold">{villain.disappearanceChance}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-850">
                      <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${villain.disappearanceChance}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special abilities and Side Effects */}
              <div className="grid grid-cols-2 gap-4 mb-6 font-sans">
                <div>
                  <h4 className="text-xs uppercase font-bold text-red-400 mb-2 font-mono">🌟 სპეციალური უნარები:</h4>
                  <ul className="text-xs text-gray-300 space-y-1 bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 leading-relaxed">
                    {villain.specialAbilities.map((ab, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="text-red-500">🗡️</span>
                        <span>{ab}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-yellow-500 mb-2 font-mono">⚠️ გვერდითი მოვლენები:</h4>
                  <ul className="text-xs text-gray-300 space-y-1 bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 leading-relaxed">
                    {villain.sideEffects.map((side, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="text-yellow-500">🧪</span>
                        <span>{side}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="mb-6 font-sans">
                <h4 className="text-xs uppercase font-semibold text-gray-400 mb-2.5 font-mono flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span>ივნისის განრიგი (2026 წლის ივნისი):</span>
                </h4>
                <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/30 rounded-xl border border-zinc-900/50">
                  {mockDays.map((day) => (
                    <div
                      key={day.dateStr}
                      className={`flex flex-col items-center justify-center w-11 h-12 rounded-lg border text-center ${
                        day.isBooked
                          ? "bg-red-950/40 border-red-900/50 text-red-400"
                          : "bg-zinc-900 border-zinc-805 text-gray-300 hover:border-emerald-600/50 cursor-pointer"
                      }`}
                      title={day.isBooked ? "დაკავებულია" : "თავისუფალია"}
                    >
                      <span className="text-[10px] text-gray-500 font-mono">ივნ</span>
                      <span className="text-xs font-bold font-mono">{day.dayNum}</span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4 mt-2 justify-end text-[10px] font-medium font-sans">
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-900/50 border border-red-600 inline-block" />
                    <span className="text-gray-400">დაჯავშნილია</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 inline-block" />
                    <span className="text-gray-400">თავისუფალია (დააჭირე დასაჯავშნად)</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Book now button */}
            <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-end space-x-2.5 font-sans">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-white bg-zinc-900 rounded-xl hover:bg-zinc-850 transition"
              >
                უკან დაბრუნება
              </button>
              <button
                onClick={() => onBookNow(villain)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-red-850 hover:bg-red-700 rounded-xl transition shadow-[0_0_15px_rgba(185,28,28,0.4)] flex items-center space-x-1.5"
                id="modal_book_now_btn"
              >
                <Sparkles className="h-4 w-4" />
                <span>ახლავე დაჯავშნა</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
}
