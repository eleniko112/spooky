import React, { useState } from "react";
import { Villain, Booking, MembershipTier } from "../types";
import { Calendar, Clock, Smile, Mail, CheckCircle2, AlertTriangle, ChevronRight, Loader2, Play } from "lucide-react";

interface BookingFormProps {
  selectedVillain: Villain | null;
  allVillains: Villain[];
  userTier: MembershipTier;
  onBookingComplete: (newBooking: Booking) => void;
  onCancel: () => void;
}

export default function BookingForm({
  selectedVillain,
  allVillains,
  userTier,
  onBookingComplete,
  onCancel,
}: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [villain, setVillain] = useState<Villain | null>(selectedVillain);
  const [date, setDate] = useState("2026-06-15");
  const [time, setTime] = useState("00:00"); // Midnight style by default!
  const [duration, setDuration] = useState(1);
  const [requestDesc, setRequestDesc] = useState("");
  const [userName, setUserName] = useState("მომხმარებელი");
  const [userEmail, setUserEmail] = useState("horror-lover@nightmare.ge");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingFinished, setBookingFinished] = useState<Booking | null>(null);

  const handleStepClick = (next: number) => {
    if (next < step) setStep(next);
  };

  const handleNextStep = () => {
    if (step === 1 && !villain) {
      alert("გთხოვთ, შეარჩიოთ კოშმარი");
      return;
    }
    if (step === 2 && (!date || !time)) {
      alert("გთხოვთ მიუთითოთ თარიღი და დრო");
      return;
    }
    if (step === 3 && (!requestDesc || !userName || !userEmail)) {
      alert("გთხოვთ შეავსოთ ყველა ველი");
      return;
    }
    setStep(step + 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!villain) return;

    setIsSubmitting(true);

    const totalCost = villain.price * duration;

    // Simulate cinematic summoning/booking animation transition
    setTimeout(() => {
      const newBooking: Booking = {
        id: `book-${Math.random().toString(36).substr(2, 9)}`,
        villainId: villain.id,
        villainName: villain.name,
        date,
        time,
        duration,
        userRequest: requestDesc,
        userEmail,
        userName,
        tier: userTier,
        cost: totalCost,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: "დამტკიცებულია"
      };

      setBookingFinished(newBooking);
      setIsSubmitting(false);
      onBookingComplete(newBooking);
    }, 2500); // 2.5s for spooky ritual loading
  };

  if (bookingFinished) {
    return (
      <div 
        className="w-full text-center border-2 border-dashed border-red-900 rounded-3xl p-8 bg-zinc-950/80 shadow-[0_0_50px_rgba(239,68,68,0.25)] relative overflow-hidden"
        id="booking_confirmation_animated"
      >
        <div className="absolute inset-0 bg-fog-texture opacity-35" />
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Animated summoning circle representation */}
          <div className="h-28 w-28 rounded-full border-4 border-double border-red-600 flex items-center justify-center p-3 mb-6 bg-red-950/30 shadow-[0_0_40px_rgba(220,38,38,0.6)] relative animate-spin-slow">
            <CheckCircle2 className="h-16 w-16 text-yellow-500" />
            <div className="absolute inset-1 border border-dashed border-yellow-500/50 rounded-full" />
          </div>

          <h3 className="font-cinzel text-xl md:text-2xl font-black text-red-500 text-glow-red uppercase tracking-widest leading-tight">
            კონტრაქტი გაფორმდა სიბნელეში!
          </h3>
          <p className="font-sans text-sm text-yellow-500/90 italic mt-2">
            „ summon_ritual_v4: {bookingFinished.villainName} მიღებულია შესასრულებლად“
          </p>

          <div className="w-full max-w-md bg-zinc-900/60 p-4 rounded-2xl border border-red-950/40 text-left my-6 space-y-2.5 font-sans">
            <h4 className="text-xs uppercase font-bold text-gray-500 tracking-wider">ხელშეკრულების დეტალები:</h4>
            <div className="text-xs flex justify-between"><span className="text-gray-400">წარმომადგენელი:</span> <span className="font-bold text-gray-200">{bookingFinished.villainName}</span></div>
            <div className="text-xs flex justify-between"><span className="text-gray-400">თარიღი:</span> <span className="font-bold text-gray-200">{bookingFinished.date}, {bookingFinished.time} საათი</span></div>
            <div className="text-xs flex justify-between"><span className="text-gray-400">დამკვეთი:</span> <span className="font-bold text-gray-200">{bookingFinished.userName}</span></div>
            <div className="text-xs flex justify-between"><span className="text-gray-400">დავალება:</span> <span className="font-bold text-gray-300 italic">„{bookingFinished.userRequest}“</span></div>
            <div className="text-xs flex justify-between border-t border-zinc-800 pt-2"><span className="text-yellow-600 font-semibold font-mono">საკომისიო:</span> <span className="font-bold text-yellow-500 font-mono">🪙 {bookingFinished.cost} Cursed Coins</span></div>
          </div>

          {/* Slogan warnings */}
          <div className="p-3 bg-red-950/15 border border-red-900/40 rounded-xl max-w-sm mb-6 leading-relaxed flex items-start space-x-2 text-left">
            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-400">
              <strong>ყურადღება!</strong> აგენტი გამოცხადდება ზუსტად {bookingFinished.time} საათზე. გთხოვთ, არ დატოვოთ ნიორი ოთახში და მოამზადოთ დასახელებული საკომისიო მონეტები.
            </p>
          </div>

          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-xs font-bold text-gray-300 rounded-xl transition"
            id="back_post_booking"
          >
            დასრულება & დაბრუნება
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full rounded-2xl border border-red-950/40 bg-zinc-950/50 backdrop-blur-xl p-5 md:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
      id="booking_flow_wizard"
    >
      <div className="absolute inset-0 bg-fog-texture opacity-10 pointer-events-none" />

      {/* Header and Step Indicators */}
      <div className="flex justify-between items-center border-b border-zinc-905 pb-4 mb-6">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-red-500">კოშმარის გამოძახება</h2>
          <p className="text-[10px] font-sans text-gray-400">პაროდიული მომსახურების დაჯავშნის სერვისი</p>
        </div>
        <button 
          onClick={onCancel} 
          className="text-xs font-sans text-gray-400 hover:text-white transition"
          id="cancel_booking_btn"
        >
          დახურვა [X]
        </button>
      </div>

      {/* Step Wizard Header */}
      <div className="grid grid-cols-4 gap-2 mb-6 text-center font-sans">
        {[1, 2, 3, 4].map((s) => (
          <button
            key={s}
            onClick={() => handleStepClick(s)}
            disabled={s >= step}
            className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
              s === step
                ? "bg-red-900/30 text-red-400 border border-red-800/60 shadow-[0_0_10px_rgba(185,28,28,0.2)]"
                : s < step
                ? "bg-zinc-900/40 text-emerald-500 hover:bg-zinc-900 border border-zinc-900"
                : "bg-zinc-900/10 text-gray-600 border border-transparent"
            }`}
          >
            ნაბიჯი {s}
          </button>
        ))}
      </div>

      {/* Spinner Overlay for Summoming Spells */}
      {isSubmitting ? (
        <div className="py-16 text-center flex flex-col items-center font-sans">
          <Loader2 className="h-12 w-12 text-red-500 animate-spin" />
          <h4 className="mt-4 font-cinzel text-lg font-bold text-gray-200 text-glow-red tracking-widest animate-pulse">
            ყალიბდება შავი ხელშეკრულება...
          </h4>
          <p className="text-xs text-gray-500 italic mt-2">რიტუალი სრულდება ვარსკვლავთა ჩასვლისას</p>
          <div className="w-52 h-1 bg-zinc-900 rounded-full mt-4 overflow-hidden">
            <div className="bg-red-650 h-full w-1/3 animate-ping" />
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-5 font-sans">
          {/* STEP 1: SELECT VILLAIN */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-300 block">1. აირჩიეთ კოშმარული არსება:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto pr-1">
                {allVillains.map((v) => {
                  // check exclusive lockdown
                  const tierWeights = { Bronze: 1, Silver: 2, Gold: 3, "Eldritch Elite": 4 };
                  const isLocked = tierWeights[userTier] < tierWeights[v.exclusiveTier];

                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isLocked}
                      onClick={() => setVillain(v)}
                      className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition ${
                        isLocked
                          ? "opacity-25 bg-black border-transparent cursor-not-allowed"
                          : villain?.id === v.id
                          ? "bg-red-950/20 border-red-800 text-red-400 font-semibold"
                          : "bg-zinc-900/60 border-zinc-800 text-gray-300 hover:border-zinc-700"
                      }`}
                    >
                      <img src={v.image} alt={v.name} className="w-10 h-10 object-cover rounded-md shrink-0" referrerPolicy="no-referrer" />
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold block truncate capitalize">{v.name}</span>
                        <span className="text-[9px] text-yellow-500 block">🪙 {v.price} CC / დღეში</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {villain && (
                <div className="p-3.5 rounded-xl bg-orange-950/10 border border-orange-900/20 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">არჩეულია: {villain.name}</span>
                  <div className="text-xs text-gray-300 leading-normal">
                    <strong>ABSURD TASK:</strong> „{villain.absurdTask}“
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-red-950/50 text-xs font-bold text-red-400 border border-red-900/30 rounded-xl hover:bg-red-800 hover:text-white transition flex items-center space-x-1"
                >
                  <span>განაგრძე განრიგზე</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DATE & TIME */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-300 block">2. გამოძახების ვადა & ხანგრძლივობა:</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] text-gray-400 block mb-1">📅 შეარჩიეთ თარიღი:</span>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-zinc-900 rounded-xl border border-zinc-800 p-2.5 pl-10 text-xs text-white"
                      min="2026-06-12"
                      max="2026-06-30"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block mb-1">🕒 გამოსვლის დრო (რეკომენდებულია შუაღამე):</span>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-zinc-900 rounded-xl border border-zinc-800 p-2.5 pl-10 text-xs text-white"
                    >
                      <option value="00:00">00:00 (ჯადოსნური საათი)</option>
                      <option value="03:00">03:00 (დემონური დილა)</option>
                      <option value="12:00">12:00 (შუადღე - მშიშრებისთვის)</option>
                      <option value="19:00">19:00 (საღამოს ბინდი)</option>
                      <option value="23:15">23:15 (კოშმარების შემოტევა)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1">⌛ ხანგრძლივობა (დღეები):</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-red-650"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 დღე</span>
                  <span className="text-yellow-500 font-bold font-mono">{duration} დღე</span>
                  <span>5 დღე</span>
                </div>
              </div>

              {villain && (
                <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-850 flex justify-between items-center text-xs">
                  <span className="text-gray-400">გამოძახების კალკულაცია:</span>
                  <span className="font-bold text-yellow-500 font-mono">
                    🪙 {villain.price} x {duration} = {villain.price * duration} CC
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-zinc-805 text-xs font-semibold text-gray-400 rounded-xl hover:text-white transition"
                >
                  უკან დაბრუნება
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-red-950/50 text-xs font-bold text-red-400 border border-red-900/30 rounded-xl hover:bg-red-800 hover:text-white transition flex items-center space-x-1"
                >
                  <span>დამატებითი მოთხოვნები</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: USER PROFILE & REQUEST DESCRIPTION */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-300 block">3. დეტალური დავალება:</label>
              
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-gray-400 block mb-1">📝 აღწერეთ აბსურდული დავალება (მაგალითად: „დახვდი მეზობელს კიბეზე წითელი ბუშტით“):</span>
                  <textarea
                    rows={2}
                    value={requestDesc}
                    onChange={(e) => setRequestDesc(e.target.value)}
                    placeholder="პოსტულატი, თუ რას გააკეთებს მონსტრი..."
                    className="w-full bg-zinc-900 rounded-xl border border-zinc-800 p-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1">👤 თქვენი სახელი/კოდი:</span>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-zinc-900 rounded-xl border border-zinc-800 p-2 text-white"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1">✉️ თქვენი უსაფრთხო ელ-ფოსტა:</span>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-zinc-900 rounded-xl border border-zinc-800 p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-zinc-805 text-xs font-semibold text-gray-400 rounded-xl hover:text-white transition"
                >
                  უკან
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-red-950/50 text-xs font-bold text-red-400 border border-red-900/30 rounded-xl hover:bg-red-800 hover:text-white transition flex items-center space-x-1"
                >
                  <span>სიბნელის ხელშეკრულება</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FINAL SUMMON REVIEW */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-red-500 uppercase tracking-widest block font-cinzel">4. კონტრაქტის გაფორმება</label>

              <div className="rounded-2xl border border-red-900/50 bg-red-950/10 p-4 space-y-3">
                <h4 className="text-xs font-bold text-yellow-500 uppercase font-sans">
                  ხელშეკრულება კოშმართან:
                </h4>
                
                {villain && (
                  <div className="flex items-center space-x-3 pb-3 border-b border-red-950/50">
                    <img src={villain.image} alt={villain.name} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div>
                      <span className="text-sm font-bold text-white block capitalize">{villain.name}</span>
                      <span className="text-[10px] text-gray-400 block font-sans">{villain.title}</span>
                    </div>
                  </div>
                )}

                <div className="text-xs space-y-1.5 text-gray-300 leading-normal font-sans">
                  <p>🔹 <strong>გამოსვლის დრო:</strong> {date} / {time}</p>
                  <p>🔹 <strong>სამუშაო ხანგრძლივობა:</strong> {duration} დღე</p>
                  <p>🔹 <strong>დამკვეთი:</strong> {userName} ({userEmail})</p>
                  <p>🔹 <strong>დავალების აღწერა:</strong> <span className="italic text-gray-400">„{requestDesc}“</span></p>
                  <p className="pt-2 border-t border-red-950/40 text-sm font-bold text-yellow-400 font-mono">
                    საერთო თანხა: 🪙 {villain!.price * duration} Cursed Coins
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 border border-zinc-805 text-xs font-semibold text-gray-400 rounded-xl hover:text-white transition"
                >
                  უკან
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-800 hover:bg-red-700 text-xs font-black text-white rounded-xl transition shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center space-x-1.5"
                  id="final_summon_sumit_btn"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>ჩააბარე სული (დაჯავშნე)</span>
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
