import { useState, useRef, useEffect } from 'react';

// Define the Speech Recognition interfaces
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

// Extend Window interface to include speech recognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// Your existing interfaces
export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: 'police' | 'fire' | 'ambulance' | 'disaster' | 'hospital';
  icon: string;
}

export interface SafetyInstruction {
  keywords: string[];
  title: {
    en: string;
    hi: string;
    pa: string;
  };
  steps: {
    en: string[];
    hi: string[];
    pa: string[];
  };
}

// Your existing data arrays
export const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Police',
    number: '100',
    type: 'police',
    icon: '👮'
  },
  {
    id: '2',
    name: 'Fire Department',
    number: '101',
    type: 'fire',
    icon: '🚒'
  },
  {
    id: '3',
    name: 'Ambulance',
    number: '102',
    type: 'ambulance',
    icon: '🚑'
  },
  {
    id: '4',
    name: 'Disaster Management (NDMA)',
    number: '1078',
    type: 'disaster',
    icon: '🌪️'
  },
  {
    id: '5',
    name: 'Punjab SDMA',
    number: '112',
    type: 'disaster',
    icon: '🆘'
  },
  {
    id: '6',
    name: 'Women Helpline',
    number: '1091',
    type: 'police',
    icon: '👩'
  }
];

export const safetyInstructions: SafetyInstruction[] = [
  {
    keywords: ['earthquake', 'quake', 'भूकंप', 'ਭੂਚਾਲ'],
    title: {
      en: 'Earthquake Safety',
      hi: 'भूकंप सुरक्षा',
      pa: 'ਭੂਚਾਲ ਸੁਰੱਖਿਆ'
    },
    steps: {
      en: [
        'Drop to the ground immediately',
        'Take cover under sturdy furniture',
        'Hold on until shaking stops completely',
        'Stay away from windows and glass',
        'Do not use elevators during earthquake'
      ],
      hi: [
        'तुरंत जमीन पर लेट जाएं',
        'मजबूत फर्नीचर के नीचे छिपें',
        'हिलना बंद होने तक पकड़े रहें',
        'खिड़कियों और कांच से दूर रहें',
        'भूकंप के दौरान लिफ्ट का उपयोग न करें'
      ],
      pa: [
        'ਤੁਰੰਤ ਜ਼ਮੀਨ \'ਤੇ ਲੇਟ ਜਾਓ',
        'ਮਜ਼ਬੂਤ ਫਰਨੀਚਰ ਦੇ ਹੇਠਾਂ ਲੁਕੋ',
        'ਹਿਲਣਾ ਬੰਦ ਹੋਣ ਤੱਕ ਪਕੜੋ',
        'ਖਿੜਕੀਆਂ ਅਤੇ ਕੱਚ ਤੋਂ ਦੂਰ ਰਹੋ',
        'ਭੂਚਾਲ ਦੇ ਦੌਰਾਨ ਲਿਫਟਾਂ ਦੀ ਵਰਤੋਂ ਨਾ ਕਰੋ'
      ]
    }
  },
  {
    keywords: ['fire', 'आग', 'ਅੱਗ'],
    title: {
      en: 'Fire Safety',
      hi: 'आग सुरक्षा',
      pa: 'ਅੱਗ ਸੁਰੱਖਿਆ'
    },
    steps: {
      en: [
        'Alert everyone and evacuate immediately',
        'Crawl low under smoke to avoid inhalation',
        'Feel doors before opening - if hot, use another exit',
        'Use fire extinguisher only if trained properly',
        'Call emergency services from safe location'
      ],
      hi: [
        'सभी को सचेत करें और तुरंत खाली करें',
        'धुएं के नीचे रेंगें ताकि सांस न लें',
        'दरवाजे खोलने से पहले गर्मी महसूस करें',
        'यदि प्रशिक्षित हैं तो अग्निशामक का उपयोग करें',
        'सुरक्षित स्थान से आपातकालीन सेवाओं को कॉल करें'
      ],
      pa: [
        'ਸਭ ਨੂੰ ਸਚੇਤ ਕਰੋ ਅਤੇ ਤੁਰੰਤ ਖਾਲੀ ਕਰੋ',
        'ਸਾਹ ਲੈਣ ਤੋਂ ਬਚਣ ਲਈ ਧੂੰਏਂ ਦੇ ਹੇਠਾਂ ਰੀਂਗੋ',
        'ਖੋਲ੍ਹਣ ਤੋਂ ਪਹਿਲਾਂ ਦਰਵਾਜ਼ੇ ਨੂੰ ਮਹਿਸੂਸ ਕਰੋ',
        'ਜੇ ਪ੍ਰਸ਼ਿਕਸ਼ਿਤ ਹੋ ਤਾਂ ਅੱਗ ਬੁਝਾਉਣ ਵਾਲੇ ਦੀ ਵਰਤੋਂ ਕਰੋ',
        'ਸੁਰੱਖਿਅਤ ਟਿਕਾਣੇ ਤੋਂ ਐਮਰਜੈਂਸੀ ਸਰਵਿਸਿਜ਼ ਨੂੰ ਕਾਲ ਕਰੋ'
      ]
    }
  },
  {
    keywords: ['flood', 'बाढ़', 'ਹੜ੍ਹ', 'flooding'],
    title: {
      en: 'Flood Safety',
      hi: 'बाढ़ सुरक्षा',
      pa: 'ਹੜ੍ਹ ਸੁਰੱਖਿਆ'
    },
    steps: {
      en: [
        'Move to higher ground immediately',
        'Avoid walking through moving water currents',
        'Do not drive vehicles in flooded areas',
        'Turn off electricity at main switch',
        'Listen to emergency broadcasts for updates'
      ],
      hi: [
        'तुरंत ऊंची जमीन पर जाएं',
        'बहते पानी की धाराओं में चलने से बचें',
        'बाढ़ग्रस्त क्षेत्रों में वाहन न चलाएं',
        'मुख्य स्विच पर बिजली बंद करें',
        'अपडेट के लिए आपातकालीन प्रसारण सुनें'
      ],
      pa: [
        'ਤੁਰੰਤ ਉੱਚੀ ਜ਼ਮੀਨ \'ਤੇ ਜਾਓ',
        'ਚਲਦੇ ਪਾਣੀ ਦੀਆਂ ਧਾਰਾਵਾਂ ਵਿੱਚ ਚਲਣ ਤੋਂ ਬਚੋ',
        'ਬਾਹੜ੍ਹ ਵਾਲੇ ਖੇਤਰਾਂ ਵਿੱਚ ਵਾਹਨ ਨਾ ਚਲਾਓ',
        'ਮੁੱਖ ਸਵਿੱਚ \'ਤੇ ਬਿਜਲੀ ਬੰਦ ਕਰੋ',
        'ਅੱਪਡੇਟਾਂ ਲਈ ਐਮਰਜੈਂਸੀ ਪ੍ਰਸਾਰਣ ਸੁਣੋ'
      ]
    }
  },
  {
    keywords: ['chemical', 'leak', 'रासायनिक', 'ਰਸਾਇਣਕ', 'gas'],
    title: {
      en: 'Chemical Leak Safety',
      hi: 'रासायनिक रिसाव सुरक्षा',
      pa: 'ਰਸਾਇਣਕ ਲੀਕ ਸੁਰੱਖਿਆ'
    },
    steps: {
      en: [
        'Evacuate immediately upwind of the leak',
        'Cover mouth and nose with damp cloth',
        'Avoid any contact with chemical substance',
        'Do not eat or drink potentially contaminated items',
        'Seek medical attention immediately if exposed'
      ],
      hi: [
        'रिसाव की हवा की दिशा में तुरंत खाली करें',
        'गीले कपड़े से मुंह और नाक ढकें',
        'रासायनिक पदार्थ के किसी भी संपर्क से बचें',
        'संभावित दूषित वस्तुओं को न खाएं या पिएं',
        'यदि उजागर हुए हैं तो तुरंत चिकित्सा सहायता लें'
      ],
      pa: [
        'ਲੀਕ ਦੀ ਹਵਾ ਦੀ ਦਿਸ਼ਾ ਵਿੱਚ ਤੁਰੰਤ ਖਾਲੀ ਕਰੋ',
        'ਗਿੱਲੇ ਕੱਪੜੇ ਨਾਲ ਮੂੰਹ ਅਤੇ ਨੱਕ ਢੱਕੋ',
        'ਰਸਾਇਣਕ ਪਦਾਰਥ ਨਾਲ ਕਿਸੇ ਵੀ ਸੰਪਰਕ ਤੋਂ ਬਚੋ',
        'ਸੰਭਾਵਿਤ ਤੌਰ \'ਤੇ ਦੂਸ਼ਿਤ ਚੀਜ਼ਾਂ ਨਾ ਖਾਓ ਜਾਂ ਪੀਓ',
        'ਜੇਕਰ ਐਕਸਪੋਜ਼ ਹੋਵੋ ਤਾਂ ਤੁਰੰਤ ਮੈਡੀਕਲ ਸਹਾਇਤਾ ਲਓ'
      ]
    }
  }
];

