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
    id: "meatless-monday",
    title: "Meatless Monday",
    description: "Skipping meat for a day reduces emissions from livestock and helps the planet. Plant-based meals use less water and land too.",
    daily_task: "Eat only plant-based meals today",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "unplug-devices",
    title: "Unplug Unused Devices",
    description: "Electronics draw power even when off. Unplugging chargers and devices eliminates phantom energy drain.",
    daily_task: "Unplug all unused chargers and devices in your home",
    estimated_impact: "Save ~0.3 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "bike-to-work",
    title: "Bike to Work",
    description: "Swapping your car for a bike cuts emissions to zero while improving your health and saving money on gas.",
    daily_task: "Bike or walk instead of driving today",
    estimated_impact: "Save ~3 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "reusable-bags",
    title: "Bring Your Own Bags",
    description: "Single-use plastic bags take centuries to decompose. Reusable bags reduce waste and pollution.",
    daily_task: "Use only reusable bags for all shopping today",
    estimated_impact: "Prevent 5+ plastic bags from landfills",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "compost-scraps",
    title: "Start Composting",
    description: "Food waste in landfills produces methane, a powerful greenhouse gas. Composting turns scraps into nutrient-rich soil.",
    daily_task: "Compost all food scraps today instead of trashing them",
    estimated_impact: "Prevent ~0.5 kg methane emissions",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "lights-off",
    title: "Lights Off Challenge",
    description: "Turning off lights when you leave a room is one of the easiest ways to save energy and reduce your carbon footprint.",
    daily_task: "Turn off lights every time you leave a room",
    estimated_impact: "Save ~0.2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "local-produce",
    title: "Shop Local",
    description: "Buying locally grown food cuts transportation emissions and supports your community farmers.",
    daily_task: "Buy only locally grown produce today",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "public-transit",
    title: "Take Public Transit",
    description: "Buses and trains carry many people at once, making them far more efficient than individual cars.",
    daily_task: "Use public transportation for all trips today",
    estimated_impact: "Save ~2.5 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "secondhand-shopping",
    title: "Thrift Store Treasure Hunt",
    description: "Buying secondhand clothes prevents waste and avoids the massive carbon footprint of new clothing production.",
    daily_task: "Buy only secondhand items if you shop today",
    estimated_impact: "Save ~5 kg CO₂ per item",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "nature-walk",
    title: "Connect with Nature",
    description: "Spending time in nature reminds us why we're protecting the planet and reduces stress without consuming resources.",
    daily_task: "Spend 30 minutes outside in a natural area",
    estimated_impact: "Zero emissions + mental health boost",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "cold-water-wash",
    title: "Cold Water Laundry",
    description: "Washing clothes in cold water uses 90% less energy than hot water and still gets them clean.",
    daily_task: "Do all laundry in cold water today",
    estimated_impact: "Save ~1.5 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "zero-food-waste",
    title: "Zero Food Waste Day",
    description: "Food waste is a huge problem. Planning meals and using leftovers prevents waste and saves money.",
    daily_task: "Eat only what you have, waste nothing",
    estimated_impact: "Prevent ~0.8 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "carpool-day",
    title: "Carpool Challenge",
    description: "Sharing rides cuts emissions per person and makes commutes more enjoyable.",
    daily_task: "Share a ride with coworkers or friends today",
    estimated_impact: "Save ~1.5 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "recycle-right",
    title: "Perfect Recycling",
    description: "Contaminated recycling ends up in landfills. Clean, sorted recycling actually gets processed.",
    daily_task: "Clean and properly sort all recyclables today",
    estimated_impact: "Ensure materials are actually recycled",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "eco-tip-share",
    title: "Spread the Word",
    description: "Your influence can multiply impact. Sharing eco-tips inspires others to take action too.",
    daily_task: "Share one sustainability tip with a friend or on social media",
    estimated_impact: "Inspire others to reduce emissions",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "thermostat-down",
    title: "Lower the Heat",
    description: "Reducing your thermostat by just 2°F can significantly cut heating costs and emissions.",
    daily_task: "Lower thermostat by 2°F and wear a sweater",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "veggie-lunch",
    title: "Plant-Powered Lunch",
    description: "Even one vegetarian meal makes a difference. Plant proteins have a fraction of meat's carbon footprint.",
    daily_task: "Eat a completely plant-based lunch",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "easy",
    category: "food"
  },
  {
    id: "no-drive-day",
    title: "Car-Free Day",
    description: "Challenge yourself to find alternatives to driving. Walking, biking, and transit all have huge benefits.",
    daily_task: "Don't drive your car at all today",
    estimated_impact: "Save ~5 kg CO₂",
    difficulty: "hard",
    category: "transport"
  },
  {
    id: "repair-not-replace",
    title: "Fix It First",
    description: "Repairing items instead of replacing them prevents waste and avoids the emissions from manufacturing new products.",
    daily_task: "Repair one broken item instead of buying new",
    estimated_impact: "Save ~10 kg CO₂",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "plastic-free-day",
    title: "Zero Single-Use Plastic",
    description: "Plastic pollution is everywhere. Avoiding single-use plastics for a day builds lasting habits.",
    daily_task: "Use no single-use plastics today",
    estimated_impact: "Prevent 10+ plastic items from waste stream",
    difficulty: "hard",
    category: "waste"
  },
  {
    id: "climate-reading",
    title: "Learn About Climate Solutions",
    description: "Understanding climate science and solutions empowers you to take more effective action.",
    daily_task: "Read an article or watch a video about climate solutions",
    estimated_impact: "Knowledge for better decisions",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "led-upgrade",
    title: "Switch to LED",
    description: "LED bulbs use 75% less energy and last 25 times longer than incandescent bulbs.",
    daily_task: "Replace one incandescent bulb with an LED",
    estimated_impact: "Save ~50 kg CO₂ over bulb lifetime",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "seasonal-eating",
    title: "Eat Seasonally",
    description: "Seasonal produce doesn't need to be shipped long distances or grown in energy-intensive greenhouses.",
    daily_task: "Eat only seasonal fruits and vegetables today",
    estimated_impact: "Save ~0.7 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "telecommute",
    title: "Work From Home",
    description: "Skipping the commute eliminates emissions and saves time. Remote work is a climate win-win.",
    daily_task: "Work from home instead of commuting",
    estimated_impact: "Save ~3 kg CO₂",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "no-fast-fashion",
    title: "Skip Fast Fashion",
    description: "The fashion industry is a major polluter. Avoiding impulse clothing purchases makes a real difference.",
    daily_task: "Don't buy any new clothing today",
    estimated_impact: "Avoid ~15 kg CO₂ per item",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "reusable-bottle",
    title: "Refill, Don't Landfill",
    description: "Reusable water bottles prevent plastic waste and save money. Most tap water is perfectly safe.",
    daily_task: "Use only a reusable water bottle today",
    estimated_impact: "Prevent 3 plastic bottles from waste",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "volunteer-cleanup",
    title: "Community Cleanup",
    description: "Removing litter protects wildlife and beautifies your community. Group action builds connections.",
    daily_task: "Pick up litter in your neighborhood for 20 minutes",
    estimated_impact: "Cleaner environment + community impact",
    difficulty: "medium",
    category: "lifestyle"
  },
  {
    id: "air-dry-clothes",
    title: "Air Dry Laundry",
    description: "Clothes dryers are energy hogs. Air drying uses zero electricity and makes clothes last longer.",
    daily_task: "Hang all laundry to air dry instead of using dryer",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "leftover-remix",
    title: "Creative Leftovers",
    description: "Transforming leftovers into new meals prevents waste and saves the emissions from making new food.",
    daily_task: "Create a meal using only leftovers",
    estimated_impact: "Prevent ~0.5 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "walk-short-trips",
    title: "Walk Short Distances",
    description: "Cars are most polluting on short trips when engines are cold. Walking is faster than you think.",
    daily_task: "Walk instead of drive for any trip under 1 mile",
    estimated_impact: "Save ~1 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "borrow-not-buy",
    title: "Borrow Instead of Buy",
    description: "Sharing tools and items with neighbors reduces consumption and builds community.",
    daily_task: "Borrow something you need instead of buying it",
    estimated_impact: "Save ~5 kg CO₂",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "proper-disposal",
    title: "Hazardous Waste Drop-Off",
    description: "Batteries and electronics contain harmful materials. Proper disposal protects soil and water.",
    daily_task: "Take hazardous waste to proper disposal facility",
    estimated_impact: "Prevent soil contamination",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "meditation-outdoors",
    title: "Mindful Nature Time",
    description: "Meditation in nature is emission-free wellness. It deepens your connection to the environment.",
    daily_task: "Meditate or relax outside for 15 minutes",
    estimated_impact: "Mental clarity + zero emissions",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "power-strip-off",
    title: "Switch Off Power Strips",
    description: "Power strips make it easy to cut phantom power drain from multiple devices at once.",
    daily_task: "Turn off all power strips when not in use",
    estimated_impact: "Save ~0.4 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "bulk-buying",
    title: "Buy in Bulk",
    description: "Bulk buying reduces packaging waste and often saves money. Bring your own containers.",
    daily_task: "Buy at least one item from bulk bins",
    estimated_impact: "Reduce packaging waste by 80%",
    difficulty: "easy",
    category: "food"
  },
  {
    id: "bike-maintenance",
    title: "Tune Up Your Bike",
    description: "A well-maintained bike is more fun to ride, making you more likely to choose it over driving.",
    daily_task: "Clean and oil your bike chain",
    estimated_impact: "Enable future emission-free trips",
    difficulty: "medium",
    category: "transport"
  },
  {
    id: "clothing-swap",
    title: "Organize a Swap",
    description: "Clothing swaps give garments new life while being social and fun. One person's excess is another's treasure.",
    daily_task: "Plan or participate in a clothing swap",
    estimated_impact: "Prevent ~20 kg CO₂ per person",
    difficulty: "hard",
    category: "shopping"
  },
  {
    id: "upcycle-project",
    title: "Upcycle Something",
    description: "Turning trash into treasure is creative and prevents waste. Every upcycled item is one less in a landfill.",
    daily_task: "Transform one item destined for trash into something useful",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "plant-native",
    title: "Plant Native Species",
    description: "Native plants support local ecosystems, require less water, and sequester carbon.",
    daily_task: "Plant one native plant or tree",
    estimated_impact: "Sequester ~10 kg CO₂ over lifetime",
    difficulty: "medium",
    category: "lifestyle"
  },
  {
    id: "shorter-shower",
    title: "5-Minute Shower",
    description: "Heating water uses lots of energy. Shorter showers save both water and the energy to heat it.",
    daily_task: "Keep all showers under 5 minutes today",
    estimated_impact: "Save ~0.8 kg CO₂",
    difficulty: "medium",
    category: "energy"
  },
  {
    id: "preserved-food",
    title: "Eat Preserved Foods",
    description: "Canned, jarred, and frozen foods preserve harvests without waste and often have lower carbon footprints.",
    daily_task: "Eat meals using preserved or canned foods",
    estimated_impact: "Reduce food waste",
    difficulty: "easy",
    category: "food"
  },
  {
    id: "combine-errands",
    title: "Batch Your Errands",
    description: "Combining multiple trips into one reduces total driving distance and saves fuel.",
    daily_task: "Plan and combine all errands into one trip",
    estimated_impact: "Save ~2 kg CO₂",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "digital-declutter",
    title: "Digital Cleanup",
    description: "Data storage uses energy. Deleting old files and emails reduces the energy needed for data centers.",
    daily_task: "Delete 100+ old emails and unused files",
    estimated_impact: "Save ~0.1 kg CO₂",
    difficulty: "easy",
    category: "shopping"
  },
  {
    id: "reuse-containers",
    title: "Container Creativity",
    description: "Glass jars, bottles, and containers can be reused endlessly. Save them for storage instead of recycling.",
    daily_task: "Reuse 3 containers instead of recycling them",
    estimated_impact: "Save ~0.3 kg CO₂",
    difficulty: "easy",
    category: "waste"
  },
  {
    id: "eco-documentary",
    title: "Watch an Eco Documentary",
    description: "Documentaries inspire action and deepen understanding of environmental challenges and solutions.",
    daily_task: "Watch a climate or nature documentary",
    estimated_impact: "Inspiration for long-term action",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "natural-light",
    title: "Daylight Hours",
    description: "Using natural light instead of electric lights saves energy and improves mood.",
    daily_task: "Use only natural light until sunset",
    estimated_impact: "Save ~0.5 kg CO₂",
    difficulty: "easy",
    category: "energy"
  },
  {
    id: "whole-foods",
    title: "Whole Food Focus",
    description: "Minimally processed foods have lower carbon footprints than heavily processed alternatives.",
    daily_task: "Eat only whole, unprocessed foods today",
    estimated_impact: "Save ~1.2 kg CO₂",
    difficulty: "medium",
    category: "food"
  },
  {
    id: "inflate-tires",
    title: "Check Tire Pressure",
    description: "Properly inflated tires improve gas mileage by up to 3%, reducing fuel consumption and emissions.",
    daily_task: "Check and inflate car tires to proper pressure",
    estimated_impact: "Save ~0.5 kg CO₂ per week",
    difficulty: "easy",
    category: "transport"
  },
  {
    id: "quality-over-quantity",
    title: "Buy Quality Items",
    description: "High-quality items last longer, reducing the need for replacements and overall consumption.",
    daily_task: "Research durable options before any purchase",
    estimated_impact: "Save ~20 kg CO₂ over item lifetime",
    difficulty: "medium",
    category: "shopping"
  },
  {
    id: "terracycle-program",
    title: "Recycle the Hard Stuff",
    description: "Items like chip bags and toothpaste tubes can be recycled through special programs.",
    daily_task: "Research and sign up for a specialty recycling program",
    estimated_impact: "Prevent 1 kg waste from landfill monthly",
    difficulty: "medium",
    category: "waste"
  },
  {
    id: "gratitude-nature",
    title: "Nature Gratitude",
    description: "Appreciating nature strengthens our commitment to protect it and improves wellbeing.",
    daily_task: "Write down 5 things you're grateful for in nature",
    estimated_impact: "Mindset shift toward sustainability",
    difficulty: "easy",
    category: "lifestyle"
  },
  {
    id: "ceiling-fan",
    title: "Use Ceiling Fans",
    description: "Ceiling fans use far less energy than AC and can make rooms feel 4°F cooler.",
    daily_task: "Use fans instead of AC today",
    estimated_impact: "Save ~3 kg CO₂",
    difficulty: "medium",
    category: "energy"
  },
  {
    id: "food-from-scratch",
    title: "Cook From Scratch",
    description: "Homemade meals have lower carbon footprints than packaged or takeout food.",
    daily_task: "Cook all meals from whole ingredients",
    estimated_impact: "Save ~1.5 kg CO₂",
    difficulty: "hard",
    category: "food"
  },
  {
    id: "electric-alternative",
    title: "Research Electric Vehicles",
    description: "Learning about EVs prepares you for a lower-emission future. Knowledge leads to better decisions.",
    daily_task: "Research electric vehicle options and incentives",
    estimated_impact: "Prepare for ~2 tons CO₂ savings yearly",
    difficulty: "easy",
    category: "transport"
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
