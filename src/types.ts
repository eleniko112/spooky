export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  timestamp: string;
  villainId: string;
}

export interface Villain {
  id: string;
  name: string;
  title: string;
  category: "კლოუნადები" | "დემონები" | "აჩრდილები" | "წყეული თოჯინები" | "ალქაჯები" | "მკვლელები" | "სხვა";
  image: string;
  posterPrompt: string; // Used for descriptive reference
  fearLevel: number; // 0 - 100
  reliability: number; // 0 - 100
  entranceRating: number; // 0 - 100
  voiceScore: number; // 0 - 100
  disappearanceChance: number; // 0 - 100
  price: number; // mock daily rate in "Cursed Coins" (ან ლარი)
  specialAbilities: string[];
  sideEffects: string[];
  availability: string[]; // List of booked dates (e.g., ["2026-06-13", "2026-06-15"])
  exclusiveTier: "Bronze" | "Silver" | "Gold" | "Eldritch Elite";
  description: string;
  absurdTask: string; // The funny service they provide
}

export type MembershipTier = "Bronze" | "Silver" | "Gold" | "Eldritch Elite";

export interface Booking {
  id: string;
  villainId: string;
  villainName: string;
  date: string;
  time: string;
  duration: number; // in hours
  userRequest: string;
  userEmail: string;
  userName: string;
  tier: MembershipTier;
  cost: number;
  timestamp: string;
  status: "დამტკიცებულია" | "დაკავებულია" | "გაუქმებულია";
}

export interface HauntedZone {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage coordinate for SVG/relative layer
  dangerLevel: "დაბალი" | "საშუალო" | "კრიტიკული" | "კოშმარული";
  lore: string;
  activeEntity: string;
}
