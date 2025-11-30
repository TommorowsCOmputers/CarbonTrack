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
  // Day 1
  { id: "1-easy", title: "Use Reusable Bottle", description: "Carry your reusable water bottle everywhere and refill it instead of buying plastic bottles.", daily_task: "Only drink from reusable bottle", estimated_impact: "Prevent 3 plastic bottles from waste", difficulty: "easy", category: "waste" },
  { id: "1-medium", title: "Bike to Work Today", description: "Leave your car at home and bike to work. You'll cut emissions to zero while getting exercise.", daily_task: "Bike to work instead of driving", estimated_impact: "Save ~3 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "1-hard", title: "Don't Drive At All", description: "Challenge yourself to not use your car for the entire day.", daily_task: "Zero car use today", estimated_impact: "Save ~5 kg CO₂", difficulty: "hard", category: "transport" },

  // Day 2
  { id: "2-easy", title: "Turn Off Every Light", description: "Make it a habit. Every single time you leave a room today, flip the switch off.", daily_task: "Turn off lights when leaving every room", estimated_impact: "Save ~0.2 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "2-medium", title: "Take the Bus", description: "Use public transit for your commute today instead of driving alone.", daily_task: "Ride the bus to work and back", estimated_impact: "Save ~2.5 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "2-hard", title: "Cook From Scratch", description: "Make all meals today from raw ingredients, nothing pre-made or packaged.", daily_task: "Cook every meal from whole ingredients", estimated_impact: "Save ~1.5 kg CO₂", difficulty: "hard", category: "food" },

  // Day 3
  { id: "3-easy", title: "Use Reusable Bags", description: "Bring your reusable shopping bags for every single purchase you make today.", daily_task: "Only use reusable bags when shopping", estimated_impact: "Prevent 5 plastic bags from waste", difficulty: "easy", category: "shopping" },
  { id: "3-medium", title: "Shop at Farmers Market", description: "Buy your groceries from local farmers today instead of the supermarket.", daily_task: "Get all groceries from farmers market", estimated_impact: "Save ~1 kg CO₂", difficulty: "medium", category: "food" },
  { id: "3-hard", title: "Zero Plastic Day", description: "Avoid all single-use plastics for the entire day.", daily_task: "Don't use any single-use plastic", estimated_impact: "Prevent 10 plastic items from waste", difficulty: "hard", category: "waste" },

  // Day 4
  { id: "4-easy", title: "Unplug All Chargers", description: "Walk around your house and unplug every phone charger and device adapter.", daily_task: "Unplug all chargers not actively in use", estimated_impact: "Save ~0.3 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "4-medium", title: "Carpool Today", description: "Share a ride with a coworker or neighbor going the same direction.", daily_task: "Carpool with someone for your commute", estimated_impact: "Save ~1.5 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "4-hard", title: "Shop Secondhand Only", description: "If you buy anything today, make sure it's used, not new.", daily_task: "Only purchase secondhand items", estimated_impact: "Save ~5 kg CO₂ per item", difficulty: "hard", category: "shopping" },

  // Day 5
  { id: "5-easy", title: "Walk to the Store", description: "Need groceries or supplies? Walk there instead of driving if it's under a mile.", daily_task: "Walk for any errand under 1 mile", estimated_impact: "Save ~1 kg CO₂", difficulty: "easy", category: "transport" },
  { id: "5-medium", title: "Buy Local Food", description: "Check labels and only buy food grown or produced within 100 miles of you.", daily_task: "Purchase only locally-sourced food", estimated_impact: "Save ~0.9 kg CO₂", difficulty: "medium", category: "food" },
  { id: "5-hard", title: "Compost All Scraps", description: "Put every single food scrap into your compost bin today, not the trash.", daily_task: "Compost all organic waste", estimated_impact: "Prevent ~0.5 kg methane", difficulty: "hard", category: "waste" },

  // Day 6
  { id: "6-easy", title: "Wash in Cold Water", description: "Do your laundry on the cold setting. Clothes get just as clean without hot water.", daily_task: "Set washing machine to cold for all loads", estimated_impact: "Save ~1.5 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "6-medium", title: "Take the Subway", description: "Use the subway or metro for all your trips around town today.", daily_task: "Ride subway instead of driving", estimated_impact: "Save ~2.8 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "6-hard", title: "Repair Don't Replace", description: "Fix one broken item instead of throwing it away and buying new.", daily_task: "Repair one broken household item", estimated_impact: "Save ~10 kg CO₂", difficulty: "hard", category: "shopping" },

  // Day 7
  { id: "7-easy", title: "Air Dry Your Laundry", description: "Skip the dryer completely. Hang your wet laundry outside or on a drying rack.", daily_task: "Hang all laundry to air dry", estimated_impact: "Save ~2 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "7-medium", title: "Bike Your Errands", description: "Use your bike for all errands and shopping trips today.", daily_task: "Bike instead of drive for all errands", estimated_impact: "Save ~2 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "7-hard", title: "Eat Only Leftovers", description: "Make meals today using only food you already have at home.", daily_task: "Create meals from leftovers only", estimated_impact: "Prevent ~0.5 kg CO₂", difficulty: "hard", category: "food" },

  // Day 8
  { id: "8-easy", title: "Unplug TV and Devices", description: "Unplug your TV, game consoles, and streaming devices when not watching.", daily_task: "Unplug all entertainment devices", estimated_impact: "Save ~0.3 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "8-medium", title: "Work From Home", description: "Skip your commute entirely by working remotely today.", daily_task: "Work from home instead of commuting", estimated_impact: "Save ~3 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "8-hard", title: "Buy Only Local Food", description: "Buy exclusively locally-sourced food for all meals today.", daily_task: "Purchase only local food items", estimated_impact: "Save ~1.2 kg CO₂", difficulty: "hard", category: "food" },

  // Day 9
  { id: "9-easy", title: "Lower Your Thermostat", description: "Turn your heat down by 2 degrees and put on a sweater instead.", daily_task: "Lower thermostat 2°F, wear warmer clothes", estimated_impact: "Save ~2 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "9-medium", title: "Use Rideshare Pool", description: "If you must rideshare, choose the shared/pool option to split the trip.", daily_task: "Only use shared rideshare options", estimated_impact: "Save ~1 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "9-hard", title: "Plant-Based Dinner", description: "Make dinner tonight completely plant-based with no meat or dairy.", daily_task: "Eat plant-based dinner only", estimated_impact: "Save ~1 kg CO₂", difficulty: "hard", category: "food" },

  // Day 10
  { id: "10-easy", title: "Turn Off Power Strips", description: "Switch off every power strip in your home when not actively using the devices.", daily_task: "Turn off all power strips before bed", estimated_impact: "Save ~0.4 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "10-medium", title: "Combine Car Trips", description: "Plan your route and do all errands in one efficient trip instead of multiple.", daily_task: "Make only one car trip for all errands", estimated_impact: "Save ~2 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "10-hard", title: "Buy Whole Foods", description: "Avoid all processed and packaged foods. Buy only whole ingredients.", daily_task: "Purchase only unprocessed whole foods", estimated_impact: "Save ~1.2 kg CO₂", difficulty: "hard", category: "food" },

  // Day 11
  { id: "11-easy", title: "Take the Stairs", description: "Skip elevators and escalators completely today. Use stairs everywhere you go.", daily_task: "Use stairs instead of elevators", estimated_impact: "Save ~0.1 kg CO₂", difficulty: "easy", category: "lifestyle" },
  { id: "11-medium", title: "Buy Seasonal Produce", description: "Only buy fruits and vegetables that are in season right now in your area.", daily_task: "Purchase only seasonal produce", estimated_impact: "Save ~0.7 kg CO₂", difficulty: "medium", category: "food" },
  { id: "11-hard", title: "Borrow Instead of Buy", description: "Need a tool? Borrow it from a neighbor instead of buying a new one.", daily_task: "Borrow needed items from neighbors", estimated_impact: "Save ~5 kg CO₂", difficulty: "hard", category: "shopping" },

  // Day 12
  { id: "12-easy", title: "Buy in Bulk", description: "Shop bulk bins at the grocery store to reduce packaging waste.", daily_task: "Purchase items from bulk bins", estimated_impact: "Reduce packaging by 80%", difficulty: "easy", category: "food" },
  { id: "12-medium", title: "Clean Recycling", description: "Rinse out all containers before putting them in the recycling bin.", daily_task: "Clean all recyclables before binning", estimated_impact: "Ensure recycling gets processed", difficulty: "medium", category: "waste" },
  { id: "12-hard", title: "Pack Your Lunch", description: "Bring lunch from home instead of buying packaged food or takeout.", daily_task: "Bring homemade lunch to work", estimated_impact: "Save ~0.6 kg CO₂", difficulty: "hard", category: "food" },

  // Day 13
  { id: "13-easy", title: "Use Natural Light", description: "Keep electric lights off and use only daylight until sunset.", daily_task: "No electric lights until dark", estimated_impact: "Save ~0.5 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "13-medium", title: "Recycle Old Electronics", description: "Take old phones, batteries, or electronics to proper recycling today.", daily_task: "Drop off e-waste at recycling center", estimated_impact: "Prevent toxic waste", difficulty: "medium", category: "waste" },
  { id: "13-hard", title: "Waste Zero Food", description: "Eat everything you prepare. Compost scraps. Throw away nothing edible.", daily_task: "Don't waste any food at all", difficulty: "hard", category: "food", estimated_impact: "Prevent ~0.8 kg CO₂" },

  // Day 14
  { id: "14-easy", title: "Use Cloth Napkins", description: "Switch to cloth napkins for all meals today instead of paper.", daily_task: "Only use reusable cloth napkins", estimated_impact: "Prevent paper waste", difficulty: "easy", category: "waste" },
  { id: "14-medium", title: "Take 5-Minute Showers", description: "Keep every shower under 5 minutes to save water and heating energy.", daily_task: "Limit all showers to 5 minutes max", estimated_impact: "Save ~0.8 kg CO₂", difficulty: "medium", category: "energy" },
  { id: "14-hard", title: "LED Bulb Swap", description: "Replace one regular bulb with an energy-efficient LED bulb today.", daily_task: "Switch one bulb to LED", estimated_impact: "Save ~50 kg CO₂ over lifetime", difficulty: "hard", category: "energy" },

  // Day 15
  { id: "15-easy", title: "Bring Your Own Container", description: "Bring reusable containers for takeout or restaurant leftovers.", daily_task: "Use own containers for all takeout", estimated_impact: "Prevent styrofoam waste", difficulty: "easy", category: "waste" },
  { id: "15-medium", title: "Support Eco Business", description: "Choose to spend money at businesses with strong environmental practices.", daily_task: "Only shop at eco-certified stores", estimated_impact: "Support sustainable economy", difficulty: "medium", category: "shopping" },
  { id: "15-hard", title: "Use Fans Not AC", description: "Cool your home with ceiling fans instead of air conditioning today.", daily_task: "Keep AC off, use fans only", estimated_impact: "Save ~3 kg CO₂", difficulty: "hard", category: "energy" },

  // Day 16
  { id: "16-easy", title: "Reuse Glass Jars", description: "Save and reuse glass jars instead of recycling or buying new containers.", daily_task: "Reuse 3 glass jars for storage", estimated_impact: "Save ~0.3 kg CO₂", difficulty: "easy", category: "waste" },
  { id: "16-medium", title: "Walk Don't Drive", description: "Walk to nearby destinations instead of driving, even if it takes longer.", daily_task: "Walk for all trips under 2 miles", estimated_impact: "Save ~1.2 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "16-hard", title: "Scooter Commute", description: "Use an electric scooter or skateboard for your commute.", daily_task: "Commute via scooter or skateboard", estimated_impact: "Save ~2 kg CO₂", difficulty: "hard", category: "transport" },

  // Day 17
  { id: "17-easy", title: "Go Paperless", description: "Request email receipts instead of printed paper for all purchases.", daily_task: "Get only digital receipts today", estimated_impact: "Prevent paper waste", difficulty: "easy", category: "waste" },
  { id: "17-medium", title: "Borrow From Library", description: "Get books or media from the library instead of buying new.", daily_task: "Borrow books/media from library", estimated_impact: "Save resources from manufacturing", difficulty: "medium", category: "shopping" },
  { id: "17-hard", title: "Buy Quality Item", description: "If buying something new, choose the highest quality that will last longest.", daily_task: "Research durability before any purchase", estimated_impact: "Save ~20 kg CO₂ over lifetime", difficulty: "hard", category: "shopping" },

  // Day 18
  { id: "18-easy", title: "Skip Fast Fashion", description: "Don't buy any new clothing today, no matter how tempting the sale is.", daily_task: "Buy zero new clothing items", estimated_impact: "Avoid ~15 kg CO₂ per item", difficulty: "easy", category: "shopping" },
  { id: "18-medium", title: "Meatless Dinner", description: "Make dinner tonight completely plant-based with no meat or dairy.", daily_task: "Eat plant-based dinner only", estimated_impact: "Save ~1 kg CO₂", difficulty: "medium", category: "food" },
  { id: "18-hard", title: "Whole Foods Only", description: "Buy exclusively whole, unprocessed foods for all meals today.", daily_task: "Purchase only unprocessed items", estimated_impact: "Save ~1.5 kg CO₂", difficulty: "hard", category: "food" },

  // Day 19
  { id: "19-easy", title: "Digital Receipts Only", description: "Request email receipts for all purchases today.", daily_task: "Get only digital receipts", estimated_impact: "Prevent paper waste", difficulty: "easy", category: "waste" },
  { id: "19-medium", title: "Local Shopping", description: "Shop at local businesses and markets instead of big chain stores.", daily_task: "Support only local businesses today", estimated_impact: "Reduce transport emissions", difficulty: "medium", category: "shopping" },
  { id: "19-hard", title: "Carbon-Neutral Day", description: "Challenge yourself to use zero carbon emissions for the entire day.", daily_task: "Zero emissions all day", estimated_impact: "Save ~5-10 kg CO₂", difficulty: "hard", category: "lifestyle" },

  // Day 20
  { id: "20-easy", title: "Refill Reusable Bottle", description: "Use your reusable water bottle all day instead of buying drinks.", daily_task: "Only drink from reusable bottle", estimated_impact: "Prevent 4 plastic bottles", difficulty: "easy", category: "waste" },
  { id: "20-medium", title: "Eco-Friendly Cleaning", description: "Use vinegar and baking soda for cleaning instead of commercial products.", daily_task: "Clean home with natural products only", estimated_impact: "Reduce chemical waste", difficulty: "medium", category: "waste" },
  { id: "20-hard", title: "Minimize Packaging", description: "Make all purchases today with zero or minimal packaging.", daily_task: "Buy only minimal packaging items", estimated_impact: "Prevent packaging waste", difficulty: "hard", category: "shopping" },

  // Day 21
  { id: "21-easy", title: "Unplug Before Bed", description: "Turn off and unplug devices before going to sleep.", daily_task: "Unplug everything at night", estimated_impact: "Save ~0.4 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "21-medium", title: "Bike Errands", description: "Use your bike for shopping and errands today.", daily_task: "Bike for all errands", estimated_impact: "Save ~1.5 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "21-hard", title: "Zero Waste Dinner", description: "Prepare a zero-waste dinner with no packaging or waste.", daily_task: "Create completely zero-waste meal", estimated_impact: "Prevent all food packaging waste", difficulty: "hard", category: "food" },

  // Day 22
  { id: "22-easy", title: "Quick Shower", description: "Take a quick shower under 5 minutes.", daily_task: "Shower for 5 minutes or less", estimated_impact: "Save ~0.6 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "22-medium", title: "Public Transit", description: "Use only public transportation for all trips today.", daily_task: "Only use buses/trains/subway", estimated_impact: "Save ~3 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "22-hard", title: "Repair Clothing", description: "Mend or repair worn clothing instead of buying new.", daily_task: "Repair one damaged clothing item", estimated_impact: "Save ~5 kg CO₂", difficulty: "hard", category: "shopping" },

  // Day 23
  { id: "23-easy", title: "Dishwasher Eco Mode", description: "Use the eco/energy-saving mode on your dishwasher.", daily_task: "Run dishwasher on eco mode only", estimated_impact: "Save ~0.3 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "23-medium", title: "Plant a Tree", description: "Plant a tree or native plants in your yard or community.", daily_task: "Plant one tree or shrub", estimated_impact: "Carbon offset for 20+ years", difficulty: "medium", category: "lifestyle" },
  { id: "23-hard", title: "Grow Own Food", description: "Start a garden or grow vegetables at home.", daily_task: "Begin or tend a vegetable garden", estimated_impact: "Reduce food transport emissions", difficulty: "hard", category: "food" },

  // Day 24
  { id: "24-easy", title: "Reusable Coffee Cup", description: "Use your own coffee cup at cafes instead of disposable cups.", daily_task: "Bring reusable cup for all coffee", estimated_impact: "Prevent 1 disposable cup", difficulty: "easy", category: "waste" },
  { id: "24-medium", title: "Walk to Work", description: "Walk to work instead of driving or using transit.", daily_task: "Walk entire commute", estimated_impact: "Save ~2.5 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "24-hard", title: "All Organic Groceries", description: "Buy only organic food at the grocery store today.", daily_task: "Purchase only organic items", estimated_impact: "Support sustainable farming", difficulty: "hard", category: "food" },

  // Day 25
  { id: "25-easy", title: "Light Off While Cooking", description: "Turn off lights in rooms you leave while cooking.", daily_task: "Turn off unused room lights", estimated_impact: "Save ~0.1 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "25-medium", title: "Thrift Store Shopping", description: "Buy all your shopping needs from thrift stores today.", daily_task: "Shop only secondhand", estimated_impact: "Save ~10 kg CO₂", difficulty: "medium", category: "shopping" },
  { id: "25-hard", title: "Vegan Day", description: "Eat completely vegan - no meat, dairy, or animal products.", daily_task: "Eat 100% plant-based all day", estimated_impact: "Save ~2 kg CO₂", difficulty: "hard", category: "food" },

  // Day 26
  { id: "26-easy", title: "Close Unused Rooms", description: "Close doors to rooms you're not using and lower the thermostat.", daily_task: "Heat/cool only rooms in use", estimated_impact: "Save ~1 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "26-medium", title: "Carpool Day", description: "Organize a carpool for your regular commute.", daily_task: "Carpool with multiple people", estimated_impact: "Save ~2 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "26-hard", title: "Buy Nothing Day", description: "Challenge yourself to buy absolutely nothing today.", daily_task: "Make zero purchases", estimated_impact: "Reduce consumption", difficulty: "hard", category: "shopping" },

  // Day 27
  { id: "27-easy", title: "Water Off While Brushing", description: "Turn off water while brushing your teeth.", daily_task: "Save water while brushing", estimated_impact: "Save ~8 gallons", difficulty: "easy", category: "energy" },
  { id: "27-medium", title: "Local Restaurant", description: "Eat at a local farm-to-table restaurant.", daily_task: "Dine at local farm restaurant", estimated_impact: "Support local sustainable food", difficulty: "medium", category: "food" },
  { id: "27-hard", title: "Clean Energy Only", description: "Use only renewable energy sources for everything today.", daily_task: "Zero fossil fuels all day", estimated_impact: "Save ~4 kg CO₂", difficulty: "hard", category: "energy" },

  // Day 28
  { id: "28-easy", title: "Hang Dry Delicates", description: "Hand wash and air dry delicate clothing instead of using the washer.", daily_task: "Hand wash and hang dry items", estimated_impact: "Save ~0.8 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "28-medium", title: "Compost Kitchen Scraps", description: "Compost all fruit and vegetable scraps.", daily_task: "Start composting today", estimated_impact: "Prevent methane from landfills", difficulty: "medium", category: "waste" },
  { id: "28-hard", title: "Zero Email Today", description: "Challenge yourself to send zero work emails and use phone instead.", daily_task: "Use only phone/in-person communication", estimated_impact: "Reduce digital carbon", difficulty: "hard", category: "lifestyle" },

  // Day 29
  { id: "29-easy", title: "Energy Star Appliances", description: "Use only Energy Star certified appliances today.", daily_task: "Operate only efficient appliances", estimated_impact: "Reduce energy use by 25%", difficulty: "easy", category: "energy" },
  { id: "29-medium", title: "Beach Cleanup", description: "Spend time cleaning up local beach or park.", daily_task: "Participate in cleanup activity", estimated_impact: "Prevent ocean pollution", difficulty: "medium", category: "waste" },
  { id: "29-hard", title: "Sustainable Fashion Only", description: "Wear only ethically-made, sustainable clothing.", daily_task: "Dress only in sustainable fashion", estimated_impact: "Support ethical production", difficulty: "hard", category: "shopping" },

  // Day 30
  { id: "30-easy", title: "Reusable Lunch Box", description: "Pack lunch in a reusable container instead of disposable.", daily_task: "Use reusable lunch container", estimated_impact: "Prevent packaging waste", difficulty: "easy", category: "waste" },
  { id: "30-medium", title: "Green Cleaning Day", description: "Clean your entire home with eco-friendly products.", daily_task: "Use only natural cleaning products", estimated_impact: "Reduce chemical pollution", difficulty: "medium", category: "waste" },
  { id: "30-hard", title: "Microplastic Free", description: "Avoid all products containing microplastics.", daily_task: "Buy zero microplastic products", estimated_impact: "Prevent ocean pollution", difficulty: "hard", category: "waste" },

  // Day 31
  { id: "31-easy", title: "Reusable Straws", description: "Use reusable metal or bamboo straws instead of plastic.", daily_task: "Only use reusable straws", estimated_impact: "Prevent plastic waste", difficulty: "easy", category: "waste" },
  { id: "31-medium", title: "Farmers Market Visit", description: "Shop exclusively at farmers markets today.", daily_task: "Buy all food from farmers market", estimated_impact: "Save ~2 kg CO₂", difficulty: "medium", category: "food" },
  { id: "31-hard", title: "Advocacy Day", description: "Spend time advocating for environmental causes.", daily_task: "Support environmental advocacy", estimated_impact: "Create systemic change", difficulty: "hard", category: "lifestyle" },

  // Day 32
  { id: "32-easy", title: "Smart Power Strips", description: "Turn on smart power strips to eliminate phantom energy.", daily_task: "Use smart power strips", estimated_impact: "Save ~0.5 kg CO₂", difficulty: "easy", category: "energy" },
  { id: "32-medium", title: "Skippy Day Challenge", description: "Use only public transportation or walking.", daily_task: "Zero car use today", estimated_impact: "Save ~3 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "32-hard", title: "Living Wage Only", description: "Shop only at businesses paying living wages.", daily_task: "Support ethical employers", estimated_impact: "Support worker rights", difficulty: "hard", category: "shopping" },

  // Day 33
  { id: "33-easy", title: "Window Shopping", description: "Meet friends but don't buy anything.", daily_task: "Window shop, buy nothing", estimated_impact: "Reduce consumption", difficulty: "easy", category: "lifestyle" },
  { id: "33-medium", title: "Volunteer Day", description: "Volunteer for an environmental organization.", daily_task: "Volunteer for eco cause", estimated_impact: "Create positive impact", difficulty: "medium", category: "lifestyle" },
  { id: "33-hard", title: "Zero Carbon Meals", description: "All meals today are completely carbon-neutral.", daily_task: "Eat only zero-carbon meals", estimated_impact: "Save ~3 kg CO₂", difficulty: "hard", category: "food" },

  // Day 34
  { id: "34-easy", title: "Beeswax Wraps", description: "Use beeswax food wraps instead of plastic wrap.", daily_task: "Wrap food with beeswax wraps", estimated_impact: "Prevent plastic use", difficulty: "easy", category: "waste" },
  { id: "34-medium", title: "Bike Maintenance", description: "Service your bike and ensure it's in good condition.", daily_task: "Maintain bike properly", estimated_impact: "Enable sustainable transport", difficulty: "medium", category: "transport" },
  { id: "34-hard", title: "Plastic Fast", description: "Avoid all plastic purchases for one week.", daily_task: "Buy zero plastic items", estimated_impact: "Prevent plastic waste", difficulty: "hard", category: "waste" },

  // Day 35
  { id: "35-easy", title: "Energy Audit", description: "Check your home for energy leaks and inefficiencies.", daily_task: "Identify energy waste areas", estimated_impact: "Reduce energy use", difficulty: "easy", category: "energy" },
  { id: "35-medium", title: "Carpool Organize", description: "Help organize a regular carpool group.", daily_task: "Set up carpool system", estimated_impact: "Save ~5 kg CO₂/person/day", difficulty: "medium", category: "transport" },
  { id: "35-hard", title: "Zero Packaging Challenge", description: "Buy nothing with packaging today.", daily_task: "Purchase only unpackaged items", estimated_impact: "Prevent all packaging waste", difficulty: "hard", category: "shopping" },

  // Day 36
  { id: "36-easy", title: "Rainwater Harvesting", description: "Set up a rainwater collection system for watering plants.", daily_task: "Start rainwater collection", estimated_impact: "Reduce water use", difficulty: "easy", category: "energy" },
  { id: "36-medium", title: "Transit Pass", description: "Buy a monthly public transit pass to encourage use.", daily_task: "Invest in transit pass", estimated_impact: "Commit to sustainable transport", difficulty: "medium", category: "transport" },
  { id: "36-hard", title: "Fair Trade Only", description: "Buy only fair trade certified products today.", daily_task: "Purchase only fair trade items", estimated_impact: "Support ethical production", difficulty: "hard", category: "shopping" },

  // Day 37
  { id: "37-easy", title: "Donate Unused Items", description: "Donate clothes and items you no longer use.", daily_task: "Donate 5+ items", estimated_impact: "Prevent landfill waste", difficulty: "easy", category: "waste" },
  { id: "37-medium", title: "Community Garden", description: "Participate in or start a community garden.", daily_task: "Work in community garden", estimated_impact: "Grow local food", difficulty: "medium", category: "food" },
  { id: "37-hard", title: "Sustainable Living Week", description: "Challenge yourself to live completely sustainably for a week.", daily_task: "Plan sustainability week", estimated_impact: "Create lasting habits", difficulty: "hard", category: "lifestyle" },

  // Day 38
  { id: "38-easy", title: "Furniture Repurposing", description: "Upcycle old furniture into something new.", daily_task: "Repurpose one furniture item", estimated_impact: "Prevent waste", difficulty: "easy", category: "waste" },
  { id: "38-medium", title: "Car-Free Day", description: "Plan activities within walking/biking distance.", daily_task: "No car use all day", estimated_impact: "Save ~4 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "38-hard", title: "Zero Waste Home", description: "Create a completely zero-waste home setup.", daily_task: "Organize zero-waste system", estimated_impact: "Eliminate all household waste", difficulty: "hard", category: "waste" },

  // Day 39
  { id: "39-easy", title: "Share Leftovers", description: "Share your leftover food with friends or neighbors.", daily_task: "Distribute leftovers", estimated_impact: "Prevent food waste", difficulty: "easy", category: "food" },
  { id: "39-medium", title: "Efficient Route", description: "Plan the most efficient route for your errands.", daily_task: "Optimize travel route", estimated_impact: "Save ~1 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "39-hard", title: "Ethical Consumer Day", description: "Research and only buy from ethical companies.", daily_task: "Research company ethics", estimated_impact: "Support ethical business", difficulty: "hard", category: "shopping" },

  // Day 40
  { id: "40-easy", title: "Plastic Swap", description: "Replace one plastic item with a sustainable alternative.", daily_task: "Swap one plastic item", estimated_impact: "Reduce plastic", difficulty: "easy", category: "waste" },
  { id: "40-medium", title: "Bike Group Ride", description: "Join or organize a community bike ride.", daily_task: "Participate in group ride", estimated_impact: "Promote cycling", difficulty: "medium", category: "transport" },
  { id: "40-hard", title: "Carbon Offset", description: "Calculate and offset your carbon footprint.", daily_task: "Purchase carbon offsets", estimated_impact: "Neutralize emissions", difficulty: "hard", category: "lifestyle" },

  // Day 41
  { id: "41-easy", title: "Reusable Shopping List", description: "Use a reusable shopping list instead of paper.", daily_task: "Create reusable list", estimated_impact: "Prevent paper waste", difficulty: "easy", category: "waste" },
  { id: "41-medium", title: "Energy Efficient Lighting", description: "Switch all household bulbs to LEDs.", daily_task: "Replace light bulbs with LED", estimated_impact: "Save ~50 kg CO₂/year", difficulty: "medium", category: "energy" },
  { id: "41-hard", title: "Local Economy Day", description: "Spend all money at local independent businesses.", daily_task: "Support local businesses only", estimated_impact: "Strengthen local economy", difficulty: "hard", category: "shopping" },

  // Day 42
  { id: "42-easy", title: "Plastic Bottle Refill", description: "Refill water bottles at refill stations.", daily_task: "Use water refill stations", estimated_impact: "Prevent plastic bottles", difficulty: "easy", category: "waste" },
  { id: "42-medium", title: "Sunset Walk", description: "Take a sunset walk or bike ride for exercise and joy.", daily_task: "Enjoy outdoor time without car", estimated_impact: "Save ~1 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "42-hard", title: "Sustainable Fashion Only", description: "Wear only clothes from sustainable sources.", daily_task: "Dress in sustainable clothes", estimated_impact: "Support ethical fashion", difficulty: "hard", category: "shopping" },

  // Day 43
  { id: "43-easy", title: "Thermostat Programming", description: "Program your thermostat for optimal efficiency.", daily_task: "Set smart thermostat", estimated_impact: "Save ~10% energy", difficulty: "easy", category: "energy" },
  { id: "43-medium", title: "Community Cleanup", description: "Organize or join a community cleanup.", daily_task: "Clean up local area", estimated_impact: "Remove litter", difficulty: "medium", category: "waste" },
  { id: "43-hard", title: "Vegan Challenge Week", description: "Challenge yourself to eat completely vegan for one week.", daily_task: "Plan vegan week", estimated_impact: "Save ~7 kg CO₂/week", difficulty: "hard", category: "food" },

  // Day 44
  { id: "44-easy", title: "Repair Service", description: "Take an item to a repair shop instead of replacing it.", daily_task: "Repair broken item", estimated_impact: "Prevent landfill waste", difficulty: "easy", category: "shopping" },
  { id: "44-medium", title: "Walking Meetings", description: "Have meetings while walking or biking.", daily_task: "Walk during meetings", estimated_impact: "Save ~0.5 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "44-hard", title: "Carbon Neutral Commute", description: "Create a completely carbon-neutral commute.", daily_task: "Plan zero-carbon route", estimated_impact: "Save ~1000 kg CO₂/year", difficulty: "hard", category: "transport" },

  // Day 45
  { id: "45-easy", title: "Reusable Lunch Containers", description: "Use glass containers instead of plastic for lunch.", daily_task: "Pack lunch in glass", estimated_impact: "Prevent plastic waste", difficulty: "easy", category: "waste" },
  { id: "45-medium", title: "Farmers Market Regular", description: "Become a regular at your local farmers market.", daily_task: "Shop farmers market weekly", estimated_impact: "Support local food system", difficulty: "medium", category: "food" },
  { id: "45-hard", title: "Sustainability Audit", description: "Do a complete sustainability audit of your life.", daily_task: "Analyze carbon footprint", estimated_impact: "Identify improvement areas", difficulty: "hard", category: "lifestyle" },

  // Day 46
  { id: "46-easy", title: "Plant Seeds", description: "Plant seeds for herbs or vegetables indoors.", daily_task: "Plant indoor seeds", estimated_impact: "Grow food", difficulty: "easy", category: "food" },
  { id: "46-medium", title: "Bike to Shop", description: "Use your bike for grocery shopping.", daily_task: "Bike to grocery store", estimated_impact: "Save ~2 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "46-hard", title: "Plastic Elimination", description: "Eliminate all single-use plastic from your life.", daily_task: "Go single-use plastic free", estimated_impact: "Prevent ongoing waste", difficulty: "hard", category: "waste" },

  // Day 47
  { id: "47-easy", title: "Energy Monitor", description: "Use a power meter to identify energy hogs.", daily_task: "Monitor household energy", estimated_impact: "Identify waste", difficulty: "easy", category: "energy" },
  { id: "47-medium", title: "Transit Commute", description: "Use public transportation for your entire commute.", daily_task: "Full transit day", estimated_impact: "Save ~2.5 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "47-hard", title: "Zero Waste Shopping", description: "Shop completely zero-waste using your own containers.", daily_task: "Bring containers to shop", estimated_impact: "Prevent packaging waste", difficulty: "hard", category: "shopping" },

  // Day 48
  { id: "48-easy", title: "Bulk Buying", description: "Buy staple items in bulk to reduce packaging.", daily_task: "Purchase bulk items", estimated_impact: "Reduce packaging by 80%", difficulty: "easy", category: "shopping" },
  { id: "48-medium", title: "Scooter Exploration", description: "Use a scooter to explore your neighborhood.", daily_task: "Travel by scooter", estimated_impact: "Save ~2 kg CO₂", difficulty: "medium", category: "transport" },
  { id: "48-hard", title: "Regenerative Living", description: "Practice regenerative lifestyle choices.", daily_task: "Give back to environment", estimated_impact: "Create positive impact", difficulty: "hard", category: "lifestyle" },

  // Day 49
  { id: "49-easy", title: "Reusable Coffee Filters", description: "Use permanent coffee filters instead of disposable.", daily_task: "Switch to reusable filters", estimated_impact: "Prevent filter waste", difficulty: "easy", category: "waste" },
  { id: "49-medium", title: "Local Travel Day", description: "Explore local attractions without traveling far.", daily_task: "Stay local for entertainment", estimated_impact: "Save transport emissions", difficulty: "medium", category: "transport" },
  { id: "49-hard", title: "Sustainable Home Overhaul", description: "Make your home completely sustainable.", daily_task: "Plan home upgrades", estimated_impact: "Reduce home emissions long-term", difficulty: "hard", category: "energy" },

  // Day 50
  { id: "50-easy", title: "Cloth Handkerchiefs", description: "Use cloth handkerchiefs instead of tissues.", daily_task: "Use cloth hankies", estimated_impact: "Prevent tissue waste", difficulty: "easy", category: "waste" },
  { id: "50-medium", title: "Bike Commute Week", description: "Commit to biking for one week.", daily_task: "Bike commute all week", estimated_impact: "Save ~15 kg CO₂/week", difficulty: "medium", category: "transport" },
  { id: "50-hard", title: "Closed Loop Living", description: "Create a closed-loop lifestyle system.", daily_task: "Implement circular economy", estimated_impact: "Minimize all waste", difficulty: "hard", category: "lifestyle" },

  // Day 51
  { id: "51-easy", title: "Bamboo Utensils", description: "Switch to bamboo utensils for meals.", daily_task: "Use bamboo instead of plastic", estimated_impact: "Prevent plastic utensils", difficulty: "easy", category: "waste" },
  { id: "51-medium", title: "Community Event", description: "Attend a local sustainability event.", daily_task: "Join sustainability event", estimated_impact: "Learn and connect", difficulty: "medium", category: "lifestyle" },
  { id: "51-hard", title: "Net-Positive Living", description: "Live a net-positive life creating more good than harm.", daily_task: "Create positive impact", estimated_impact: "Regenerate environment", difficulty: "hard", category: "lifestyle" },

  // Day 52
  { id: "52-easy", title: "Reusable Produce Bags", description: "Use cloth bags for produce instead of plastic.", daily_task: "Shop with cloth bags", estimated_impact: "Prevent plastic bag waste", difficulty: "easy", category: "waste" },
  { id: "52-medium", title: "Reflection Day", description: "Reflect on your sustainability progress this month.", daily_task: "Review carbon impact", estimated_impact: "Track improvement", difficulty: "medium", category: "lifestyle" },
  { id: "52-hard", title: "Annual Sustainability Plan", description: "Create a plan for sustainable living this year.", daily_task: "Plan annual goals", estimated_impact: "Create lasting change", difficulty: "hard", category: "lifestyle" },
];

export type ChallengeDaySet = {
  dayNumber: number;
  easy: EcoChallenge;
  medium: EcoChallenge;
  hard: EcoChallenge;
};

export function getChallengeDaySet(date: Date): ChallengeDaySet {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const dayNumber = (dayOfYear % 52) + 1;
  const easyIndex = (dayNumber - 1) * 3;
  const mediumIndex = easyIndex + 1;
  const hardIndex = easyIndex + 2;

  return {
    dayNumber,
    easy: ecoChallenges[easyIndex],
    medium: ecoChallenges[mediumIndex],
    hard: ecoChallenges[hardIndex],
  };
}

export function getChallengesForMonth(year: number, month: number): Map<number, ChallengeDaySet> {
  const challenges = new Map<number, ChallengeDaySet>();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    challenges.set(day, getChallengeDaySet(date));
  }
  
  return challenges;
}

export function getChallengesForWeek(startDate: Date): ChallengeDaySet[] {
  const challenges: ChallengeDaySet[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    challenges.push(getChallengeDaySet(date));
  }
  
  return challenges;
}
