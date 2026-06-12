import React, { useState } from "react";
import { Sparkles, BrainCircuit, Skull, AlertCircle, RefreshCw } from "lucide-react";

interface GeneratedNightmare {
  name: string;
  origin: string;
  stats: {
    fearLevel: number;
    reliability: number;
    voiceScore: number;
    disappearanceChance: number;
  };
  abilities: string[];
  weakness: string;
  funnySlogan: string;
}

export default function AiGenerator() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedNightmare | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const sampleIdeas = [
    "ბიბლიოთეკის მონსტრი",
    "ოფისის ზარმაცი დემონი",
    "ორშაბათი დილის აჩრდილი",
    "მაცივრის ჩუმი ქურდი"
  ];

  const handleSummon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      const res = await fetch("/api/generate-nightmare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        throw new Error("კავშირი გაწყდა ჯოჯოხეთთან");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("მონსტრების ლაბორატორია დროებით გადაიტვირთა. გთხოვთ სცადოთ მოგვიანებით.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="rounded-2xl border border-red-950/40 bg-zinc-950/40 backdrop-blur-md p-6 font-sans relative overflow-hidden"
      id="ai_nightmare_generator"
    >
      <div className="absolute inset-0 bg-fog-texture opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pb-4 border-b border-zinc-900 mb-6">
        <div className="p-2.5 rounded-xl border border-red-900 bg-red-950/30 text-red-500 shadow-[0_0_15px_rgba(185,28,28,0.3)]">
          <BrainCircuit className="h-6 w-6 candle-flicker" />
        </div>
        <div>
          <h2 className="font-cinzel text-lg font-bold text-red-500 flex items-center gap-1.5 justify-center sm:justify-start">
            <span>AI კოშმარების გენერატორი</span>
            <span className="text-[10px] bg-red-950 text-red-400 border border-red-900 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Gemini API</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">ჩაწერეთ ნებისმიერი იდეა და შექმენით პერსონალური, უწყინარი კოშმარი</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* Input Form Column (Span 5 of 12) */}
        <div className="md:col-span-5 space-y-4">
          <form onSubmit={handleSummon} className="space-y-3.5">
            <div>
              <span className="text-xs font-semibold text-gray-400 block mb-1.5">კოშმარის იდეა ან პროტოტიპი:</span>
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="მაგ. ლიფტის ჩუმი დამცინავი"
                className="w-full bg-zinc-900 border border-zinc-850 p-3 rounded-xl text-xs text-white placeholder:text-zinc-650 focus:border-red-800 focus:outline-none focus:ring-1 focus:ring-red-800"
                id="ai_idea_input"
              />
            </div>

            {/* Suggested quick presets */}
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">სცადეთ პოპულარული იდეები:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleIdeas.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setIdea(preset)}
                    className="text-[10px] bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-805 text-gray-300 px-2.5 py-1 rounded-lg transition"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !idea.trim()}
              className="w-full py-3 rounded-xl bg-red-900 hover:bg-red-800 text-xs font-black text-white transition flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(185,28,28,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
              id="ai_summon_btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-yellow-500" />
                  <span>გამოძახების კოჭი ცხელდება...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>კოშმარის სინთეზირება (AI Summon)</span>
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-950/15 border border-red-900/40 rounded-xl flex items-start space-x-2 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Slogan details */}
          <div className="p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl leading-relaxed text-[11px] text-gray-400">
            📌 ჩვენი ხელოვნური ინტელექტი შეისწავლის თქვენს იდეას და დააგენერირებს სრულიად უსაფრთხო, სასაცილო და ქართული სულისკვეთების მქონე კოსმიურ არსებას.
          </div>
        </div>

        {/* Display Output Column (Span 7 of 12) */}
        <div className="md:col-span-7 flex flex-col justify-center">
          {loading ? (
            <div className="text-center py-12 bg-zinc-900/10 rounded-2xl border border-dashed border-red-900/40 flex flex-col items-center justify-center space-y-3">
              <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-red-950/30 border border-red-900 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                <BrainCircuit className="h-8 w-8 text-red-500 animate-pulse" />
                <div className="absolute inset-0.5 rounded-full border border-dashed border-yellow-500 animate-spin-slow" />
              </div>
              <div>
                <h4 className="text-sm font-cinzel font-bold text-gray-100 uppercase tracking-widest animate-pulse">ნეკრომანტიული ანალიზი მიმდინარეობს</h4>
                <p className="text-[10px] text-gray-400 mt-1 font-sans">Gemini-3.5-flash აგროვებს უძველეს შუმერულ ფაილებს „{idea}“-ს შესახებ...</p>
              </div>
            </div>
          ) : result ? (
            <div 
              className="p-5 rounded-2xl border border-red-900/50 bg-neutral-950 shadow-[0_0_30px_rgba(185,28,28,0.15)] space-y-4 animate-fade-in"
              id="ai_generator_output_sheet"
            >
              <div className="border-b border-zinc-900 pb-3">
                <span className="text-[9px] uppercase tracking-wider text-yellow-500 font-bold block mb-0.5">სინთეზირებული კოშმარი:</span>
                <h3 className="font-cinzel text-lg font-black text-red-500 text-glow-red capitalize">
                  {result.name}
                </h3>
                <p className="text-xs text-yellow-600 font-medium italic mt-0.5">
                  {result.funnySlogan}
                </p>
              </div>

              {/* Origin story description */}
              <div className="text-xs text-gray-300 leading-relaxed font-sans">
                <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">წარმოშობის ანალები:</h4>
                <p className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-900 italic font-medium">
                  „{result.origin}“
                </p>
              </div>

              {/* Stats metric bar */}
              <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                <div>
                  <div className="flex justify-between text-gray-400 mb-0.5 font-medium">
                    <span>💀 შიშის ხარისხი:</span>
                    <span className="text-red-500 font-bold">{result.stats.fearLevel}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-red-650 h-full" style={{ width: `${result.stats.fearLevel}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-400 mb-0.5 font-medium">
                    <span>🛡️ საიმედოობის ნორმა:</span>
                    <span className="text-emerald-500 font-bold">{result.stats.reliability}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${result.stats.reliability}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-400 mb-0.5 font-medium">
                    <span>🗣️ საშინელი ხმა:</span>
                    <span className="text-purple-505 font-bold text-purple-400">{result.stats.voiceScore}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full" style={{ width: `${result.stats.voiceScore}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-gray-400 mb-0.5 font-medium">
                    <span>💨 გაუჩინარება:</span>
                    <span className="text-sky-500 font-bold">{result.stats.disappearanceChance}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-sky-505 h-full bg-sky-500" style={{ width: `${result.stats.disappearanceChance}%` }} />
                  </div>
                </div>
              </div>

              {/* Special abilities + weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                <div>
                  <span className="text-[10px] uppercase font-bold text-red-400 block mb-1">🔮 განსაკუთრებული უნარები:</span>
                  <ul className="text-xs space-y-1 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900 text-gray-300">
                    {result.abilities.map((ab, idx) => (
                      <li key={idx}>🗡️ {ab}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-yellow-500 block mb-1">❤️ სისუსტის წერტილი:</span>
                  <div className="bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-900 italic text-gray-300 leading-normal">
                    💡 {result.weakness}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-900/10 rounded-2xl border border-dashed border-zinc-900 leading-relaxed text-gray-500">
              <Skull className="h-10 w-10 mx-auto text-zinc-700 animate-pulse mb-3" />
              <p className="text-xs font-semibold">სარკე მზად არის ინკანტაციისთვის</p>
              <p className="text-[11px] text-zinc-650 mt-1">შეიყვანეთ ნებისმიერი სატირული მონსტრის იდეა მარცხენა პანელში და დააჭირეთ „სინთეზირებას“.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
