import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import VillainCard from "./components/VillainCard";
import DetailModal from "./components/DetailModal";
import BookingForm from "./components/BookingForm";
import ComparisonTool from "./components/ComparisonTool";
import ParanormalMap from "./components/ParanormalMap";
import AiGenerator from "./components/AiGenerator";
import Leaderboard from "./components/Leaderboard";
import AdsSystem from "./components/AdsSystem";
import EmergencyPanic from "./components/EmergencyPanic";
import { VILLAINS_DATA, MOCK_REVIEWS } from "./villainsData";
import { Villain, Booking, MembershipTier, Review } from "./types";
import { 
  Skull, Sparkles, Volume2, ShieldAlert, 
  HelpCircle, Star, Send, Eye, ShieldCheck, Gamepad2 
} from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedTier, setSelectedTier] = useState<MembershipTier>("Bronze");
  
  // State for Directory Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("fearDesc"); // fearDesc, nameAsc, priceAsc

  // Component Dialog selection states
  const [selectedVillain, setSelectedVillain] = useState<Villain | null>(null);
  const [isBookingActive, setIsBookingActive] = useState(false);
  const [bookingVillain, setBookingVillain] = useState<Villain | null>(null);

  // Lists state
  const [allBookings, setAllBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem("nightmare_bookings");
    return saved ? JSON.parse(saved) : [];
  });
  const [reviewsList, setReviewsList] = useState<Review[]>(MOCK_REVIEWS);
  const [comparisonList, setComparisonList] = useState<Villain[]>([]);

  // Feedback form state
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [newReviewVillain, setNewReviewVillain] = useState(VILLAINS_DATA[0].id);

  // Hidden Easter Egg states
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [isMidnightMode, setIsMidnightMode] = useState(false);

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem("nightmare_bookings", JSON.stringify(allBookings));
  }, [allBookings]);

  // Konami Code Easter Egg Listener
  // Code: Up Up Down Down Left Right Left Right B A
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", 
      "ArrowDown", "ArrowDown", 
      "ArrowLeft", "ArrowRight", 
      "ArrowLeft", "ArrowRight", 
      "b", "a"
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const nextSequence = [...keySequence, e.key].slice(-10);
      setKeySequence(nextSequence);

      if (JSON.stringify(nextSequence) === JSON.stringify(konamiCode)) {
        setSecretUnlocked(true);
        alert("🔓 საიდუმლო აღმოჩენილია! კონამის კოდი შეყვანილია. საიდუმლო არქივი განბლოკილია ზედა მენიუში.");
        setCurrentTab("secret");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  // Midnight mode simulation
  useEffect(() => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    // Simulate darker mode if it's nighttime or specifically 3:00 AM mode
    if (hour >= 22 || hour <= 4) {
      setIsMidnightMode(true);
    }
  }, []);

  // Handlers
  const handleAddBooking = (newBooking: Booking) => {
    setAllBookings([newBooking, ...allBookings]);
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      alert("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      username: newReviewAuthor,
      rating: newReviewRating,
      comment: newReviewComment,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      villainId: newReviewVillain
    };

    setReviewsList([newReview, ...reviewsList]);
    setNewReviewAuthor("");
    setNewReviewComment("");
    alert("გამოხმაურება წარმატებით გამოქვეყნდა!");
  };

  const handleToggleComparison = (v: Villain) => {
    if (comparisonList.some((c) => c.id === v.id)) {
      setComparisonList(comparisonList.filter((c) => c.id !== v.id));
    } else {
      if (comparisonList.length >= 3) {
        alert("შეგიძლიათ შეადაროთ მაქსიმუმ 3 კოშმარი");
        return;
      }
      setComparisonList([...comparisonList, v]);
    }
  };

  // Filter & Sort Villains
  const filteredVillains = VILLAINS_DATA.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || v.category === categoryFilter;
    const matchesPrice = v.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "fearDesc") return b.fearLevel - a.fearLevel;
    if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
    if (sortBy === "priceAsc") return a.price - b.price;
    return 0;
  });

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-zinc-300 flex flex-col selection:bg-red-950 selection:text-white ${isMidnightMode ? "brightness-90 border-purple-950" : ""}`}>
      
      {/* Upper Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        secretUnlocked={secretUnlocked}
      />

      {/* Main Container Wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        
        {/* Paralleled Ads banner at the top of everything */}
        <div className="mb-8">
          <AdsSystem />
        </div>

        {/* PAGE 1: HOME */}
        {currentTab === "home" && (
          <div className="space-y-12 font-sans">
            
            {/* Parallax Hero Intro Banner */}
            <div className="relative rounded border border-white/5 bg-[#0e0e0e] p-6 md:p-10 text-center flex flex-col justify-center items-center h-[320px] shadow-[0_0_50px_rgba(139,0,0,0.08)]">
              {/* Fog simulation canvas layer */}
              <div className="absolute inset-0 bg-fog-texture opacity-30 pointer-events-none" />
              
              <div className="relative z-10 space-y-3 max-w-2xl">
                <span className="text-yellow-500 font-cinzel text-[10px] font-bold uppercase tracking-widest inline-block bg-yellow-950/20 px-2.5 py-0.5 rounded border border-yellow-905">
                  ✨ კოშმარების დაჯავშნის პრემიუმ სააგენტო
                </span>
                <h1 className="font-cinzel text-2xl md:text-4xl font-black text-white leading-tight uppercase text-glow-red">
                  დაიქირავე <span className="text-red-500">მკვლელები</span>
                </h1>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  მოგესალმებით მსოფლიოში პირველ გოთურ-სატირულ პლატფორმაზე, სადაც შეგიძლიათ დაიქირაოთ ცნობილი საშინელი პერსონაჟები უწყინარი, სასაცილო და სასარგებლო ყოველდღიური სამუშაოსთვის.
                </p>

                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setCurrentTab("directory")}
                    className="px-5 py-2 bg-red-900 hover:bg-red-800 text-[11px] font-black text-white rounded transition shadow-[0_0_15px_rgba(220,38,38,0.3)]"
                    id="hero_catalog_btn"
                  >
                    🚀 გადადი კატალოგში
                  </button>
                  <button
                    onClick={() => setSecretUnlocked(true)}
                    className="px-5 py-2 bg-[#141414] hover:bg-zinc-800 border border-white/5 text-[11px] font-bold text-zinc-300 rounded transition"
                    id="hero_clue_btn"
                  >
                    🔑 საიდუმლო გასაღები
                  </button>
                </div>
              </div>

              {/* Little hint about Konami Code */}
              <div className="absolute bottom-3 text-[10px] text-gray-500 flex items-center space-x-1.5 font-mono">
                <Gamepad2 className="h-3.5 w-3.5 text-zinc-600" />
                <span>საიდუმლო კოდი: ↑ ↑ ↓ ↓ ← → ← → B A კლავიატურაზე</span>
              </div>
            </div>

            {/* AI Generator on Home */}
            <div>
              <AiGenerator />
            </div>

            {/* Split widgets: Map & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <ParanormalMap />
              </div>

              <div className="lg:col-span-4 space-y-8">
                <Leaderboard villains={VILLAINS_DATA} />
                <EmergencyPanic />
              </div>
            </div>

            {/* List of active summonds bookings */}
            {allBookings.length > 0 && (
              <div className="p-4 bg-[#0d0d0d]/90 rounded border border-white/5 glass-panel">
                <h3 className="font-cinzel text-xs font-bold text-red-500 mb-3 tracking-widest uppercase">თქვენი აქტიური კონტრაქტები</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-35">
                  {allBookings.map((b) => (
                    <div key={b.id} className="p-3 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-zinc-100 block capitalize">{b.villainName}</span>
                        <span className="text-[10px] text-zinc-500 block">თარიღი: {b.date} / {b.time}</span>
                        <span className="text-[10px] text-yellow-500/80 font-mono italic block mt-0.5">დავალება: „{b.userRequest}“</span>
                      </div>
                      <span className="p-0.5 px-2 text-[9px] font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 rounded">
                        დამტკიცებულია
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* PAGE 2: DIRECTORY */}
        {currentTab === "directory" && (
          <div className="space-y-6 font-sans">
            
            {/* Catalog Info Header */}
            <div>
              <h2 className="font-cinzel text-lg font-black text-glow-gold gold-text tracking-widest uppercase">
                კოშმარების სრული არქივი
              </h2>
              <p className="text-xs text-zinc-500">შეარჩიეთ, შეადარეთ და გამოიძახეთ საუკეთესო პაროდიული არსებები</p>
            </div>

            {/* Filter controls panel */}
            <div className="p-3 bg-[#0d0d0d]/95 rounded border border-white/5 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center glass-panel">
              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-550 block mb-0.5">ძებნა:</span>
                <input
                  type="text"
                  placeholder="ჩაწერეთ სახელი ან უნარი..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/60 border border-white/5 p-1.5 rounded text-xs text-white placeholder:text-zinc-650 focus:border-red-800"
                  id="search_field_input"
                />
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-550 block mb-0.5">კატეგორია:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-black/60 border border-white/5 p-1.5 rounded text-xs text-white focus:border-red-800"
                  id="category_filter_dropdown"
                >
                  <option value="all">ყველა კატეგორია</option>
                  <option value="კლოუნადები">კლოუნადები</option>
                  <option value="აჩრდილები">აჩრდილები</option>
                  <option value="წყეული თოჯინები">წყეული თოჯინები</option>
                  <option value="დემონები">დემონები</option>
                  <option value="ალქაჯები">ალქაჯები</option>
                  <option value="მკვლელები">მკვლელები</option>
                  <option value="სხვა">სხვა</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">ბიუჯეტი (Max CC):</span>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
                <div className="text-right text-[10px] text-yellow-500 font-bold font-mono">
                  🪙 {maxPrice} Cursed Coins
                </div>
              </div>

              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-555 block mb-0.5">სორტირება:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-black/60 border border-white/5 p-1.5 rounded text-xs text-white focus:border-red-800"
                  id="sort_by_dropdown"
                >
                  <option value="fearDesc">შიშის მიხედვით (შემცირებით)</option>
                  <option value="nameAsc">სახელის ანბანით</option>
                  <option value="priceAsc">ფასის ზრდადობით</option>
                </select>
              </div>
            </div>

            {/* List summary stats */}
            <div className="flex justify-between items-center text-xs text-zinc-500">
              <span>ნაჩვენებია <strong className="text-red-500 font-mono">{filteredVillains.length}</strong> არსება</span>
              <span className="font-mono text-[9px] text-zinc-600">CLIENT CLEARANCE LEVEL: {selectedTier}</span>
            </div>

            {/* GRID CATALOG OF MONSTERS */}
            {filteredVillains.length === 0 ? (
              <div className="text-center py-16 bg-[#0c0c0c] rounded border border-white/5 glass-panel">
                <HelpCircle className="h-10 w-10 text-zinc-800 mx-auto animate-pulse mb-2" />
                <h4 className="text-xs font-bold text-zinc-400">არცერთი არსება არ მოიძებნა</h4>
                <p className="text-[11px] text-zinc-650 mt-0.5">შეცვალეთ ფილტრის პარამეტრები ან სცადეთ კატეგორიების განახლება</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {filteredVillains.map((villain) => (
                  <VillainCard
                    key={villain.id}
                    villain={villain}
                    userTier={selectedTier}
                    onViewDetails={(v) => setSelectedVillain(v)}
                    onBookNow={(v) => {
                      setBookingVillain(v);
                      setIsBookingActive(true);
                    }}
                    onAddToCompare={handleToggleComparison}
                    isComparing={comparisonList.some((c) => c.id === villain.id)}
                  />
                ))}
              </div>
            )}

            {/* Active Comparison drawer widget */}
            {comparisonList.length > 0 && (
              <div className="pt-8">
                <ComparisonTool
                  comparisonList={comparisonList}
                  allVillains={VILLAINS_DATA}
                  onRemove={(id) => setComparisonList(comparisonList.filter((c) => c.id !== id))}
                  onClear={() => setComparisonList([])}
                  onAdd={(v) => setComparisonList([...comparisonList, v])}
                  onBookNow={(v) => {
                    setBookingVillain(v);
                    setIsBookingActive(true);
                  }}
                />
              </div>
            )}

          </div>
        )}

        {/* PAGE 3: COMPARISON DIRECT ACCESS */}
        {currentTab === "comparison" && (
          <div className="space-y-6">
            <ComparisonTool
              comparisonList={comparisonList}
              allVillains={VILLAINS_DATA}
              onRemove={(id) => setComparisonList(comparisonList.filter((c) => c.id !== id))}
              onClear={() => setComparisonList([])}
              onAdd={(v) => setComparisonList([...comparisonList, v])}
              onBookNow={(v) => {
                setBookingVillain(v);
                setIsBookingActive(true);
              }}
            />
          </div>
        )}

        {/* PAGE 4: REVIEWS EXHIBITION */}
        {currentTab === "reviews" && (
          <div className="space-y-6 font-sans">
            <div>
              <h2 className="font-cinzel text-lg font-black gold-text tracking-widest text-glow-gold uppercase">კლიენტების დასკვნები & გამოხმაურებები</h2>
              <p className="text-xs text-zinc-500 mt-1">ყოველდღიური ისტორიები გამოძახების რიტუალებიდან</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Feedback Form (Span 5 of 12) */}
              <div className="lg:col-span-5 glass-panel p-4 rounded border border-white/5 self-start">
                <h4 className="font-cinzel text-xs font-bold text-red-500 mb-3 uppercase tracking-widest">গვიამბეთ თქვენი გამოცდილება</h4>
                <form onSubmit={handleCreateReview} className="space-y-3.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">👤 თქვენი კოდური სახელი:</span>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="მაგ. ალექსანდრე ხ."
                      className="w-full bg-black/60 border border-white/5 p-1.5 rounded text-xs text-white placeholder:text-zinc-600 focus:border-red-850"
                      id="review_author_input"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">👹 აირჩიეთ არსება:</span>
                    <select
                      value={newReviewVillain}
                      onChange={(e) => setNewReviewVillain(e.target.value)}
                      className="w-full bg-black/60 border border-white/5 p-1.5 rounded text-xs text-white focus:border-red-850"
                      id="review_villain_select"
                    >
                      {VILLAINS_DATA.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.exclusiveTier})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">⭐ შეფასება (ვარსკვლავები):</span>
                    <div className="flex gap-1.5 text-yellow-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="hover:scale-110 transition shrink-0"
                        >
                          <Star className={`h-5 w-5 ${newReviewRating >= star ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">📝 თქვენი კომენტარი:</span>
                    <textarea
                      rows={3}
                      required
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="გაგვიზიარეთ სასაცილო ისტორია..."
                      className="w-full bg-black/60 border border-white/5 p-1.5 rounded text-xs text-white placeholder:text-zinc-650 focus:border-red-850"
                      id="review_comment_textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-red-900 hover:bg-red-850 text-xs font-bold text-white rounded transition flex items-center justify-center space-x-1"
                    id="submit_review_btn"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>გამოხმაურების გაგზავნა</span>
                  </button>

                </form>
              </div>

              {/* Reviews List Layout (Span 7 of 12) */}
              <div className="lg:col-span-7 space-y-3.5">
                {reviewsList.map((rev) => {
                  const villainDetails = VILLAINS_DATA.find((v) => v.id === rev.villainId);

                  return (
                    <div 
                      key={rev.id} 
                      className="p-3.5 bg-[#0c0c0c]/90 rounded border border-white/5 relative glass-panel"
                      id={`review_bubble_${rev.id}`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-bold text-zinc-100 block">{rev.username}</span>
                          <span className="text-[9px] text-zinc-550 block font-mono mt-0.5">{rev.timestamp}</span>
                        </div>
                        {villainDetails && (
                          <div className="flex items-center space-x-1.5 bg-black/40 p-0.5 px-2 rounded border border-white/5 font-sans shrink-0">
                            <span className="text-[9px] text-yellow-500/80 block font-bold">კოშმარი:</span>
                            <span className="text-[11px] text-zinc-200 block font-bold capitalize">{villainDetails.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex text-yellow-500 gap-0.5 my-1.5 animate-pulse">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`h-3 w-3 ${idx < rev.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-800"}`} />
                        ))}
                      </div>

                      <p className="text-[11px] md:text-xs text-zinc-350 italic font-medium leading-relaxed">
                        „{rev.comment}“
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* PAGE 5: HISTORY OF THE AGENCY */}
        {currentTab === "history" && (
          <div className="space-y-6 font-sans max-w-3xl mx-auto">
            
            <div className="text-center">
              <h2 className="font-cinzel text-xl md:text-2xl font-black text-[#d4af37] text-glow-gold uppercase tracking-widest">
                სააგენტოს შექმნის ისტორია
              </h2>
              <p className="text-[11px] text-zinc-500 mt-1">დაარსდა 1892 წლის ჯადოსნურ შუაღამეს</p>
            </div>

            <div className="space-y-5 leading-relaxed text-xs text-zinc-400 bg-[#0d0d0d]/95 p-5 md:p-6 rounded border border-white/5 glass-panel">
              
              <div className="border-l-2 border-red-700 pl-3.5 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">ისტორიული პოსტულატი</span>
                <p className="italic font-medium text-zinc-350">
                  „ჩვენ არ ვემსახურებით ბოროტებას – ჩვენ უბრალოდ ვაიძულებთ მონსტრებს, მონაწილეობა მიიღონ ყოველკვირეულ ბიზნეს-კავშირებში.“
                </p>
              </div>

              <p>
                სააგენტო <strong>„კოშმარების დაჯავშნის ბიურო“ (Nightmare Booking Agency)</strong> შეიქმნა უძველესი საიდუმლო ორდენის მიერ ტრანსილვანიაში. კვლევებმა აჩვენა, რომ უმეტეს კოშმარულ არსებას და მონსტრს რეალურად მობეზრდა ხალხის იდუმალი შეშინება, უაზროდ დგომა სიბნელეში და სიარული ძველ სასახლეებში. მათ სურდათ სოციალიზაცია, პროფესიონალური როლები და სტაბილური, უწყინარი საქმიანობა.
              </p>

              <blockquote className="p-3 bg-black/40 border border-white/5 rounded italic block text-zinc-300">
                ⭐ 1995 წელი: პენივაიზმა პირველი დაბადების დღე ჩაატარა თბილისში, უხერხული ცეკვით ბავშვების შეჩერების კატეგორიაში და მიიღო 5 ვარსკვლავი.
              </blockquote>

              <p>
                ჩვენს მისიას წარმოადგენს სრულიად უსაფრთხოდ, იუმორისტულად და საინტერესოდ დავეხმაროთ ადამიანებს ყოველდღიური პრობლემების გადაჭრაში სწორედ ყველაზე უცნაური სატირული საშუალებებით – როგორიცაა სიკვდილის დაქირავება მოტივაციის ამაღლების მიზნით, ან ანაბელის დასმა ტოქსიკური შეხვედრების მოსაგვარებლად.
              </p>

              <div className="pt-2 flex flex-wrap justify-center gap-4">
                <div className="p-3 bg-black/30 rounded border border-white/5 text-center w-36">
                  <span className="text-xl font-black text-red-500 block">10,000+</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-semibold">აურზაური მოგვარებულია</span>
                </div>
                <div className="p-3 bg-black/30 rounded border border-white/5 text-center w-36">
                  <span className="text-xl font-black text-yellow-500 block">100%</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-semibold">გარანტირებული სატირა</span>
                </div>
                <div className="p-3 bg-black/30 rounded border border-white/5 text-center w-36">
                  <span className="text-xl font-black text-emerald-500 block">0%</span>
                  <span className="text-[9px] text-zinc-500 uppercase font-semibold">ნამდვილი დაზიანება</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PAGE 6: SECRET RESEARCH LAB FILES (UNLOCKED BY KONAMI) */}
        {currentTab === "secret" && secretUnlocked && (
          <div className="space-y-8 font-sans max-w-4xl mx-auto animate-pulse">
            
            <div className="text-center p-6 border-2 border-red-500 bg-red-950/20 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.35)]">
              <h2 className="font-cinzel text-xl md:text-3xl font-black text-red-500 uppercase tracking-widest text-glow-red">
                🔒 გასაიდუმლოებული ფაილები (TOP SECRET)
              </h2>
              <span className="text-[10px] bg-red-650 text-white font-bold p-1 px-3 rounded-full uppercase tracking-wider block w-max mx-auto mt-2 animate-bounce">
                სამთავრობო კოდის წვდომა: აქტიურია
              </span>
            </div>

            <div className="p-6 bg-zinc-950/90 rounded-2xl border border-red-950 text-xs text-amber-500 space-y-4">
              <p className="font-bold border-b border-red-950 pb-2 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <span>გაფრთხილება: საიდუმლო უწყება #4092-B</span>
              </p>
              
              <ul className="space-y-3 list-disc pl-5 leading-relaxed text-gray-300">
                <li>
                  <strong className="text-red-500">ექსპერიმენტი ჩაკი:</strong> თოჯინა ჩაკი ამჟამად გადის ტრენინგებს საოჯახო კონსულტირებაში. დაუშვებელია მასთან ერთად იარაღის ან სამზარეულოს სხვა ბასრი ნივთების დატოვება სესიის მიმდინარეობისას.
                </li>
                <li>
                  <strong className="text-red-500">ნეკრო-ექსპერტიზა:</strong> სიკვდილის ქოუჩინგის დროს კლიენტმა შეიძლება იგრძნოს შემცივნება. ეს სრულიად ჩვეულებრივი ბიოპროცესია და არ წარმოადგენს საშიშროებას.
                </li>
                <li>
                  <strong className="text-red-500">გარანტირებული დაზღვევა:</strong> შეთანხმებაში არსებულ „სულის გადაცემის“ პუნქტს აქვს მხოლოდ იუმორისტული სახე და არ გადაეცემა რეალურ ეშმაკს, გარდა მცირე გამონაკლისებისა იურიდიულ პოსტულატში.
                </li>
              </ul>

              <div className="p-3 bg-red-955 border border-red-500/20 text-glow-red font-mono text-[9px] text-center">
                © კოშმარების სააგენტოს დახურული სამხედრო-საკონსულტანტო ლაბორატორია.
              </div>
            </div>

          </div>
        )}

      </main>

       {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#0a0a0a] py-6 mt-12 text-center text-xs font-sans text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 space-y-2">
          <p className="font-cinzel text-xs text-red-750/80 tracking-widest font-bold uppercase">
            Nightmare Parody Consulting Group Georgia
          </p>
          <p className="text-[10.5px] text-zinc-600 max-w-lg mx-auto leading-relaxed">
            კოშმარების დაჯავშნის სააგენტო არის უწყინარი პაროდიული, სატირული და გასართობი პროექტი. საიტზე აღწერილი შეთანხმებები არ წარმოადგენს ნამდვილ საფრთხეს. დამზადებულია ქართველი მომხმარებლებისთვის.
          </p>
          <div className="flex justify-center gap-3 text-[9px] text-zinc-700 font-mono pt-1">
            <span>© 2026-06-12 კორპორაცია</span>
            <span>•</span>
            <span>ვერსია 4.2.1-LIVE</span>
            <span>•</span>
            <span>3:00 AM რეჟიმი ჩართულია</span>
          </div>
        </div>
      </footer>

      {/* PORTRAIT PROFILE DETAIL DIALOG MODAL */}
      {selectedVillain && (
        <DetailModal
          villain={selectedVillain}
          onClose={() => setSelectedVillain(null)}
          onBookNow={(v) => {
            setSelectedVillain(null);
            setBookingVillain(v);
            setIsBookingActive(true);
          }}
        />
      )}

      {/* INTERACTIVE MULTI-STEP BOOKING DRAWER */}
      {isBookingActive && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 p-4 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center py-4 md:py-8">
            <div className="relative w-full max-w-2xl bg-[#0c0c0c] rounded border border-red-900/30 p-1 shadow-2xl glass-panel">
              <BookingForm
                selectedVillain={bookingVillain}
                allVillains={VILLAINS_DATA}
                userTier={selectedTier}
                onBookingComplete={handleAddBooking}
                onCancel={() => {
                  setIsBookingActive(false);
                  setBookingVillain(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
