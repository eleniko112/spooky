import React, { useState } from "react";
import { Ghost, ShieldAlert, AlignJustify, X, Sparkles, Award } from "lucide-react";
import { MembershipTier } from "../types";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedTier: MembershipTier;
  setSelectedTier: (tier: MembershipTier) => void;
  secretUnlocked: boolean;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  selectedTier,
  setSelectedTier,
  secretUnlocked,
}: NavbarProps) {
  const [navOpen, setNavOpen] = useState(false);
  const [showTierDropdown, setShowTierDropdown] = useState(false);

  const navItems = [
    { id: "home", label: "მთავარი" },
    { id: "directory", label: "კოშმარების კატალოგი" },
    { id: "comparison", label: "შედარების ხელსაწყო" },
    { id: "reviews", label: "გამოხმაურებები" },
    { id: "history", label: "სააგენტოს ისტორია" },
  ];

  const tiers: MembershipTier[] = ["Bronze", "Silver", "Gold", "Eldritch Elite"];

  const getTierColor = (tier: MembershipTier) => {
    switch (tier) {
      case "Bronze": return "text-amber-600 border-amber-600/30 bg-amber-950/20";
      case "Silver": return "text-slate-300 border-slate-300/30 bg-slate-900/40";
      case "Gold": return "text-yellow-500 border-yellow-500/30 bg-yellow-950/20";
      case "Eldritch Elite": return "text-red-500 border-red-500/30 bg-red-950/40 animate-pulse text-glow-red";
    }
  };

  const currentTierKA = (tier: MembershipTier) => {
    switch (tier) {
      case "Bronze": return "ბრინჯაო";
      case "Silver": return "ვერცხლი";
      case "Gold": return "ოქრო";
      case "Eldritch Elite": return "ძველი ელიტა";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Branding */}
        <div 
          onClick={() => setCurrentTab("home")} 
          className="flex cursor-pointer items-center space-x-2.5 transition hover:opacity-90"
          id="nav_brand"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-red-500 shadow-[0_0_15px_rgba(185,28,28,0.2)]">
            <Ghost className="h-5 w-5 candle-flicker" />
            <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-yellow-500 border border-black animate-ping" />
          </div>
          <div>
            <h1 className="font-cinzel text-base font-bold tracking-widest gold-text text-glow-gold select-none leading-none">
              NIGHTMARE
            </h1>
            <p className="font-sans text-[8px] tracking-widest text-zinc-500 uppercase font-bold mt-0.5">
              BOOKING AGENCY
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`rounded px-2.5 py-1 text-xs font-semibold tracking-wide transition-all duration-200 ${
                currentTab === item.id
                  ? "bg-red-900/10 border-l border-red-700 text-red-500 font-bold"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              id={`nav_btn_${item.id}`}
            >
              {item.label}
            </button>
          ))}

          {secretUnlocked && (
            <button
              onClick={() => setCurrentTab("secret")}
              className={`rounded px-2.5 py-1 text-xs font-bold tracking-wide border border-red-650/40 text-red-500 animate-pulse bg-red-950/20`}
              id="nav_btn_secret"
            >
              🔒 საიდუმლო საქაღალდე
            </button>
          )}
        </nav>

        {/* Membership Tier Dropdown */}
        <div className="relative font-sans">
          <button
            onClick={() => setShowTierDropdown(!showTierDropdown)}
            className={`flex items-center space-x-1.5 rounded border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition ${getTierColor(
              selectedTier
            )} hover:shadow-[0_0_10px_rgba(239,68,68,0.2)]`}
            id="tier_badge_trigger"
          >
            <Award className="h-4 w-4" />
            <span>{currentTierKA(selectedTier)}</span>
            <span className="text-[10px] text-gray-500 font-mono">▼</span>
          </button>

          {showTierDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-red-950/80 bg-zinc-950 p-2 shadow-2xl ring-1 ring-black ring-opacity-5 z-50">
              <div className="px-3 py-2 border-b border-zinc-900 mb-1">
                <span className="text-xs font-semibold text-gray-400 block">შეცვალე წვდომის დონე:</span>
              </div>
              {tiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    setSelectedTier(tier);
                    setShowTierDropdown(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium tracking-wide transition hover:bg-zinc-900 ${
                    selectedTier === tier
                      ? "text-red-400 bg-red-950/20"
                      : "text-gray-300"
                  }`}
                  id={`tier_select_${tier}`}
                >
                  <span className="capitalize">{currentTierKA(tier)} ({tier})</span>
                  {selectedTier === tier && <Sparkles className="h-3.5 w-3.5 text-yellow-500" />}
                </button>
              ))}
              <div className="mt-2 border-t border-zinc-900 p-2 text-[10px] text-yellow-600/80 leading-relaxed font-sans">
                ⚠️ უმაღლესი დონეები ხსნიან ექსკლუზიურ მონსტრებსა და საიდუმლო ფაილებს.
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger / Panic Menu Trigger */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-zinc-900 hover:text-white"
            id="mobile_menu_toggle"
          >
            {navOpen ? <X className="h-6 w-6" /> : <AlignJustify className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {navOpen && (
        <div className="md:hidden border-t border-red-950/80 bg-zinc-950 px-4 py-4 space-y-2 relative z-50">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setNavOpen(false);
              }}
              className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium tracking-wide border ${
                currentTab === item.id
                  ? "bg-red-950/40 border-red-900/30 text-red-400"
                  : "border-transparent text-gray-400 hover:bg-zinc-900"
              }`}
            >
              {item.label}
            </button>
          ))}

          {secretUnlocked && (
            <button
              onClick={() => {
                setCurrentTab("secret");
                setNavOpen(false);
              }}
              className="block w-full rounded-lg px-4 py-3 text-left text-sm font-bold text-red-500 bg-red-950/20 border border-red-600/30 animate-pulse"
            >
              🔒 საიდუმლო საქაღალდე
            </button>
          )}
        </div>
      )}
    </header>
  );
}
