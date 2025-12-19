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
  },
  {
    id: '7',
    name: 'Child Helpline',
    number: '1098',
    type: 'police',
    icon: '👶'
  },
  {
    id: '8',
    name: 'Senior Citizen Helpline',
    number: '1091',
    type: 'police',
    icon: '👴'
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
  },
  {
    keywords: ['medical', 'ambulance', 'hospital', 'चिकित्सा', 'ਡਾਕਟਰ'],
    title: {
      en: 'Medical Emergency',
      hi: 'चिकित्सा आपातकाल',
      pa: 'ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ'
    },
    steps: {
      en: [
        'Check if the person is conscious and breathing',
        'Call emergency medical services immediately',
        'Do not move the person unless in danger',
        'Perform CPR only if trained to do so',
        'Keep the person warm and comfortable'
      ],
      hi: [
        'जांचें कि व्यक्ति होश में है और सांस ले रहा है',
        'तुरंत आपातकालीन चिकित्सा सेवाओं को कॉल करें',
        'खतरे में न होने पर व्यक्ति को न हिलाएं',
        'सीपीआर केवल तभी करें जब प्रशिक्षित हों',
        'व्यक्ति को गर्म और आरामदायक रखें'
      ],
      pa: [
        'ਜਾਂਚ ਕਰੋ ਕਿ ਵਿਅਕਤੀ ਹੋਸ਼ ਵਿੱਚ ਹੈ ਅਤੇ ਸਾਹ ਲੈ ਰਿਹਾ ਹੈ',
        'ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਮੈਡੀਕਲ ਸਰਵਿਸਿਜ਼ ਨੂੰ ਕਾਲ ਕਰੋ',
        'ਖਤਰੇ ਵਿੱਚ ਨਹੀਂ ਹੋਣ ਤੱਕ ਵਿਅਕਤੀ ਨੂੰ ਨਾ ਹਿਲਾਓ',
        'ਸੀਪੀਆਰ ਕੇਵਲ ਤਾਂ ਹੀ ਕਰੋ ਜੇਕਰ ਪ੍ਰਸ਼ਿਕਸ਼ਿਤ ਹੋ',
        'ਵਿਅਕਤੀ ਨੂੰ ਗਰਮ ਅਤੇ ਆਰਾਮਦੇਹ ਰੱਖੋ'
      ]
    }
  }
];