// Now define the hook with proper typing
export const useEmergencyTools = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [matchedInstruction, setMatchedInstruction] = useState<SafetyInstruction | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi' | 'pa'>('en');
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [isSirenOn, setIsSirenOn] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const flashlightIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sirenIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to get language code
  const getLanguageCode = (lang: 'en' | 'hi' | 'pa'): string => {
    switch (lang) {
      case 'en': return 'en-IN';
      case 'hi': return 'hi-IN';
      case 'pa': return 'pa-IN';
      default: return 'en-IN';
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionClass) {
        recognitionRef.current = new SpeechRecognitionClass();
        
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = getLanguageCode(language);
        
        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          setRecognizedText(transcript);
          matchEmergencyInstruction(transcript);
        };
        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      stopSiren();
      stopFlashlight();
    };
  }, [language]);

  const matchEmergencyInstruction = (text: string) => {
    for (const instruction of safetyInstructions) {
      if (instruction.keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
        setMatchedInstruction(instruction);
        speakInstruction(instruction);
        return;
      }
    }
    setMatchedInstruction(null);
  };

  const speakInstruction = (instruction: SafetyInstruction) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      const stepsText = instruction.steps[language].join('. ');
      utterance.text = `${instruction.title[language]}. ${stepsText}`;
      utterance.lang = getLanguageCode(language);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setRecognizedText('');
      setMatchedInstruction(null);
      try {
        recognitionRef.current.lang = getLanguageCode(language);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Speech recognition start error:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleFlashlight = () => {
    if (isFlashlightOn) {
      stopFlashlight();
    } else {
      startFlashlight();
    }
  };

  const startFlashlight = () => {
    setIsFlashlightOn(true);
    document.body.classList.add('flashlight-active');
    
    flashlightIntervalRef.current = setInterval(() => {
      document.body.classList.toggle('flashlight-active');
    }, 300);
  };

  const stopFlashlight = () => {
    setIsFlashlightOn(false);
    if (flashlightIntervalRef.current) {
      clearInterval(flashlightIntervalRef.current);
      flashlightIntervalRef.current = null;
    }
    document.body.classList.remove('flashlight-active');
  };

  const toggleSiren = () => {
    if (isSirenOn) {
      stopSiren();
    } else {
      startSiren();
    }
  };

  const startSiren = () => {
    setIsSirenOn(true);
    // Create visual siren effect
    sirenIntervalRef.current = setInterval(() => {
      const currentColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = currentColor === 'red' ? 'transparent' : 'red';
    }, 500);
  };

  const stopSiren = () => {
    setIsSirenOn(false);
    if (sirenIntervalRef.current) {
      clearInterval(sirenIntervalRef.current);
      sirenIntervalRef.current = null;
    }
    document.body.style.backgroundColor = '';
  };

  const callNumber = (number: string) => {
    // Use window.location for tel links
    window.location.href = `tel:${number}`;
  };

  const triggerEmergencySOS = () => {
    callNumber('112');
    if (!isSirenOn) startSiren();
    if (!isFlashlightOn) startFlashlight();
  };

  // Add these functions to your existing hook return statement
return {
  isListening,
  recognizedText,
  matchedInstruction,
  language,
  setLanguage,
  isFlashlightOn,
  isSirenOn,
  showContacts,
  setShowContacts,
  showVoiceAssistant,
  setShowVoiceAssistant,
  startListening,
  stopListening,
  toggleFlashlight,
  toggleSiren,
  stopFlashlight, // Add this
  stopSiren, // Add this
  callNumber,
  triggerEmergencySOS,
  emergencyContacts,
  safetyInstructions
};
};