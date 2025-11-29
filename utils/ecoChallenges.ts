export type EcoChallenge = {
  id: string;
  title: string;
  description: string;
  daily_task: string;
  estimated_impact: string;
  difficulty: "easy" | "medium" | "hard";
  category: "energy" | "transport" | "food" | "shopping" | "waste" | "lifestyle";
};

export const ecoChallenges: EcoChallenge[] = [
  {
    id: "bike-to-work",
    title: "Bike to Work Today",
    description: "Leave your car at home and bike to work. You'll cut emissions to zero while getting exercise.",
    daily_task: "Bike to work instead of driving",
    estimated_impact: "Save ~3 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "lights-off-all-day",
    title: "Turn Off Every Light",
    description: "Make it a habit. Every single time you leave a room today, flip the switch off.",
    daily_task: "Turn off lights when leaving every room",
    estimated_impact: "Save ~0.2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "take-bus-today",
    title: "Take the Bus",
    description: "Use public transit for your commute today instead of driving alone.",
    daily_task: "Ride the bus to work and back",
    estimated_impact: "Save ~2.5 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "shop-farmers-market",
    title: "Shop at Farmers Market",
    description: "Buy your groceries from local farmers today instead of the supermarket.",
    daily_task: "Get all groceries from farmers market",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "unplug-everything",
    title: "Unplug All Chargers",
    description: "Walk around your house and unplug every phone charger and device adapter.",
    daily_task: "Unplug all chargers not actively in use",
    estimated_impact: "Save ~0.3 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "walk-to-store",
    title: "Walk to the Store",
    description: "Need groceries or supplies? Walk there instead of driving if it's under a mile.",
    daily_task: "Walk for any errand under 1 mile",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "reusable-bags-today",
    title: "Use Reusable Bags",
    description: "Bring your reusable shopping bags for every single purchase you make today.",
    daily_task: "Only use reusable bags when shopping",
    estimated_impact: "Prevent 5 plastic bags from waste",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "cold-wash-laundry",
    title: "Wash in Cold Water",
    description: "Do your laundry on the cold setting. Clothes get just as clean without hot water.",
    daily_task: "Set washing machine to cold for all loads",
    estimated_impact: "Save ~1.5 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "take-subway",
    title: "Take the Subway",
    description: "Use the subway or metro for all your trips around town today.",
    daily_task: "Ride subway instead of driving",
    estimated_impact: "Save ~2.8 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "buy-local-food",
    title: "Buy Only Local Food",
    description: "Check labels and only buy food grown or produced within 100 miles of you.",
    daily_task: "Purchase only locally-sourced food",
    estimated_impact: "Save ~0.9 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "air-dry-clothes",
    title: "Air Dry Your Laundry",
    description: "Skip the dryer completely. Hang your wet laundry outside or on a drying rack.",
    daily_task: "Hang all laundry to air dry",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "carpool-to-work",
    title: "Carpool Today",
    description: "Share a ride with a coworker or neighbor going the same direction.",
    daily_task: "Carpool with someone for your commute",
    estimated_impact: "Save ~1.5 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "shop-secondhand",
    title: "Shop Secondhand Only",
    description: "If you buy anything today, make sure it's used, not new.",
    daily_task: "Only purchase secondhand items",
    estimated_impact: "Save ~5 kg CO₂ per item",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "compost-all-scraps",
    title: "Compost Everything",
    description: "Put every single food scrap into your compost bin today, not the trash.",
    daily_task: "Compost all organic waste",
    estimated_impact: "Prevent ~0.5 kg methane",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "thermostat-down",
    title: "Lower Your Thermostat",
    description: "Turn your heat down by 2 degrees and put on a sweater instead.",
    daily_task: "Lower thermostat 2°F, wear warmer clothes",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "no-car-today",
    title: "Don't Drive At All",
    description: "Challenge yourself to not use your car for the entire day.",
    daily_task: "Zero car use today",
    estimated_impact: "Save ~5 kg CO₂",
    difficulty: "hard",
    category: "transport"
  },
  {
    id: "eat-leftovers",
    title: "Eat Only Leftovers",
    description: "Make meals today using only food you already have at home.",
    daily_task: "Create meals from leftovers only",
    estimated_impact: "Prevent ~0.5 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "reusable-bottle",
    title: "Use Reusable Bottle",
    description: "Carry your reusable water bottle everywhere and refill it instead of buying plastic bottles.",
    daily_task: "Only drink from reusable bottle",
    estimated_impact: "Prevent 3 plastic bottles from waste",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "power-strips-off",
    title: "Turn Off Power Strips",
    description: "Switch off every power strip in your home when not actively using the devices.",
    daily_task: "Turn off all power strips before bed",
    estimated_impact: "Save ~0.4 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "take-stairs",
    title: "Take the Stairs",
    description: "Skip elevators and escalators completely today. Use stairs everywhere you go.",
    daily_task: "Use stairs instead of elevators",
    estimated_impact: "Save ~0.1 kg CO₂",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "buy-in-bulk",
    title: "Buy Bulk Foods",
    description: "Shop bulk bins at the grocery store to reduce packaging waste.",
    daily_task: "Purchase items from bulk bins",
    estimated_impact: "Reduce packaging by 80%",
    difficulty: "easy",
    category: "food"
  },
  {
    id: "clean-recycle-bins",
    title: "Clean Your Recycling",
    description: "Rinse out all containers before putting them in the recycling bin.",
    daily_task: "Clean all recyclables before binning",
    estimated_impact: "Ensure recycling gets processed",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "work-from-home",
    title: "Work From Home",
    description: "Skip your commute entirely by working remotely today.",
    daily_task: "Work from home instead of commuting",
    estimated_impact: "Save ~3 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "unplug-appliances",
    title: "Unplug Kitchen Appliances",
    description: "Unplug your microwave, toaster, coffee maker when not using them.",
    daily_task: "Unplug all small kitchen appliances",
    estimated_impact: "Save ~0.2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "seasonal-produce",
    title: "Buy Seasonal Produce",
    description: "Only buy fruits and vegetables that are in season right now in your area.",
    daily_task: "Purchase only seasonal produce",
    estimated_impact: "Save ~0.7 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "borrow-tools",
    title: "Borrow Instead of Buy",
    description: "Need a tool? Borrow it from a neighbor instead of buying a new one.",
    daily_task: "Borrow needed items from neighbors",
    estimated_impact: "Save ~5 kg CO₂",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "no-plastic-today",
    title: "Zero Plastic Day",
    description: "Avoid all single-use plastics for the entire day.",
    daily_task: "Don't use any single-use plastic",
    estimated_impact: "Prevent 10 plastic items from waste",
    difficulty: "hard",
    category: "waste"
  },
  {
    id: "bike-for-errands",
    title: "Bike Your Errands",
    description: "Use your bike for all errands and shopping trips today.",
    daily_task: "Bike instead of drive for all errands",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "led-bulb-swap",
    title: "Install LED Bulbs",
    description: "Replace one regular bulb with an energy-efficient LED bulb today.",
    daily_task: "Switch one bulb to LED",
    estimated_impact: "Save ~50 kg CO₂ over lifetime",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "pack-lunch",
    title: "Pack Your Lunch",
    description: "Bring lunch from home instead of buying packaged food or takeout.",
    daily_task: "Bring homemade lunch to work",
    estimated_impact: "Save ~0.6 kg CO₂",
    difficulty: "easy",
    category: "food"
  },
  {
    id: "repair-something",
    title: "Repair Don't Replace",
    description: "Fix one broken item instead of throwing it away and buying new.",
    daily_task: "Repair one broken household item",
    estimated_impact: "Save ~10 kg CO₂",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "use-cloth-napkins",
    title: "Use Cloth Napkins",
    description: "Switch to cloth napkins for all meals today instead of paper.",
    daily_task: "Only use reusable cloth napkins",
    estimated_impact: "Prevent paper waste",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "shorter-shower",
    title: "Take 5-Minute Showers",
    description: "Keep every shower under 5 minutes to save water and heating energy.",
    daily_task: "Limit all showers to 5 minutes max",
    estimated_impact: "Save ~0.8 kg CO₂",
    difficulty: "medium",
    category: "energy"
  },
  {
    id: "walk-dog-locally",
    title: "Walk Don't Drive",
    description: "Walk to nearby destinations instead of driving, even if it takes longer.",
    daily_task: "Walk for all trips under 2 miles",
    estimated_impact: "Save ~1.2 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "meatless-dinner",
    title: "Plant-Based Dinner",
    description: "Make dinner tonight completely plant-based with no meat or dairy.",
    daily_task: "Eat plant-based dinner only",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "easy",
    category: "food"
  },
  {
    id: "skip-fast-fashion",
    title: "No New Clothes",
    description: "Don't buy any new clothing today, no matter how tempting the sale is.",
    daily_task: "Buy zero new clothing items",
    estimated_impact: "Avoid ~15 kg CO₂ per item",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "bring-own-container",
    title: "Bring Your Own Container",
    description: "Bring reusable containers for takeout or restaurant leftovers.",
    daily_task: "Use own containers for all takeout",
    estimated_impact: "Prevent styrofoam waste",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "natural-light-only",
    title: "Use Natural Light",
    description: "Keep electric lights off and use only daylight until sunset.",
    daily_task: "No electric lights until dark",
    estimated_impact: "Save ~0.5 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "combine-car-trips",
    title: "Combine All Errands",
    description: "Plan your route and do all errands in one efficient trip instead of multiple.",
    daily_task: "Make only one car trip for all errands",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "whole-foods-only",
    title: "Buy Whole Foods",
    description: "Avoid all processed and packaged foods. Buy only whole ingredients.",
    daily_task: "Purchase only unprocessed whole foods",
    estimated_impact: "Save ~1.2 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "electronics-recycling",
    title: "Recycle Old Electronics",
    description: "Take old phones, batteries, or electronics to proper recycling today.",
    daily_task: "Drop off e-waste at recycling center",
    estimated_impact: "Prevent toxic waste",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "support-eco-business",
    title: "Shop at Green Business",
    description: "Choose to spend money at businesses with strong environmental practices.",
    daily_task: "Only shop at eco-certified stores",
    estimated_impact: "Support sustainable economy",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "ceiling-fans-only",
    title: "Use Fans Not AC",
    description: "Cool your home with ceiling fans instead of air conditioning today.",
    daily_task: "Keep AC off, use fans only",
    estimated_impact: "Save ~3 kg CO₂",
    difficulty: "medium",
    category: "energy"
  },
  {
    id: "scooter-commute",
    title: "Scooter to Work",
    description: "Use an electric scooter or skateboard for your commute.",
    daily_task: "Commute via scooter or skateboard",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "cook-from-scratch",
    title: "Cook From Scratch",
    description: "Make all meals today from raw ingredients, nothing pre-made or packaged.",
    daily_task: "Cook every meal from whole ingredients",
    estimated_impact: "Save ~1.5 kg CO₂",
    difficulty: "hard",
    category: "food"
  },
  {
    id: "reuse-containers",
    title: "Reuse Glass Jars",
    description: "Save and reuse glass jars instead of recycling or buying new containers.",
    daily_task: "Reuse 3 glass jars for storage",
    estimated_impact: "Save ~0.3 kg CO₂",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "buy-quality-item",
    title: "Buy One Quality Item",
    description: "If buying something new, choose the highest quality that will last longest.",
    daily_task: "Research durability before any purchase",
    estimated_impact: "Save ~20 kg CO₂ over lifetime",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "unplug-tv",
    title: "Unplug TV and Devices",
    description: "Unplug your TV, game consoles, and streaming devices when not watching.",
    daily_task: "Unplug all entertainment devices",
    estimated_impact: "Save ~0.3 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "ride-share",
    title: "Use Rideshare Pool",
    description: "If you must rideshare, choose the shared/pool option to split the trip.",
    daily_task: "Only use shared rideshare options",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "zero-food-waste",
    title: "Waste Zero Food",
    description: "Eat everything you prepare. Compost scraps. Throw away nothing edible.",
    daily_task: "Don't waste any food at all",
    estimated_impact: "Prevent ~0.8 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "digital-receipts",
    title: "Go Paperless",
    description: "Request email receipts instead of printed paper for all purchases.",
    daily_task: "Get only digital receipts today",
    estimated_impact: "Prevent paper waste",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "library-not-buy",
    title: "Borrow From Library",
    description: "Get books or media from the library instead of buying new.",
    daily_task: "Borrow books/media from library",
    estimated_impact: "Save resources from manufacturing",
    difficulty: "easy",
    category: "shopping"
  }
];

export function getChallengeForDate(date: Date): EcoChallenge {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % ecoChallenges.length;
  return ecoChallenges[index];
}

export function getChallengesForMonth(year: number, month: number): Map<number, EcoChallenge> {
  const challenges = new Map<number, EcoChallenge>();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    challenges.set(day, getChallengeForDate(date));
  }
  
  return challenges;
}

export function getChallengesForWeek(startDate: Date): EcoChallenge[] {
  const challenges: EcoChallenge[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    challenges.push(getChallengeForDate(date));
  }
  
  return challenges;
}
