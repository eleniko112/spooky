import React, { useState } from "react";
import { Villain } from "../types";
import { Scale, HelpCircle, Sparkles, CheckCircle2 } from "lucide-react";

interface ComparisonToolProps {
  comparisonList: Villain[];
  allVillains: Villain[];
  onRemove: (villainId: string) => void;
  onClear: () => void;
  onAdd: (villain: Villain) => void;
  onBookNow: (villain: Villain) => void;
}

export default function ComparisonTool({
  comparisonList,
  allVillains,
  onRemove,
  onClear,
  onAdd,
  onBookNow,
}: ComparisonToolProps) {
  const [selectedToCompare, setSelectedToCompare] = useState("");

  const getVerdict = () => {
    if (comparisonList.length < 2) return null;

    // Build funny rule-based AI decisions
    const first = comparisonList[0];
    const second = comparisonList[1];
    const third = comparisonList[2] || null;

    const fearDiff = Math.abs(first.fearLevel - second.fearLevel);

    if (third) {
      // 3 items comparison
      const highestFear = [first, second, third].reduce((prev, current) => 
        (prev.fearLevel > current.fearLevel) ? prev : current
      );
      return {
        winner: highestFear,
        reason: `კოშმარული ინტელექტის (AI) ანალიზით, ყველაზე საშიში სატირა არის **${highestFear.name}** შიშის დონით ${highestFear.fearLevel}%. 
თუმცა, თუ თქვენ ეძებთ საიმედოობას, **${[first, second, third].reduce((prev, curr) => prev.reliability > curr.reliability ? prev : curr).name}** ყველაზე მეტად გაგიწევთ რეკომენდაციას.`
      };
    } else {
      // 2 items comparison
      if (first.fearLevel > second.fearLevel && first.reliability > second.reliability) {
        return {
          winner: first,
          reason: `კოშმარული AI გვირჩევს **${first.name}**-ს. მას აქვს უპირატესობა როგორც შიშის დონეში (${first.fearLevel}%), ასევე საიმედოობაში (${first.reliability}%). იდეალურია სრული კონტროლისთვის!`
        };
      } else if (second.fearLevel > first.fearLevel && second.reliability > first.reliability) {
        return {
          winner: second,
          reason: `კოშმარული AI ცალსახად გვირჩევს **${second.name}**-ს. უმაღლესი რეიტინგი, უკეთესი სანდოობა და საშინელი ხმის ეფექტები.`
        };
      } else {
        // mixed results
        const mostFear = first.fearLevel > second.fearLevel ? first : second;
        const mostReliable = first.reliability > second.reliability ? first : second;
        return {
          winner: mostFear,
          reason: `თუ ეძებთ უპირველეს ყოვლისა **შიშს და აურზაურს**, აირჩიეთ **${mostFear.name}** (${mostFear.fearLevel}% შიში). 
ხოლო თუ გსურთ რომ აგენტი **უფრო საიმედოდ** გამოცხადდეს, გირჩევთ **${mostReliable.name}** (${mostReliable.reliability}% სანდოობა).`
        };
      }
    }
  };

  const verdict = getVerdict();

  return (
    <div 
      className="rounded-2xl border border-red-950/40 bg-zinc-950/40 backdrop-blur-md p-6 font-sans relative overflow-hidden"
      id="villains_comparison_tool"
    >
      <div className="absolute inset-0 bg-fog-texture opacity-10 pointer-events-none" />

      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-900 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-red-500">
            <Scale className="h-5 w-5 candle-flicker" />
            <h2 className="font-cinzel text-lg font-bold">კოშმარების შედარების სარკე</h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">შეადარეთ 2 ან 3 არსება გვერდიგვერდ და მიიღეთ კოშმარული AI გადაწყვეტილება</p>
        </div>

        {comparisonList.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs font-semibold text-gray-500 hover:text-red-400 transition"
            id="clear_comparison_btn"
          >
            🗑️ კალათის გასუფთავება
          </button>
        )}
      </div>

      {/* Add New Selector */}
      {comparisonList.length < 3 && (
        <div className="mb-6 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 shrink-0">➕ დაამატე შესადარებელი არსება:</span>
          <div className="relative w-full">
            <select
              value={selectedToCompare}
              onChange={(e) => {
                const target = allVillains.find((v) => v.id === e.target.value);
                if (target) {
                  onAdd(target);
                  setSelectedToCompare("");
                }
              }}
              className="w-full bg-zinc-950 rounded-lg p-2 text-xs border border-zinc-850 text-gray-200"
              id="compare_select_dropdown"
            >
              <option value="">-- აირჩიეთ კოშმარი --</option>
              {allVillains
                .filter((v) => !comparisonList.some((c) => c.id === v.id))
                .map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.exclusiveTier}) - 🪙 {v.price} СС
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}

      {/* Comparison Grid */}
      {comparisonList.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/10 rounded-2xl border border-dashed border-zinc-900 leading-relaxed text-gray-500">
          <HelpCircle className="h-10 w-10 mx-auto text-zinc-700 animate-pulse mb-3" />
          <p className="text-xs font-semibold">საანალიზო სარკე ცარიელია</p>
          <p className="text-[11px] text-zinc-600 mt-1">დაამატეთ მონსტრები კატალოგიდან ან ჩამოსაშლელი მენიუდან ხელსაწყოს გამოსაყენებლად.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Side-By-Side Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-900">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-zinc-900/60 text-[11px] uppercase tracking-wider text-gray-400 border-b border-zinc-900">
                  <th className="p-3 font-semibold">კრიტერიუმი / სტატისტიკა</th>
                  {comparisonList.map((v) => (
                    <th key={v.id} className="p-3 font-bold text-gray-200">
                      <div className="flex items-center space-x-2">
                        <img src={v.image} alt={v.name} className="w-8 h-8 object-cover rounded-md" referrerPolicy="no-referrer" />
                        <div>
                          <span className="capitalize block">{v.name}</span>
                          <span className="text-[9px] text-yellow-600 font-mono block uppercase">{v.exclusiveTier}</span>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs font-sans text-gray-300 divide-y divide-zinc-900">
                {/* Title */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">პაროდიული მომსახურება</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 italic text-yellow-600/90 font-medium">{v.title}</td>
                  ))}
                </tr>

                {/* Daily rate */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">დღიური ფასი</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 font-mono font-bold text-yellow-500">🪙 {v.price} CC</td>
                  ))}
                </tr>

                {/* Fear Level */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">💀 შიშის ხარისხი</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 font-bold text-red-500">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 font-mono">{v.fearLevel}%</span>
                        <div className="w-full max-w-[80px] bg-zinc-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-red-650 h-full" style={{ width: `${v.fearLevel}%` }} />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Reliability */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">🛡️ საიმედოობის ნორმა</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 font-bold text-emerald-500">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 font-mono">{v.reliability}%</span>
                        <div className="w-full max-w-[80px] bg-zinc-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${v.reliability}%` }} />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Entrance Rating */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">🎭 გამოჩენის ეფექტი</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 font-bold text-yellow-500">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 font-mono">{v.entranceRating}%</span>
                        <div className="w-full max-w-[80px] bg-zinc-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: `${v.entranceRating}%` }} />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Creepy voice score */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">🗣️ კოშმარული ხმა</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 font-bold text-purple-500">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 font-mono">{v.voiceScore}%</span>
                        <div className="w-full max-w-[80px] bg-zinc-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full" style={{ width: `${v.voiceScore}%` }} />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Disappearance chance */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">💨 იდუმალი გაუჩინარება</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3 font-bold text-sky-500">
                      <div className="flex items-center space-x-2">
                        <span className="w-8 font-mono">{v.disappearanceChance}%</span>
                        <div className="w-full max-w-[80px] bg-zinc-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-sky-500 h-full" style={{ width: `${v.disappearanceChance}%` }} />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Abilities */}
                <tr>
                  <td className="p-3 font-semibold text-gray-400">🔮 განსაკუთრებული უნარები</td>
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3">
                      <div className="flex flex-col gap-1">
                        {v.specialAbilities.slice(0, 2).map((ab, idx) => (
                          <span key={idx} className="bg-zinc-900 px-1.5 py-0.5 rounded text-[10px] truncate max-w-[140px] inline-block font-sans">
                            • {ab}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Remove actions */}
                <tr>
                  <td className="p-3" />
                  {comparisonList.map((v) => (
                    <td key={v.id} className="p-3">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => onBookNow(v)}
                          className="w-full py-1.5 bg-red-950/40 hover:bg-red-800 text-[10px] font-bold text-red-400 hover:text-white border border-red-900/30 rounded-lg transition"
                          id={`compare_book_${v.id}`}
                        >
                          დაჯავშნა ⚡
                        </button>
                        <button
                          onClick={() => onRemove(v.id)}
                          className="w-full py-1 text-[10px] border border-zinc-805 hover:bg-zinc-900 text-gray-500 hover:text-gray-300 rounded-lg transition"
                          id={`compare_remove_${v.id}`}
                        >
                          მოცილება [X]
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI Recommended Choice Verdict Section */}
          {verdict && (
            <div className="p-5 rounded-2xl border border-yellow-500/10 bg-yellow-950/5 relative overflow-hidden font-sans">
              <div className="absolute top-0 right-0 h-28 w-28 bg-yellow-500/5 blur-2xl rounded-full" />
              
              <div className="flex items-center space-x-2.5 mb-2.5">
                <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                <h4 className="text-xs uppercase font-bold tracking-wider text-yellow-500">
                  კოშმარული AI ექსპერტიზა: რეკომენდებული არჩევანი
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-zinc-900/40 p-3 rounded-xl border border-zinc-900 mb-3">
                <img src={verdict.winner.image} alt={verdict.winner.name} className="w-10 h-10 object-cover rounded-md" referrerPolicy="no-referrer" />
                <div>
                  <span className="text-xs font-bold text-white block capitalize">
                    {verdict.winner.name}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans block">{verdict.winner.title}</span>
                </div>
                <div className="sm:ml-auto p-1 px-2.5 bg-red-950/20 text-red-500 font-bold border border-red-900/30 text-[10px] uppercase rounded-full">
                  🛡️ AI არჩევანი
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: verdict.reason.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
