export const QUESTIONS = [
  // Earthquake Preparedness (1-5)
  {
    id: 1,
    text: "What is the safest thing to do indoors as soon as an earthquake starts?",
    options: [
      { text: "Drop, Cover, and Hold On", correct: true, nextQuestion: 2 },
      { text: "Run outside", correct: false, nextQuestion: 2 },
      { text: "Use the elevator", correct: false, nextQuestion: 2 },
      { text: "Stand by the window", correct: false, nextQuestion: 2 }
    ],
    character: "🏠",
    background: "q1"  },
  {
    id: 2,
    text: "How can you prepare your home to reduce risk of falling objects during an earthquake?",
    options: [
      { text: "Bolt heavy furniture to walls", correct: true, nextQuestion: 3 },
      { text: "Place items high up", correct: false, nextQuestion: 3 },
      { text: "Leave doors open", correct: false, nextQuestion: 3 },
      { text: "Hide under glass tables", correct: false, nextQuestion: 3 }
    ],
    character: "🪜",
    background: "q2"
  },
  {
    id: 3,
    text: "Which item is essential in an earthquake emergency kit?",
    options: [
      { text: "Torch and canned food", correct: true, nextQuestion: 4 },
      { text: "A bucket of ice", correct: false, nextQuestion: 4 },
      { text: "Speakers", correct: false, nextQuestion: 4 },
      { text: "Paint brushes", correct: false, nextQuestion: 4 }
    ],
    character: "🎒",
    background: "q3"
  },
  {
    id: 4,
    text: "After shaking stops, what is the best action before leaving the building?",
    options: [
      { text: "Check for hazards like fire or gas leaks", correct: true, nextQuestion: 5 },
      { text: "Run outside immediately", correct: false, nextQuestion: 5 },
      { text: "Jump on furniture", correct: false, nextQuestion: 5 },
      { text: "Turn on all lights", correct: false, nextQuestion: 5 }
    ],
    character: "🛑",
    background: "q4"
  },
  {
    id: 5,
    text: "How can you stay informed during a disaster?",
    options: [
      { text: "Listen to battery-powered radio for updates", correct: true, nextQuestion: 6 },
      { text: "Ignore news and alerts", correct: false, nextQuestion: 6 },
      { text: "Call everyone", correct: false, nextQuestion: 6 },
      { text: "Go outside to ask neighbors", correct: false, nextQuestion: 6 }
    ],
    character: "📻",
    background: "q5"
  },

  // Flood Preparedness (6-10)
  {
    id: 6,
    text: "What should you do before a flood if you live in a flood-prone area?",
    options: [
      { text: "Prepare an emergency kit and move valuables to higher ground", correct: true, nextQuestion: 7 },
      { text: "Leave windows open", correct: false, nextQuestion: 7 },
      { text: "Park your car at the riverbank", correct: false, nextQuestion: 7 },
      { text: "Fill bathtub with sand", correct: false, nextQuestion: 7 }
    ],
    character: "📦",
    background: "q6"
  },
  {
    id: 7,
    text: "What is the safest response if you receive a flood evacuation order?",
    options: [
      { text: "Leave immediately and follow evacuation routes", correct: true, nextQuestion: 8 },
      { text: "Hide in your basement", correct: false, nextQuestion: 8 },
      { text: "Ignore the order", correct: false, nextQuestion: 8 },
      { text: "Open all doors and windows", correct: false, nextQuestion: 8 }
    ],
    character: "🚶‍♂️",
    background: "q7"
  },
  {
    id: 8,
    text: "During a flood warning, what should you avoid?",
    options: [
      { text: "Driving through flooded areas", correct: true, nextQuestion: 9 },
      { text: "Walking on high ground", correct: false, nextQuestion: 9 },
      { text: "Using social media", correct: false, nextQuestion: 9 },
      { text: "Turning off power", correct: false, nextQuestion: 9 }
    ],
    character: "🚗",
    background: "q8"
  },
  {
    id: 9,
    text: "What is a good practice for flood safety?",
    options: [
      { text: "Keep a well-stocked emergency kit", correct: true, nextQuestion: 10 },
      { text: "Leave emergency kit at neighbor’s house", correct: false, nextQuestion: 10 },
      { text: "Store documents in the basement", correct: false, nextQuestion: 10 },
      { text: "Sleep with windows open", correct: false, nextQuestion: 10 }
    ],
    character: "🧰",
    background: "q9"
  },
  {
    id: 10,
    text: "Where should you seek shelter during a flood emergency?",
    options: [
      { text: "Designated shelters or high ground", correct: true, nextQuestion: 11 },
      { text: "Underground parking garage", correct: false, nextQuestion: 11 },
      { text: "River bank", correct: false, nextQuestion: 11 },
      { text: "First floor", correct: false, nextQuestion: 11 }
    ],
    character: "🏫",
    background: "q10"
  },
  
  // Factory Gas Leak Preparedness (11-15)
  {
    id: 11,
    text: "If you smell gas in a factory, what is the first action?",
    options: [
      { text: "Alert others and evacuate immediately", correct: true, nextQuestion: 12 },
      { text: "Light a match to find the leak", correct: false, nextQuestion: 12 },
      { text: "Keep working", correct: false, nextQuestion: 12 },
      { text: "Run towards the source of leak", correct: false, nextQuestion: 12 }
    ],
    character: "🚨",
    background: "q11"
  },
  {
    id: 12,
    text: "Why should you cover your mouth and nose in a suspected gas leak?",
    options: [
      { text: "To reduce chance of inhaling toxic fumes", correct: true, nextQuestion: 13 },
      { text: "For comfort", correct: false, nextQuestion: 13 },
      { text: "As a fashion choice", correct: false, nextQuestion: 13 },
      { text: "To avoid bad smell", correct: false, nextQuestion: 13 }
    ],
    character: "😷",
    background: "q12"
  },
  {
    id: 13,
    text: "In case of a gas alarm in a factory, what should workers do?",
    options: [
      { text: "Evacuate using emergency exits calmly", correct: true, nextQuestion: 14 },
      { text: "Run to the rooftop", correct: false, nextQuestion: 14 },
      { text: "Hide behind machinery", correct: false, nextQuestion: 14 },
      { text: "Lock themselves inside offices", correct: false, nextQuestion: 14 }
    ],
    character: "🏃‍♀️",
    background: "q13"
  },
  {
    id: 14,
    text: "What is a vital part of gas leak preparedness in plants?",
    options: [
      { text: "Regular emergency drills", correct: true, nextQuestion: 15 },
      { text: "Ignoring alarms", correct: false, nextQuestion: 15 },
      { text: "Leaving exits blocked", correct: false, nextQuestion: 15 },
      { text: "Turning off fire alarms", correct: false, nextQuestion: 15 }
    ],
    character: "🔔",
    background: "q14"
  },
  {
    id: 15,
    text: "How can you help during a gas leak evacuation?",
    options: [
      { text: "Assist others and follow safety routes", correct: true, nextQuestion: 16 },
      { text: "Take photos and post online", correct: false, nextQuestion: 16 },
      { text: "Push past others to leave first", correct: false, nextQuestion: 16 },
      { text: "Go back for belongings", correct: false, nextQuestion: 16 }
    ],
    character: "👐",
    background: "q15"
  },

  // Fire Preparedness (16-20)
  {
    id: 16,
    text: "What should you do FIRST when discovering a fire indoors?",
    options: [
      { text: "Raise the alarm and evacuate calmly", correct: true, nextQuestion: 17 },
      { text: "Collect valuables before leaving", correct: false, nextQuestion: 17 },
      { text: "Open windows to vent smoke", correct: false, nextQuestion: 17 },
      { text: "Use the lift to exit", correct: false, nextQuestion: 17 }
    ],
    character: "🔥",
    background: "q16"
  },
  {
    id: 17,
    text: "How can you reduce fire risk at home?",
    options: [
      { text: "Install smoke detectors and check wiring", correct: true, nextQuestion: 18 },
      { text: "Keep flammable objects near heat", correct: false, nextQuestion: 18 },
      { text: "Leave candles burning overnight", correct: false, nextQuestion: 18 },
      { text: "Store gasoline indoors", correct: false, nextQuestion: 18 }
    ],
    character: "💡",
    background: "q17"
  },
  {
    id: 18,
    text: "For escaping a smoky fire, how should you move?",
    options: [
      { text: "Stay low to the ground", correct: true, nextQuestion: 19 },
      { text: "Run upright", correct: false, nextQuestion: 19 },
      { text: "Climb onto counters", correct: false, nextQuestion: 19 },
      { text: "Hide in closets", correct: false, nextQuestion: 19 }
    ],
    character: "🐾",
    background: "q18"
  },
  {
    id: 19,
    text: "What is important to do during a fire drill?",
    options: [
      { text: "Follow instructions to designated safe area", correct: true, nextQuestion: 20 },
      { text: "Ignore alarms and continue working", correct: false, nextQuestion: 20 },
      { text: "Go to the roof", correct: false, nextQuestion: 20 },
      { text: "Run in all directions", correct: false, nextQuestion: 20 }
    ],
    character: "📢",
    background: "q19"
  },
  {
    id: 20,
    text: "What should you NEVER use during building fire evacuation?",
    options: [
      { text: "The elevator", correct: true, nextQuestion: 21 },
      { text: "The stairs", correct: false, nextQuestion: 21 },
      { text: "Marked exits", correct: false, nextQuestion: 21 },
      { text: "Fire extinguisher", correct: false, nextQuestion: 21 }
    ],
    character: "🛗",
    background: "q20"
  },
//pqndemic
    {
    id: 21,
    text: "How should you prepare your home for a pandemic emergency?",
    options: [
      { text: "Stock up on water, non-perishable food, masks, and sanitizer", correct: true, nextQuestion: 22 },
      { text: "Buy only fresh food daily", correct: false, nextQuestion: 22 },
      { text: "Prepare party supplies", correct: false, nextQuestion: 22 },
      { text: "Ignore and wait for supply deliveries", correct: false, nextQuestion: 22 }
    ],
    character: "😷",
    background: "q21"
  },
  {
    id: 22,
    text: "Which is an essential part of family pandemic planning?",
    options: [
      { text: "Create an emergency contact and communication plan", correct: true, nextQuestion: 23 },
      { text: "Avoid phone or internet communication", correct: false, nextQuestion: 23 },
      { text: "Forget about emergency contacts", correct: false, nextQuestion: 23 },
      { text: "Communicate only in person", correct: false, nextQuestion: 23 }
    ],
    character: "📞",
    background: "q22"
  },
  {
    id: 23,
    text: "How can you best reduce infection risk on surfaces during a pandemic?",
    options: [
      { text: "Regularly clean and disinfect frequently touched surfaces", correct: true, nextQuestion: 24 },
      { text: "Never clean surfaces", correct: false, nextQuestion: 24 },
      { text: "Share towels and cloths freely", correct: false, nextQuestion: 24 },
      { text: "Ignore hygiene", correct: false, nextQuestion: 24 }
    ],
    character: "🧴",
    background: "q23"
  },
  {
    id: 24,
    text: "What is the best way to handle a sick household member during a pandemic?",
    options: [
      { text: "Isolate the sick person and follow medical advice", correct: true, nextQuestion: 25 },
      { text: "Host social gatherings together", correct: false, nextQuestion: 25 },
      { text: "Ignore symptoms and continue normally", correct: false, nextQuestion: 25 },
      { text: "Share the same bedroom without precautions", correct: false, nextQuestion: 25 }
    ],
    character: "🏠",
    background: "q24"
  },
  {
    id: 25,
    text: "How can you stay informed during a pandemic?",
    options: [
      { text: "Follow official health authorities and local government updates", correct: true, nextQuestion: 26 },
      { text: "Rely on rumors and social media only", correct: false, nextQuestion: 26 },
      { text: "Ignore news updates", correct: false, nextQuestion: 26 },
      { text: "Avoid information from trusted sources", correct: false, nextQuestion: 26 }
    ],
    character: "📲",
    background: "q25"
  },

  // Closing Prompt (26)
  {
    id: 26,
    text: "Great job completing the disaster preparedness quiz! Would you like to play again or choose another challenge?",
    options: [
      { text: "Play again", correct: true, nextQuestion: 1 },
      { text: "Exit", correct: false, nextQuestion: -1 },
      { text: "Review answers", correct: false, nextQuestion: -1 },
      { text: "Share with friends", correct: false, nextQuestion: -1 }
    ],
    character: "🎉",
    background: "q26"
  }
];
