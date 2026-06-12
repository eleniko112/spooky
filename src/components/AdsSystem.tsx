import React, { useState, useEffect } from "react";
import { Sparkles, Megaphone, Flame, Award } from "lucide-react";

interface AdCampaign {
  id: string;
  slogan: string;
  title: string;
  badge: string;
  accent: string;
  bgGrad: string;
}

const CAMPAIGNS: AdCampaign[] = [
  {
    id: "ad1",
    title: "კოღოების საფრთხე?",
    slogan: "დაიქირავეთ გრაფი დრაკულა! ის სულმოუთქმელად გადაგიწყვეტთ სისხლისმსმელი აბეზარების პრობლემას. 100% გარანტია.",
    badge: "არისტოკრატიული დაცვა",
    accent: "text-red-500",
    bgGrad: "from-red-950/20 via-zinc-950 to-black"
  },
  {
    id: "ad2",
    title: "ვერ იღვიძებთ ორშაბათს?",
    slogan: "ფრედი კრიუგერის პერსონალური სიზმრის მაღვიძარა გარანტიას გაძლევთ, რომ შიშისგან 05:00 საათზე წამოხტებით! სცადეთ დღესვე.",
    badge: "დილის საოცრება",
    accent: "text-yellow-500",
    bgGrad: "from-yellow-950/20 via-zinc-950 to-black"
  },
  {
    id: "ad3",
    title: "მეზობელი ხმამაღლა მღერის?",
    slogan: "ანაბელის იდუმალი მზერა ფანჯრიდან ნებისმიერს დაადუმებს. კლასიკური მეთოდი, რომელიც არ საჭიროებს პოლიციას.",
    badge: "ჰარმონია უბანში",
    accent: "text-purple-500",
    bgGrad: "from-purple-950/20 via-zinc-950 to-black"
  }
];

export default function AdsSystem() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 8000); // changes every 8 seconds
    return () => clearInterval(timer);
  }, []);

  const ad = CAMPAIGNS[currentIndex];

  return (
    <div 
      className={`rounded-2xl border border-zinc-900 bg-gradient-to-r ${ad.bgGrad} p-5 font-sans relative overflow-hidden transition-all duration-700`}
      id="horror_ad_banner"
    >
      <div className="absolute top-0 right-0 h-20 w-20 bg-red-950/10 blur-xl rounded-full" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3.5">
          <div className="p-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-yellow-500 shrink-0">
            <Megaphone className="h-4 w-4 animate-bounce" />
          </div>
          <div>
            <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 roundedbg rounded-full bg-zinc-900 border border-zinc-800 mb-1 ${ad.accent}`}>
              {ad.badge}
            </span>
            <h4 className="font-cinzel text-sm font-black text-gray-100 uppercase tracking-widest leading-none">
              {ad.title}
            </h4>
            <p className="text-xs text-gray-300 italic mt-1.5 leading-relaxed font-sans max-w-xl">
              „{ad.slogan}“
            </p>
          </div>
        </div>

        <div className="shrink-0 font-sans ml-auto md:ml-0">
          <span className="text-[10px] text-gray-500 block text-right font-mono mb-1">სარეკლამო ბლოკი V1.2</span>
          <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-500 bg-yellow-950/20 border border-yellow-800/30 rounded-lg p-1.5 px-3">
            <Sparkles className="h-3 w-3" />
            <span>50% ფასდაკლება Gold ტარიფზე</span>
          </div>
        </div>

      </div>
    </div>
  );
}
