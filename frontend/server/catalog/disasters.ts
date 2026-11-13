// src/modules/data/disasters.ts

export type Language = "en" | "hi" | "pa";

export interface QuizQuestion {
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  answerIndex: number;
}

export interface DisasterModule {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>; // For card (2-line Punjab specific)
  content: Record<Language, string>;     // Book content rules
  image: string;
  quiz: QuizQuestion[];
}

export const disasters: DisasterModule[] = [
  // ... your existing modules here (flood, earthquake, fire, etc.)

  // Landslide Module


  {
    id: 1,
    title: { en: "Flood Preparedness", hi: "बाढ़ से तैयारी", pa: "ਬਾੜ ਦੀ ਤਿਆਰੀ" },
    description: {
      en: "Floods often affect Punjab during monsoon due to overflowing rivers and poor drainage.",
      hi: "पंजाब में मानसून के दौरान नदियों और निकासी की समस्या से बाढ़ आती है।",
      pa: "ਪੰਜਾਬ ਵਿੱਚ ਮਾਨਸੂਨ ਦੌਰਾਨ ਦਰਿਆ ਭਰਨ ਅਤੇ ਖਰਾਬ ਨਿਕਾਸੀ ਕਾਰਨ ਬਾੜ ਆਉਂਦੀ ਹੈ।",
    },
  content: {
  en: `Flood Safety Guidelines:

1. Stay Informed
- Listen to flood alerts on TV, radio, or mobile apps.
- Follow instructions from local authorities.

2. Prepare an Emergency Kit
- Keep food, drinking water, and medicines for at least 3 days.
- Pack important documents (ID, insurance, medical records) in a waterproof bag.
- Include flashlights, batteries, clothes, and basic hygiene items.

3. Evacuation Safety
- Move to higher ground or designated shelters immediately.
- Avoid walking or driving through floodwaters.
- Never underestimate water depth; even shallow water can be dangerous.

4. Electrical and Gas Safety
- Switch off electricity, gas, and appliances before leaving home.
- Do not touch electrical equipment if you are wet or standing in water.

5. Help Others
- Assist elders, children, and pets in evacuating safely.
- Keep in touch with neighbors and check on vulnerable individuals.

6. After the Flood
- Avoid returning home until authorities declare it safe.
- Clean and disinfect everything touched by floodwater.
- Watch out for snakes, insects, and unstable structures.

Remember: Stay calm, stay informed, and always prioritize safety.`,

  hi: `बाढ़ सुरक्षा दिशानिर्देश:

1. सूचना में रहें
- टीवी, रेडियो या मोबाइल ऐप पर बाढ़ चेतावनियाँ सुनें।
- स्थानीय अधिकारियों के निर्देशों का पालन करें।

2. आपातकालीन किट तैयार करें
- कम से कम 3 दिनों का भोजन, पीने का पानी और दवाइयाँ रखें।
- महत्वपूर्ण दस्तावेज़ (पहचान पत्र, बीमा, मेडिकल रिकॉर्ड) जलरोधी बैग में रखें।
- टॉर्च, बैटरी, कपड़े और बेसिक स्वच्छता सामग्री शामिल करें।

3. सुरक्षित निकासी
- तुरंत ऊँचे स्थान या निर्धारित शरण स्थलों पर जाएँ।
- बाढ़ के पानी में न चलें और न गाड़ी चलाएँ।
- पानी की गहराई को कम न आँकें; कम गहराई भी खतरनाक हो सकती है।

4. बिजली और गैस सुरक्षा
- घर छोड़ने से पहले बिजली, गैस और उपकरण बंद करें।
- अगर आप गीले हैं या पानी में खड़े हैं तो विद्युत उपकरण को न छुएँ।

5. दूसरों की मदद करें
- बुजुर्गों, बच्चों और पालतू जानवरों को सुरक्षित निकालने में मदद करें।
- पड़ोसियों से संपर्क बनाए रखें और कमजोर व्यक्तियों की देखभाल करें।

6. बाढ़ के बाद
- अधिकारियों के सुरक्षित कहने तक घर वापस न लौटें।
- बाढ़ के पानी से छूए गए हर चीज़ को साफ और कीटाणुरहित करें।
- सांप, कीड़े और अस्थिर संरचनाओं से सावधान रहें।

याद रखें: शांत रहें, सूचित रहें और हमेशा सुरक्षा को प्राथमिकता दें।`,

  pa: `ਬਾੜ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਜਾਣਕਾਰੀ ਵਿੱਚ ਰਹੋ
- ਟੀਵੀ, ਰੇਡੀਓ ਜਾਂ ਮੋਬਾਈਲ ਐਪ ਤੇ ਬਾੜ ਚੇਤਾਵਨੀ ਸੁਣੋ।
- ਸਥਾਨਕ ਅਧਿਕਾਰੀਆਂ ਦੇ ਹੁਕਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।

2. ਇਮਰਜੈਂਸੀ ਕਿੱਟ ਤਿਆਰ ਕਰੋ
- ਘੱਟੋ-ਘੱਟ 3 ਦਿਨਾਂ ਲਈ ਖਾਣਾ, ਪੀਣ ਦਾ ਪਾਣੀ ਅਤੇ ਦਵਾਈਆਂ ਰੱਖੋ।
- ਮਹੱਤਵਪੂਰਨ ਦਸਤਾਵੇਜ਼ (ID, ਬੀਮਾ, ਮੈਡੀਕਲ ਰਿਕਾਰਡ) ਵਾਟਰਪ੍ਰੂਫ ਬੈਗ ਵਿੱਚ ਰੱਖੋ।
- ਟਾਰਚ, ਬੈਟਰੀਆਂ, ਕੱਪੜੇ ਅਤੇ ਸਫਾਈ ਦੇ ਆਈਟਮ ਸ਼ਾਮਲ ਕਰੋ।

3. ਸੁਰੱਖਿਅਤ ਨਿਕਾਸੀ
- ਤੁਰੰਤ ਉੱਚੀ ਜਗ੍ਹਾ ਜਾਂ ਨਿਰਧਾਰਿਤ ਸ਼ੈਲਟਰਾਂ ਤੇ ਜਾਓ।
- ਬਾੜ ਦੇ ਪਾਣੀ ਵਿੱਚ ਨਾ ਤੁਰੋ ਤੇ ਨਾ ਗੱਡੀ ਚਲਾਓ।
- ਪਾਣੀ ਦੀ ਗਹਿਰਾਈ ਨੂੰ ਘੱਟ ਨਾ ਆਕਲੋ; ਥੋੜ੍ਹਾ ਵੀ ਖਤਰਨਾਕ ਹੋ ਸਕਦਾ ਹੈ।

4. ਬਿਜਲੀ ਅਤੇ ਗੈਸ ਸੁਰੱਖਿਆ
- ਘਰ ਛੱਡਣ ਤੋਂ ਪਹਿਲਾਂ ਬਿਜਲੀ, ਗੈਸ ਅਤੇ ਸਾਮਾਨ ਬੰਦ ਕਰੋ।
- ਜੇ ਤੁਸੀਂ ਗੀਲੇ ਹੋ ਜਾਂ ਪਾਣੀ ਵਿੱਚ ਖੜੇ ਹੋ ਤਾਂ ਬਿਜਲੀ ਦੇ ਉਪਕਰਨ ਨੂੰ ਨਾ ਛੂਹੋ।

5. ਦੂਜਿਆਂ ਦੀ ਮਦਦ ਕਰੋ
- ਬਜ਼ੁਰਗਾਂ, ਬੱਚਿਆਂ ਅਤੇ ਪਾਲਤੂ ਜਾਨਵਰਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਬਾਹਰ ਕੱਢਣ ਵਿੱਚ ਮਦਦ ਕਰੋ।
- ਪੜੋਸੀਆਂ ਨਾਲ ਸੰਪਰਕ ਵਿੱਚ ਰਹੋ ਅਤੇ ਜੋ ਕਮਜ਼ੋਰ ਹਨ ਉਹਨਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।

6. ਬਾੜ ਦੇ ਬਾਅਦ
- ਅਧਿਕਾਰੀਆਂ ਦੇ ਸੁਰੱਖਿਅਤ ਕਹਿਣ ਤੱਕ ਘਰ ਵਾਪਸ ਨਾ ਜਾਓ।
- ਬਾੜ ਦੇ ਪਾਣੀ ਨਾਲ ਛੂਹੀਆਂ ਸਾਰੀਆਂ ਚੀਜ਼ਾਂ ਨੂੰ ਸਾਫ਼ ਅਤੇ ਕੀਟਾਣੁਮੁਕਤ ਕਰੋ।
- ਸੱਪ, ਕੀੜੇ ਅਤੇ ਅਸਥਿਰ ਢਾਂਚਿਆਂ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ।

ਯਾਦ ਰੱਖੋ: ਸ਼ਾਂਤ ਰਹੋ, ਜਾਣਕਾਰੀ ਵਿੱਚ ਰਹੋ ਅਤੇ ਹਮੇਸ਼ਾ ਸੁਰੱਖਿਆ ਪਹਿਲਾਂ।`,
},


    image: "/images/flood.jpg",
    quiz: [
      {
        question: {
          en: "If floodwater rises in your street, what should you do first?",
          hi: "अगर आपके इलाके में बाढ़ का पानी बढ़ जाए तो सबसे पहले क्या करेंगे?",
          pa: "ਜੇ ਤੁਹਾਡੇ ਇਲਾਕੇ ਵਿੱਚ ਬਾੜ ਦਾ ਪਾਣੀ ਵਧੇ ਤਾਂ ਪਹਿਲਾਂ ਕੀ ਕਰੋਗੇ?",
        },
        options: {
          en: ["Walk through it", "Climb to higher ground", "Stay indoors", "Call a friend"],
          hi: ["पानी में चलना", "ऊँचे स्थान पर जाना", "घर में रहना", "दोस्त को कॉल करना"],
          pa: ["ਪਾਣੀ ਵਿੱਚ ਤੁਰਨਾ", "ਉੱਚੀ ਥਾਂ ਤੇ ਜਾਣਾ", "ਘਰ ਵਿੱਚ ਰਹਿਣਾ", "ਦੋਸਤ ਨੂੰ ਕਾਲ ਕਰਨਾ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Why should electricity be switched off during floods?",
          hi: "बाढ़ के समय बिजली क्यों बंद करनी चाहिए?",
          pa: "ਬਾੜ ਦੇ ਸਮੇਂ ਬਿਜਲੀ ਕਿਉਂ ਬੰਦ ਕਰਨੀ ਚਾਹੀਦੀ ਹੈ?",
        },
        options: {
          en: ["To save money", "To avoid electric shocks", "To save battery", "For fun"],
          hi: ["पैसे बचाने के लिए", "करंट से बचने के लिए", "बैटरी बचाने के लिए", "मज़े के लिए"],
          pa: ["ਪੈਸੇ ਬਚਾਉਣ ਲਈ", "ਕਰੰਟ ਤੋਂ ਬਚਣ ਲਈ", "ਬੈਟਰੀ ਬਚਾਉਣ ਲਈ", "ਮਜ਼ੇ ਲਈ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Which item is most important in a flood emergency kit?",
          hi: "बाढ़ आपातकालीन किट में सबसे जरूरी वस्तु कौन सी है?",
          pa: "ਬਾੜ ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਵਿੱਚ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਚੀਜ਼ ਕਿਹੜੀ ਹੈ?",
        },
        options: {
          en: ["Games", "Medicines", "TV Remote", "Paint"],
          hi: ["खेल", "दवाइयाँ", "टीवी रिमोट", "पेंट"],
          pa: ["ਖੇਡਾਂ", "ਦਵਾਈਆਂ", "ਟੀਵੀ ਰਿਮੋਟ", "ਪੇਂਟ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "What should you avoid during floods?",
          hi: "बाढ़ के दौरान किससे बचना चाहिए?",
          pa: "ਬਾੜ ਦੇ ਦੌਰਾਨ ਕਿਸ ਤੋਂ ਬਚਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Driving in water", "Helping others", "Listening to news", "Storing food"],
          hi: ["पानी में गाड़ी चलाना", "दूसरों की मदद करना", "समाचार सुनना", "भोजन संग्रह करना"],
          pa: ["ਪਾਣੀ ਵਿੱਚ ਗੱਡੀ ਚਲਾਉਣਾ", "ਹੋਰਾਂ ਦੀ ਮਦਦ ਕਰਨਾ", "ਖਬਰਾਂ ਸੁਣਨਾ", "ਭੋਜਨ ਇਕੱਠਾ ਕਰਨਾ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "If trapped in a flooded house, what’s your first step?",
          hi: "अगर आप बाढ़ग्रस्त घर में फंस जाएं तो पहला कदम क्या होगा?",
          pa: "ਜੇ ਤੁਸੀਂ ਬਾੜ ਵਾਲੇ ਘਰ ਵਿੱਚ ਫਸ ਜਾਓ ਤਾਂ ਪਹਿਲਾ ਕਦਮ ਕੀ ਹੋਵੇਗਾ?",
        },
        options: {
          en: ["Climb to roof", "Call for help", "Swim in water", "Ignore it"],
          hi: ["छत पर चढ़ना", "मदद बुलाना", "पानी में तैरना", "नज़रअंदाज़ करना"],
          pa: ["ਛੱਤ ਤੇ ਚੜ੍ਹਣਾ", "ਮਦਦ ਬੁਲਾਣਾ", "ਪਾਣੀ ਵਿੱਚ ਤੈਰਨਾ", "ਅਣਡਿੱਠਾ ਕਰਨਾ"],
        },
        answerIndex: 0,
      },
    ],
  },

  // ⚡ Earthquake
  {
    id: 2,
    title: { en: "Earthquake Safety", hi: "भूकंप सुरक्षा", pa: "ਭੂਚਾਲ ਸੁਰੱਖਿਆ" },
    description: {
      en: "Mild tremors are felt in Punjab from Himalayan activity. Preparedness reduces panic.",
      hi: "हिमालयी गतिविधियों से पंजाब में हल्के झटके आते हैं। तैयारी से घबराहट कम होती है।",
      pa: "ਹਿਮਾਲਿਆਈ ਗਤੀਵਿਧੀਆਂ ਨਾਲ ਪੰਜਾਬ ਵਿੱਚ ਹਲਕੇ ਝਟਕੇ ਆਉਂਦੇ ਹਨ। ਤਿਆਰੀ ਨਾਲ ਘਬਰਾਹਟ ਘਟਦੀ ਹੈ।",
    },
   content: {
  en: `Earthquake Safety Guidelines:

1. Drop, Cover, and Hold
- During tremors, drop to the ground, take cover under sturdy furniture, and hold on.
- Stay calm and protect your head and neck.

2. Stay Away from Hazards
- Keep away from windows, mirrors, and heavy objects that could fall.
- Avoid hanging pictures, shelves, or large furniture that can topple.

3. Avoid Elevators
- Never use elevators during an earthquake. Use stairs if evacuation is necessary.

4. Evacuate Safely
- Once shaking stops, move to open ground away from buildings, trees, and power lines.
- Follow local authorities' instructions for safe zones or shelters.

5. Prepare for Aftershocks
- Expect smaller tremors after the main earthquake.
- Stay alert and ready to drop, cover, and hold again if needed.

Remember: Stay calm, stay alert, and always prioritize your safety.`,

  hi: `भूकंप सुरक्षा दिशानिर्देश:

1. झुकें, छिपें और पकड़ें
- झटके के दौरान जमीन पर झुकें, मजबूत फर्नीचर के नीचे छिपें और पकड़कर रहें।
- शांत रहें और सिर और गर्दन को सुरक्षित रखें।

2. खतरों से दूर रहें
- खिड़कियों, शीशों और भारी वस्तुओं से दूर रहें जो गिर सकती हैं।
- फर्श पर लटकाई तस्वीरें, शेल्फ़ या बड़े फर्नीचर से सावधान रहें।

3. लिफ्ट का प्रयोग न करें
- भूकंप के दौरान लिफ्ट का प्रयोग कभी न करें।
- यदि निकासी जरूरी हो तो सीढ़ियों का इस्तेमाल करें।

4. सुरक्षित निकासी
- झटके रुकने के बाद खुले मैदान में जाएँ, भवनों, पेड़ों और बिजली के खंभों से दूर रहें।
- सुरक्षित स्थानों या शेल्टरों के लिए स्थानीय अधिकारियों के निर्देशों का पालन करें।

5. आफ्टरशॉक्स के लिए तैयार रहें
- मुख्य भूकंप के बाद छोटे झटके अपेक्षित हैं।
- सतर्क रहें और आवश्यकता पड़ने पर फिर से झुकें, छिपें और पकड़ें।

याद रखें: शांत रहें, सतर्क रहें और हमेशा अपनी सुरक्षा को प्राथमिकता दें।`,

  pa: `ਭੂਚਾਲ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਝੁਕੋ, ਛੁਪੋ ਅਤੇ ਫੜੀ ਰੱਖੋ
- ਝਟਕਿਆਂ ਦੌਰਾਨ ਜ਼ਮੀਨ 'ਤੇ ਝੁਕੋ, ਮਜ਼ਬੂਤ ਫਰਨੀਚਰ ਹੇਠਾਂ ਛੁਪੋ ਅਤੇ ਫੜੀ ਰੱਖੋ।
- ਸ਼ਾਂਤ ਰਹੋ ਅਤੇ ਸਿਰ ਤੇ ਗਰਦਨ ਦੀ ਰੱਖਿਆ ਕਰੋ।

2. ਖ਼ਤਰਿਆਂ ਤੋਂ ਦੂਰ ਰਹੋ
- ਖਿੜਕੀਆਂ, ਸ਼ੀਸ਼ੇ ਅਤੇ ਭਾਰੀ ਚੀਜ਼ਾਂ ਤੋਂ ਦੂਰ ਰਹੋ ਜੋ ਡਿੱਗ ਸਕਦੀਆਂ ਹਨ।
- ਤਸਵੀਰਾਂ, ਸ਼ੈਲਫ਼ ਜਾਂ ਵੱਡੇ ਫਰਨੀਚਰ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ।

3. ਲਿਫ਼ਟ ਨਾ ਵਰਤੋ
- ਭੂਚਾਲ ਦੌਰਾਨ ਲਿਫ਼ਟ ਦਾ ਕਦੇ ਵੀ ਵਰਤੋਂ ਨਾ ਕਰੋ।
- ਜੇ ਨਿਕਾਸੀ ਲਾਜ਼ਮੀ ਹੈ ਤਾਂ ਸੀੜੀਆਂ ਵਰਤੋ।

4. ਸੁਰੱਖਿਅਤ ਨਿਕਾਸੀ
- ਝਟਕੇ ਮੁਕਣ ਤੋਂ ਬਾਅਦ ਖੁੱਲ੍ਹੇ ਮੈਦਾਨ ਵਿੱਚ ਜਾਓ, ਇਮਾਰਤਾਂ, ਦਰੱਖਤਾਂ ਅਤੇ ਬਿਜਲੀ ਦੇ ਖੰਭਾਂ ਤੋਂ ਦੂਰ ਰਹੋ।
- ਸੁਰੱਖਿਅਤ ਜਗ੍ਹਾ ਜਾਂ ਸ਼ੈਲਟਰ ਲਈ ਸਥਾਨਕ ਅਧਿਕਾਰੀਆਂ ਦੇ ਹੁਕਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।

5. ਆਫ਼ਟਰਸ਼ਾਕ ਲਈ ਤਿਆਰ ਰਹੋ
- ਮੁੱਖ ਭੂਚਾਲ ਦੇ ਬਾਅਦ ਛੋਟੇ ਝਟਕੇ ਆ ਸਕਦੇ ਹਨ।
- ਸਾਵਧਾਨ ਰਹੋ ਅਤੇ ਜ਼ਰੂਰਤ ਪੈਣ 'ਤੇ ਫਿਰੋਂ ਝੁਕੋ, ਛੁਪੋ ਅਤੇ ਫੜੀ ਰੱਖੋ।

ਯਾਦ ਰਹੋ: ਸ਼ਾਂਤ ਰਹੋ, ਸਾਵਧਾਨ ਰਹੋ ਅਤੇ ਹਮੇਸ਼ਾ ਆਪਣੀ ਸੁਰੱਖਿਆ ਨੂੰ ਪਹਿਲਾਂ ਰੱਖੋ।`,
},

    image: "/images/earthquake.jpg",
    quiz: [
      {
        question: {
          en: "What is the first action during an earthquake indoors?",
          hi: "घर के अंदर भूकंप आने पर पहला कदम क्या होगा?",
          pa: "ਘਰ ਦੇ ਅੰਦਰ ਭੂਚਾਲ ਆਉਣ ਤੇ ਪਹਿਲਾ ਕਦਮ ਕੀ ਹੋਵੇਗਾ?",
        },
        options: {
          en: ["Run outside immediately", "Drop, cover and hold", "Use the lift", "Stand near glass"],
          hi: ["तुरंत बाहर भागना", "झुकें और मेज़ पकड़ें", "लिफ्ट का उपयोग करें", "काँच के पास खड़े रहें"],
          pa: ["ਤੁਰੰਤ ਬਾਹਰ ਭੱਜੋ", "ਝੁਕੋ ਤੇ ਮੇਜ਼ ਫੜੋ", "ਲਿਫ਼ਟ ਵਰਤੋ", "ਸ਼ੀਸ਼ੇ ਕੋਲ ਖੜ੍ਹੋ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Why avoid elevators during earthquakes?",
          hi: "भूकंप में लिफ्ट से क्यों बचना चाहिए?",
          pa: "ਭੂਚਾਲ ਵਿੱਚ ਲਿਫ਼ਟ ਤੋਂ ਕਿਉਂ ਬਚਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["They are slow", "They may get stuck", "They cost money", "They are noisy"],
          hi: ["वे धीमी हैं", "वे फंस सकती हैं", "वे महंगी हैं", "वे शोर करती हैं"],
          pa: ["ਉਹ ਹੌਲੀ ਹਨ", "ਉਹ ਫਸ ਸਕਦੀਆਂ ਹਨ", "ਉਹ ਮਹਿੰਗੀਆਂ ਹਨ", "ਉਹ ਸ਼ੋਰ ਕਰਦੀਆਂ ਹਨ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Where should you go after tremors stop?",
          hi: "झटके रुकने के बाद कहाँ जाना चाहिए?",
          pa: "ਝਟਕੇ ਮੁਕਣ ਤੋਂ ਬਾਅਦ ਕਿੱਥੇ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Basement", "Open ground", "Lift", "Balcony"],
          hi: ["तहखाना", "खुला मैदान", "लिफ्ट", "बालकनी"],
          pa: ["ਬੇਸਮੈਂਟ", "ਖੁੱਲ੍ਹਾ ਮੈਦਾਨ", "ਲਿਫ਼ਟ", "ਬਾਲਕਨੀ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Which items should you stay away from?",
          hi: "किस वस्तु से दूर रहना चाहिए?",
          pa: "ਕਿਹੜੀਆਂ ਚੀਜ਼ਾਂ ਤੋਂ ਦੂਰ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Windows and mirrors", "Tables", "Stairs", "Open ground"],
          hi: ["खिड़कियाँ और शीशे", "मेज़", "सीढ़ियाँ", "खुला मैदान"],
          pa: ["ਖਿੜਕੀਆਂ ਤੇ ਸ਼ੀਸ਼ੇ", "ਮੇਜ਼", "ਸੀੜੀਆਂ", "ਖੁੱਲ੍ਹਾ ਮੈਦਾਨ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "Aftershocks are:",
          hi: "आफ्टरशॉक्स क्या होते हैं?",
          pa: "ਆਫ਼ਟਰਸ਼ਾਕ ਕੀ ਹੁੰਦੇ ਹਨ?",
        },
        options: {
          en: ["Main earthquake", "Smaller quakes after main one", "Storms", "Rain"],
          hi: ["मुख्य भूकंप", "मुख्य के बाद छोटे झटके", "तूफान", "बारिश"],
          pa: ["ਮੁੱਖ ਭੂਚਾਲ", "ਮੁੱਖ ਤੋਂ ਬਾਅਦ ਛੋਟੇ ਝਟਕੇ", "ਤੂਫ਼ਾਨ", "ਬਰਸਾਤ"],
        },
        answerIndex: 1,
      },
    ],
  },

  // 🔥 Fire
  {
    id: 3,
    title: { en: "Fire Safety", hi: "आग सुरक्षा", pa: "ਅੱਗ ਸੁਰੱਖਿਆ" },
    description: {
      en: "Fires in Punjab often occur in schools, homes, and fields due to accidents or short circuits.",
      hi: "पंजाब में स्कूलों, घरों और खेतों में आग शॉर्ट सर्किट या दुर्घटनाओं से लगती है।",
      pa: "ਪੰਜਾਬ ਵਿੱਚ ਸਕੂਲਾਂ, ਘਰਾਂ ਅਤੇ ਖੇਤਾਂ ਵਿੱਚ ਅੱਗ ਹਾਦਸਿਆਂ ਜਾਂ ਸ਼ਾਰਟ ਸਰਕਟ ਨਾਲ ਲੱਗਦੀ ਹੈ।",
    },
   content: {
  en: `Fire Safety Guidelines:

1. Smoke Alarms
- Install smoke alarms in key areas of your home.
- Test alarms regularly to ensure they are working.

2. Fire Extinguishers
- Keep a fire extinguisher handy in the kitchen or near potential fire sources.
- Learn how to use it properly.

3. Cooking Safety
- Never leave cooking unattended.
- Keep flammable items away from the stove or oven.

4. In Case of Fire
- Crawl low under smoke to avoid inhaling it.
- Cover your nose and mouth with a cloth if possible.
- Follow your family's emergency plan.

5. Evacuation
- Do not use lifts during a fire.
- Use stairs to exit the building safely.
- Help others, including children, elders, and pets, if it is safe to do so.

Remember: Stay calm, act quickly, and prioritize safety.`,

  hi: `आग सुरक्षा दिशानिर्देश:

1. धुआँ अलार्म
- घर के महत्वपूर्ण स्थानों पर धुआँ अलार्म लगाएं।
- अलार्म की नियमित जांच करें कि यह काम कर रहा है।

2. आग बुझाने वाला यंत्र
- रसोई या संभावित आग स्रोत के पास आग बुझाने वाला यंत्र रखें।
- इसका सही तरीके से उपयोग करना सीखें।

3. खाना पकाने की सुरक्षा
- खाना पकाते समय कभी ध्यान न हटाएँ।
- चुल्हा या ओवन के पास ज्वलनशील वस्तुएँ न रखें।

4. आग लगने पर
- धुएँ से बचने के लिए नीचे झुककर चलें।
- यदि संभव हो तो नाक और मुँह को कपड़े से ढकें।
- परिवार की आपातकालीन योजना का पालन करें।

5. निकासी
- आग लगने पर लिफ्ट का उपयोग न करें।
- सुरक्षित रूप से बाहर निकलने के लिए सीढ़ियों का उपयोग करें।
- यदि सुरक्षित हो तो बच्चों, बुजुर्गों और पालतू जानवरों की मदद करें।

याद रखें: शांत रहें, तुरंत कार्य करें और सुरक्षा को प्राथमिकता दें।`,

  pa: `ਅੱਗ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਧੂੰਏਂ ਦੇ ਅਲਾਰਮ
- ਘਰ ਦੇ ਮੁੱਖ ਸਥਾਨਾਂ ਤੇ ਧੂੰਏਂ ਦੇ ਅਲਾਰਮ ਲਗਾਓ।
- ਨਿਯਮਤ ਜਾਂਚ ਕਰੋ ਕਿ ਅਲਾਰਮ ਸਹੀ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ।

2. ਅੱਗ ਬੁਝਾਉਣ ਵਾਲਾ ਯੰਤਰ
- ਰਸੋਈ ਜਾਂ ਸੰਭਾਵਿਤ ਅੱਗ ਦੇ ਸਤਰਾਂ ਦੇ ਨੇੜੇ ਅੱਗ ਬੁਝਾਉਣ ਵਾਲਾ ਯੰਤਰ ਰੱਖੋ।
- ਇਸਦਾ ਸਹੀ ਤਰੀਕੇ ਨਾਲ ਵਰਤੋਂ ਕਰਨਾ ਸਿੱਖੋ।

3. ਖਾਣਾ ਬਣਾਉਣ ਦੀ ਸੁਰੱਖਿਆ
- ਖਾਣਾ ਬਣਾਉਂਦੇ ਸਮੇਂ ਕਦੇ ਵੀ ਧਿਆਨ ਨਾ ਹਟਾਓ।
- ਚੁਲ੍ਹਾ ਜਾਂ ਓਵਨ ਦੇ ਨੇੜੇ ਜ਼ਲਨਯੋਗ ਚੀਜ਼ਾਂ ਨਾ ਰੱਖੋ।

4. ਅੱਗ ਲੱਗਣ ਤੇ
- ਧੂੰਏਂ ਤੋਂ ਬਚਣ ਲਈ ਹੇਠਾਂ ਝੁਕ ਕੇ ਚੱਲੋ।
- ਜੇ ਸੰਭਵ ਹੋਵੇ ਤਾਂ ਨੱਕ ਅਤੇ ਮੂੰਹ ਨੂੰ ਕਪੜੇ ਨਾਲ ਢਕੋ।
- ਪਰਿਵਾਰ ਦੀ ਐਮਰਜੈਂਸੀ ਯੋਜਨਾ ਦਾ ਪਾਲਣ ਕਰੋ।

5. ਨਿਕਾਸੀ
- ਅੱਗ ਲੱਗਣ ਤੇ ਲਿਫ਼ਟ ਦਾ ਵਰਤੋਂ ਨਾ ਕਰੋ।
- ਸੁਰੱਖਿਅਤ ਤਰੀਕੇ ਨਾਲ ਬਾਹਰ ਨਿਕਲਣ ਲਈ ਸੀੜੀਆਂ ਵਰਤੋ।
- ਜੇ ਸੁਰੱਖਿਅਤ ਹੋਵੇ ਤਾਂ ਬੱਚਿਆਂ, ਬਜ਼ੁਰਗਾਂ ਅਤੇ ਪਾਲਤੂ ਜਾਨਵਰਾਂ ਦੀ ਮਦਦ ਕਰੋ।

ਯਾਦ ਰੱਖੋ: ਸ਼ਾਂਤ ਰਹੋ, ਤੁਰੰਤ ਕਾਰਵਾਈ ਕਰੋ ਅਤੇ ਸੁਰੱਖਿਆ ਨੂੰ ਪਹਿਲਾਂ ਰੱਖੋ।`,
},

    image: "/images/fire.jpg",
    quiz: [
      {
        question: {
          en: "What should you never do while cooking?",
          hi: "खाना बनाते समय क्या नहीं करना चाहिए?",
          pa: "ਖਾਣਾ ਬਣਾਉਂਦੇ ਸਮੇਂ ਕੀ ਨਹੀਂ ਕਰਨਾ ਚਾਹੀਦਾ?",
        },
        options: {
          en: ["Leave stove unattended", "Stir food", "Add spices", "Use utensils"],
          hi: ["चूल्हा छोड़ना", "भोजन चलाना", "मसाले डालना", "बर्तन उपयोग करना"],
          pa: ["ਚੁੱਲ੍ਹਾ ਛੱਡਣਾ", "ਖਾਣਾ ਚਲਾਉਣਾ", "ਮਸਾਲੇ ਪਾਉਣਾ", "ਬਰਤਨ ਵਰਤਣਾ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "Where should you crawl in case of smoke?",
          hi: "धुएँ की स्थिति में कहाँ झुककर चलना चाहिए?",
          pa: "ਧੂੰਏਂ ਵਿੱਚ ਕਿੱਥੇ ਝੁਕ ਕੇ ਤੁਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["High level", "Low to the ground", "Balcony", "Stairs"],
          hi: ["ऊँचाई पर", "जमीन के पास", "बालकनी", "सीढ़ियाँ"],
          pa: ["ਉੱਚਾਈ ਤੇ", "ਜ਼ਮੀਨ ਦੇ ਨੇੜੇ", "ਬਾਲਕਨੀ", "ਸੀੜੀਆਂ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Which equipment is essential at home?",
          hi: "घर में कौन सा उपकरण जरूरी है?",
          pa: "ਘਰ ਵਿੱਚ ਕਿਹੜਾ ਉਪਕਰਣ ਜ਼ਰੂਰੀ ਹੈ?",
        },
        options: {
          en: ["Microwave", "Fire extinguisher", "Vacuum cleaner", "Fan"],
          hi: ["माइक्रोवेव", "आग बुझाने वाला यंत्र", "वैक्यूम क्लीनर", "पंखा"],
          pa: ["ਮਾਈਕਰੋਵੇਵ", "ਅੱਗ ਬੁਝਾਉਣ ਵਾਲਾ ਯੰਤਰ", "ਵੈਕਿਊਮ ਕਲੀਨਰ", "ਪੱਖਾ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Should you use a lift in fire?",
          hi: "आग लगने पर क्या लिफ्ट का उपयोग करना चाहिए?",
          pa: "ਅੱਗ ਲੱਗਣ 'ਤੇ ਕੀ ਲਿਫ਼ਟ ਵਰਤਣੀ ਚਾਹੀਦੀ ਹੈ?",
        },
        options: {
          en: ["Yes", "No"],
          hi: ["हाँ", "नहीं"],
          pa: ["ਹਾਂ", "ਨਹੀਂ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Smoke alarms should be:",
          hi: "धुआं अलार्म कैसे होने चाहिए?",
          pa: "ਧੂੰਏਂ ਦੇ ਅਲਾਰਮ ਕਿਵੇਂ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ?",
        },
        options: {
          en: ["Checked regularly", "Never tested", "Removed", "Ignored"],
          hi: ["नियमित रूप से जांचे", "कभी न जांचें", "हटाएं", "अनदेखा करें"],
          pa: ["ਨਿਯਮਿਤ ਜਾਂਚੇ", "ਕਦੇ ਨਾ ਜਾਂਚੋ", "ਹਟਾਓ", "ਅਣਡਿੱਠਾ ਕਰੋ"],
        },
        answerIndex: 0,
      },
    ],
  },

  // ☀️ Heatwave
  {
    id: 4,
    title: { en: "Heatwave Safety", hi: "लू से सुरक्षा", pa: "ਲੂ ਸੁਰੱਖਿਆ" },
    description: {
      en: "Punjab experiences extreme heat in summer. Heatwaves can cause dehydration and illness.",
      hi: "पंजाब में गर्मियों में लू चलती है जिससे डिहाइड्रेशन और बीमारियाँ होती हैं।",
      pa: "ਪੰਜਾਬ ਵਿੱਚ ਗਰਮੀਆਂ ਵਿੱਚ ਲੂ ਕਾਰਨ ਡੀਹਾਈਡ੍ਰੇਸ਼ਨ ਤੇ ਬਿਮਾਰੀਆਂ ਹੁੰਦੀਆਂ ਹਨ।",
    },
   content: {
  en: `Heatwave Safety Guidelines:

1. Stay Hydrated
- Drink plenty of water throughout the day.
- Avoid alcohol and caffeinated drinks that can dehydrate you.

2. Clothing and Sun Protection
- Wear light, breathable cotton clothes.
- Cover your head with a hat or scarf when outdoors.

3. Avoid Peak Heat
- Limit outdoor work or activities during peak afternoon hours.
- Take frequent breaks in shaded or cool areas.

4. Keep Cool
- Use fans, coolers, or stay in shaded areas.
- Take cool showers if needed.

5. Watch for Heat-related Illness
- Be alert for signs of heatstroke such as dizziness, nausea, or rapid heartbeat.
- Move to a cool place and hydrate if symptoms appear.

Remember: Stay hydrated, avoid the sun, and prioritize your health.`,

  hi: `लू सुरक्षा दिशानिर्देश:

1. हाइड्रेशन बनाए रखें
- पूरे दिन खूब पानी पिएं।
- शराब और कैफीन वाले पेय से बचें जो डिहाइड्रेशन बढ़ा सकते हैं।

2. कपड़े और सूरज से सुरक्षा
- हल्के, सांस लेने वाले सूती कपड़े पहनें।
- बाहर रहते समय सिर को टोपी या स्कार्फ से ढकें।

3. अधिक गर्मी से बचें
- दोपहर के समय बाहर काम या गतिविधियाँ सीमित करें।
- बार-बार छाया या ठंडी जगह पर आराम करें।

4. ठंडा रहें
- पंखा, कूलर या छायादार जगह का उपयोग करें।
- आवश्यकता पड़ने पर ठंडी शावर लें।

5. गर्मी से संबंधित बीमारियों पर ध्यान दें
- चक्कर, मतली, या तेज़ दिल की धड़कन जैसे लक्षणों पर सतर्क रहें।
- लक्षण आने पर ठंडी जगह पर जाएँ और पानी पिएँ।

याद रखें: हाइड्रेटेड रहें, धूप से बचें और स्वास्थ्य को प्राथमिकता दें।`,

  pa: `ਲੂ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਪਾਣੀ ਪੀਣਾ
- ਦਿਨ ਭਰ ਬਹੁਤ ਪਾਣੀ ਪਿਓ।
- ਸ਼ਰਾਬ ਅਤੇ ਕੈਫੀਨ ਵਾਲੇ ਪੇਯ ਤੋਂ ਬਚੋ ਜੋ ਡੀਹਾਈਡ੍ਰੇਸ਼ਨ ਵਧਾ ਸਕਦੇ ਹਨ।

2. ਕਪੜੇ ਅਤੇ ਸੂਰਜ ਤੋਂ ਸੁਰੱਖਿਆ
- ਹਲਕੇ, ਸਾਹ ਲੈਣ ਯੋਗ ਸੂਤੀ ਕੱਪੜੇ ਪਾਓ।
- ਬਾਹਰ ਹੋਣ ਤੇ ਸਿਰ ਨੂੰ ਟੋਪੀ ਜਾਂ ਰਮਾਲ ਨਾਲ ਢੱਕੋ।

3. ਵੱਧ ਗਰਮੀ ਤੋਂ ਬਚੋ
- ਦੁਪਹਿਰ ਦੇ ਸਮੇਂ ਬਾਹਰ ਕੰਮ ਜਾਂ ਕਿਰਿਆਵਾਂ ਘੱਟ ਕਰੋ।
- ਬਾਰ-ਬਾਰ ਛਾਂ ਜਾਂ ਠੰਡੀ ਜਗ੍ਹਾ ਵਿੱਚ ਅਰਾਮ ਕਰੋ।

4. ਠੰਡਾ ਰਹੋ
- ਪੱਖਾ, ਕੂਲਰ ਜਾਂ ਛਾਂ ਵਾਲੀ ਜਗ੍ਹਾ ਵਰਤੋ।
- ਲੋੜ ਹੋਣ 'ਤੇ ਠੰਡੀ ਸ਼ਾਵਰ ਲਓ।

5. ਗਰਮੀ ਨਾਲ ਸਬੰਧਿਤ ਬਿਮਾਰੀਆਂ ਦਾ ਧਿਆਨ ਰੱਖੋ
- ਚੱਕਰ, ਮਤਲੀ ਜਾਂ ਤੇਜ਼ ਧੜਕਨ ਦੇ ਲੱਛਣਾਂ ਲਈ ਸਾਵਧਾਨ ਰਹੋ।
- ਲੱਛਣ ਆਉਣ 'ਤੇ ਠੰਡੀ ਜਗ੍ਹਾ ਵਿੱਚ ਜਾਓ ਅਤੇ ਪਾਣੀ ਪਿਓ।

ਯਾਦ ਰਹੋ: ਹਾਈਡਰੇਟ ਰਹੋ, ਧੁੱਪ ਤੋਂ ਬਚੋ ਅਤੇ ਆਪਣੇ ਸਿਹਤ ਨੂੰ ਪਹਿਲਾਂ ਰੱਖੋ।`,
},

    image: "/images/heatwave.jpg",
    quiz: [
      {
        question: {
          en: "What is most important in heatwave?",
          hi: "लू में सबसे जरूरी क्या है?",
          pa: "ਲੂ ਵਿੱਚ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਕੀ ਹੈ?",
        },
        options: {
          en: ["Drinking water", "Skipping meals", "Heavy clothes", "Outdoor games"],
          hi: ["पानी पीना", "भोजन छोड़ना", "भारी कपड़े", "बाहर खेल"],
          pa: ["ਪਾਣੀ ਪੀਣਾ", "ਖਾਣਾ ਛੱਡਣਾ", "ਭਾਰੀ ਕੱਪੜੇ", "ਬਾਹਰ ਖੇਡਾਂ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "What clothing is best?",
          hi: "कपड़े कैसे होने चाहिए?",
          pa: "ਕੱਪੜੇ ਕਿਹੜੇ ਹੋਣੇ ਚਾਹੀਦੇ ਹਨ?",
        },
        options: {
          en: ["Light cotton", "Wool", "Silk", "Leather"],
          hi: ["हल्के सूती", "ऊन", "रेशम", "चमड़ा"],
          pa: ["ਹਲਕੇ ਕਪਾਹ", "ਊਨ", "ਰੇਸ਼ਮ", "ਚਮੜਾ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "When should you avoid outdoor work?",
          hi: "किस समय बाहर काम से बचना चाहिए?",
          pa: "ਕਿਹੜੇ ਸਮੇਂ ਬਾਹਰ ਕੰਮ ਤੋਂ ਬਚਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Morning", "Afternoon", "Evening", "Night"],
          hi: ["सुबह", "दोपहर", "शाम", "रात"],
          pa: ["ਸਵੇਰ", "ਦੁਪਹਿਰ", "ਸ਼ਾਮ", "ਰਾਤ"],
        },
        answerIndex: 1,
      },
      {
        question: {
          en: "Heatstroke symptoms include:",
          hi: "लू लगने के लक्षण क्या हैं?",
          pa: "ਲੂ ਲੱਗਣ ਦੇ ਲੱਛਣ ਕੀ ਹਨ?",
        },
        options: {
          en: ["Dizziness", "Energy boost", "Better sleep", "Hunger"],
          hi: ["चक्कर आना", "ऊर्जा बढ़ना", "अच्छी नींद", "भूख"],
          pa: ["ਚੱਕਰ ਆਉਣਾ", "ਉਰਜਾ ਵੱਧਣਾ", "ਵਧੀਆ ਨੀਂਦ", "ਭੁੱਖ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "Where should you stay in heatwave?",
          hi: "लू में कहाँ रहना चाहिए?",
          pa: "ਲੂ ਵਿੱਚ ਕਿੱਥੇ ਰਹਿਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Shade/cooler area", "Direct sun", "Playground", "Roof"],
          hi: ["छाया/कूलर जगह", "सीधी धूप", "खेल का मैदान", "छत"],
          pa: ["ਛਾਂ/ਕੂਲਰ ਵਾਲੀ ਥਾਂ", "ਸਿੱਧੀ ਧੁੱਪ", "ਖੇਡ ਮੈਦਾਨ", "ਛੱਤ"],
        },
        answerIndex: 0,
      },
    ],
  },

  // 🦠 Pandemic
  {
    id: 5,
    title: { en: "Pandemic Safety", hi: "महामारी सुरक्षा", pa: "ਮਹਾਂਮਾਰੀ ਸੁਰੱਖਿਆ" },
    description: {
      en: "Punjab faced challenges during COVID-19. Hygiene and distancing reduce spread.",
      hi: "कोविड-19 में पंजाब को चुनौतियाँ मिलीं। स्वच्छता और दूरी से फैलाव घटता है।",
      pa: "ਕੋਵਿਡ-19 ਦੌਰਾਨ ਪੰਜਾਬ ਨੇ ਚੁਣੌਤੀਆਂ ਦਾ ਸਾਹਮਣਾ ਕੀਤਾ। ਸਫਾਈ ਤੇ ਦੂਰੀ ਨਾਲ ਫੈਲਾਅ ਘਟਦਾ ਹੈ।",
    },
    content: {
  en: `Pandemic Safety Guidelines:

1. Hand Hygiene
- Wash your hands frequently with soap and water for at least 20 seconds.
- Use hand sanitizer when soap and water are not available.

2. Mask Usage
- Wear masks in crowded or enclosed areas.
- Ensure the mask covers both nose and mouth properly.

3. Avoid Crowds
- Stay away from large gatherings whenever possible.
- Maintain awareness of local infection levels and restrictions.

4. Physical Distancing
- Keep a distance of at least 2 meters from others.
- Avoid close contact, especially with vulnerable individuals.

5. Vaccination
- Follow recommended vaccination schedules.
- Stay updated with booster doses as advised by health authorities.

Remember: Good hygiene, mask usage, distancing, and vaccination keep you and others safe.`,

  hi: `महामारी सुरक्षा दिशानिर्देश:

1. हाथों की सफाई
- अपने हाथों को साबुन और पानी से कम से कम 20 सेकंड तक बार-बार धोएं।
- यदि साबुन और पानी उपलब्ध न हों, तो हैंड सैनिटाइज़र का प्रयोग करें।

2. मास्क का उपयोग
- भीड़ या बंद जगहों में मास्क पहनें।
- सुनिश्चित करें कि मास्क नाक और मुँह दोनों को सही तरीके से ढकता हो।

3. भीड़ से बचें
- संभव हो तो बड़े जमावड़ों से दूर रहें।
- स्थानीय संक्रमण स्तर और नियमों की जानकारी रखें।

4. शारीरिक दूरी
- दूसरों से कम से कम 2 मीटर की दूरी बनाए रखें।
- विशेष रूप से कमजोर व्यक्तियों के साथ निकट संपर्क से बचें।

5. टीकाकरण
- अनुशंसित टीकाकरण समय-सारणी का पालन करें।
- स्वास्थ्य अधिकारियों द्वारा बताए अनुसार बूस्टर डोज़ लें।

याद रखें: अच्छी सफाई, मास्क, दूरी और टीकाकरण आपको और दूसरों को सुरक्षित रखते हैं।`,

  pa: `ਮਹਾਂਮਾਰੀ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਹੱਥਾਂ ਦੀ ਸਫਾਈ
- ਆਪਣੇ ਹੱਥਾਂ ਨੂੰ ਸਾਬਣ ਅਤੇ ਪਾਣੀ ਨਾਲ ਘੱਟੋ-ਘੱਟ 20 ਸਕਿੰਟ ਲਈ ਵਾਰ-ਵਾਰ ਧੋਵੋ।
- ਜੇ ਸਾਬਣ ਅਤੇ ਪਾਣੀ ਉਪਲਬਧ ਨਾ ਹੋਵੇ, ਤਾਂ ਹੈਂਡ ਸੈਨਿਟਾਈਜ਼ਰ ਵਰਤੋਂ।

2. ਮਾਸਕ ਦਾ ਉਪਯੋਗ
- ਭੀੜ ਵਾਲੀਆਂ ਜਾਂ ਬੰਦ ਜਗ੍ਹਾਂ 'ਤੇ ਮਾਸਕ ਪਾਓ।
- ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਮਾਸਕ ਨੱਕ ਅਤੇ ਮੂੰਹ ਦੋਹਾਂ ਨੂੰ ਠੀਕ ਢੰਗ ਨਾਲ ਢੱਕਦਾ ਹੋਵੇ।

3. ਭੀੜ ਤੋਂ ਬਚੋ
- ਸੰਭਵ ਹੋਵੇ ਤਾਂ ਵੱਡੀਆਂ ਭੀੜਾਂ ਤੋਂ ਦੂਰ ਰਹੋ।
- ਸਥਾਨਕ ਸੰਕਰਮਣ ਦੀ ਸਥਿਤੀ ਅਤੇ ਨਿਯਮਾਂ ਦਾ ਧਿਆਨ ਰੱਖੋ।

4. ਸ਼ਾਰੀਰਕ ਦੂਰੀ
- ਦੂਜਿਆਂ ਤੋਂ ਘੱਟੋ-ਘੱਟ 2 ਮੀਟਰ ਦੀ ਦੂਰੀ ਬਣਾਈ ਰੱਖੋ।
- ਖਾਸ ਕਰਕੇ ਕਮਜ਼ੋਰ ਲੋਕਾਂ ਨਾਲ ਨੇੜੀ ਸੰਪਰਕ ਤੋਂ ਬਚੋ।

5. ਟੀਕਾਕਰਨ
- ਸਿਫਾਰਸ਼ ਕੀਤੀ ਟੀਕਾਕਰਨ ਸੂਚੀ ਦਾ ਪਾਲਣ ਕਰੋ।
- ਸਿਹਤ ਅਧਿਕਾਰੀਆਂ ਦੀ ਸਲਾਹ ਮੁਤਾਬਕ ਬੂਸਟਰ ਡੋਜ਼ ਲਓ।

ਯਾਦ ਰੱਖੋ: ਚੰਗੀ ਸਫਾਈ, ਮਾਸਕ, ਦੂਰੀ ਅਤੇ ਟੀਕਾਕਰਨ ਤੁਹਾਨੂੰ ਅਤੇ ਹੋਰਨਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਦੇ ਹਨ।`,
},

    image: "/images/pandemic.jpg",
    quiz: [
      {
        question: {
          en: "What protects against viruses?",
          hi: "वायरस से बचाव में क्या मदद करता है?",
          pa: "ਵਾਇਰਸ ਤੋਂ ਬਚਾਅ ਵਿੱਚ ਕੀ ਮਦਦ ਕਰਦਾ ਹੈ?",
        },
        options: {
          en: ["Masks and hygiene", "Crowds", "Hunger", "Travel"],
          hi: ["मास्क और स्वच्छता", "भीड़", "भूख", "यात्रा"],
          pa: ["ਮਾਸਕ ਤੇ ਸਫਾਈ", "ਭੀੜ", "ਭੁੱਖ", "ਯਾਤਰਾ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "Safe physical distance is:",
          hi: "सुरक्षित शारीरिक दूरी कितनी है?",
          pa: "ਸੁਰੱਖਿਅਤ ਦੂਰੀ ਕਿੰਨੀ ਹੈ?",
        },
        options: {
          en: ["2 meters", "20 cm", "5 cm", "10 cm"],
          hi: ["2 मीटर", "20 सेमी", "5 सेमी", "10 सेमी"],
          pa: ["2 ਮੀਟਰ", "20 ਸੈਂਟੀਮੀਟਰ", "5 ਸੈਂਟੀਮੀਟਰ", "10 ਸੈਂਟੀਮੀਟਰ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "What should you avoid?",
          hi: "महामारी में किससे बचना चाहिए?",
          pa: "ਮਹਾਂਮਾਰੀ ਵਿੱਚ ਕਿਸ ਤੋਂ ਬਚਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Large gatherings", "Hand washing", "Masks", "Vaccination"],
          hi: ["बड़ी भीड़", "हाथ धोना", "मास्क", "टीकाकरण"],
          pa: ["ਵੱਡੀਆਂ ਭੀੜਾਂ", "ਹੱਥ ਧੋਣਾ", "ਮਾਸਕ", "ਟੀਕਾਕਰਣ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "Why wash hands?",
          hi: "हाथ क्यों धोने चाहिए?",
          pa: "ਹੱਥ ਕਿਉਂ ਧੋਣੇ ਚਾਹੀਦੇ ਹਨ?",
        },
        options: {
          en: ["Remove germs", "For fun", "Dry skin", "Fashion"],
          hi: ["कीटाणु हटाने के लिए", "मज़े के लिए", "सूखी त्वचा", "फैशन"],
          pa: ["ਜੀਵਾਣੂ ਹਟਾਉਣ ਲਈ", "ਮਜ਼ੇ ਲਈ", "ਸੁੱਕੀ ਚਮੜੀ", "ਫੈਸ਼ਨ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "Vaccines are:",
          hi: "टीके क्या हैं?",
          pa: "ਟੀਕੇ ਕੀ ਹਨ?",
        },
        options: {
          en: ["Protection", "Food", "Drinks", "Games"],
          hi: ["सुरक्षा", "भोजन", "पेय", "खेल"],
          pa: ["ਸੁਰੱਖਿਆ", "ਭੋਜਨ", "ਪੀਣ ਵਾਲੀਆਂ ਚੀਜ਼ਾਂ", "ਖੇਡਾਂ"],
        },
        answerIndex: 0,
      },
    ],
  },

  // 🏭 Industrial
  {
    id: 6,
    title: { en: "Industrial Disaster Safety", hi: "औद्योगिक आपदा सुरक्षा", pa: "ਉਦਯੋਗਿਕ ਆਫ਼ਤ ਸੁਰੱਖਿਆ" },
    description: {
      en: "Punjab has many factories. Industrial leaks, fires, or explosions can harm workers and locals.",
      hi: "पंजाब में कई फैक्ट्रियाँ हैं। औद्योगिक रिसाव, आग या विस्फोट से नुकसान हो सकता है।",
      pa: "ਪੰਜਾਬ ਵਿੱਚ ਕਈ ਫੈਕਟਰੀਆਂ ਹਨ। ਉਦਯੋਗਿਕ ਰਿਸਾਅ, ਅੱਗ ਜਾਂ ਧਮਾਕਿਆਂ ਨਾਲ ਨੁਕਸਾਨ ਹੋ ਸਕਦਾ ਹੈ।",
    },
   content: {
  en: `Industrial Disaster Safety Guidelines:

1. Know Emergency Exits
- Familiarize yourself with all emergency exits in your workplace.
- Keep exit routes clear and accessible at all times.

2. Follow Safety Instructions
- Adhere to all workplace safety rules.
- Always wear the recommended protective gear.

3. Handle Chemicals Safely
- Do not touch unknown or hazardous chemicals.
- Follow proper procedures for handling and disposal.

4. Raise Alarm
- In case of a gas leak, fire, or other hazard, raise the alarm immediately.
- Notify supervisors and coworkers promptly.

5. Evacuate Calmly
- Leave the premises calmly and follow the designated evacuation route.
- Assist coworkers if it is safe to do so.

Remember: Awareness, caution, and quick action can save lives.`,

  hi: `औद्योगिक आपदा सुरक्षा दिशानिर्देश:

1. आपातकालीन निकास जानें
- अपने कार्यस्थल के सभी आपातकालीन निकासों को जानें।
- निकास मार्ग हमेशा साफ और पहुंच योग्य रखें।

2. सुरक्षा निर्देशों का पालन करें
- कार्यस्थल के सभी सुरक्षा नियमों का पालन करें।
- हमेशा सुझाए गए सुरक्षात्मक उपकरण पहनें।

3. रसायनों को सुरक्षित रूप से संभालें
- अज्ञात या हानिकारक रसायनों को न छुएं।
- संभालने और निपटान के लिए उचित प्रक्रियाओं का पालन करें।

4. अलार्म बजाएँ
- गैस रिसाव, आग या अन्य खतरे की स्थिति में तुरंत अलार्म बजाएँ।
- पर्यवेक्षकों और सहकर्मियों को तुरंत सूचित करें।

5. शांतिपूर्वक निकास करें
- परिसर को शांतिपूर्वक छोड़ें और निर्धारित निकासी मार्ग का पालन करें।
- यदि सुरक्षित हो तो सहकर्मियों की मदद करें।

याद रखें: सतर्कता, सावधानी और त्वरित कार्य जीवन बचा सकते हैं।`,

  pa: `ਉਦਯੋਗਿਕ ਆਫ਼ਤ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਐਮਰਜੈਂਸੀ ਗੇਟ ਜਾਣੋ
- ਆਪਣੇ ਕੰਮ ਵਾਲੇ ਸਥਾਨ ਦੇ ਸਾਰੇ ਐਮਰਜੈਂਸੀ ਗੇਟ ਜਾਣੋ।
- ਰਾਹਾਂ ਨੂੰ ਸਾਫ਼ ਅਤੇ ਹਮੇਸ਼ਾ ਪਹੁੰਚਯੋਗ ਰੱਖੋ।

2. ਸੁਰੱਖਿਆ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ
- ਕੰਮ ਵਾਲੇ ਸਥਾਨ ਦੇ ਸਾਰੇ ਸੁਰੱਖਿਆ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।
- ਹਮੇਸ਼ਾ ਸੁਝਾਏ ਗਏ ਸੁਰੱਖਿਆ ਵਾਲੇ ਉਪਕਰਣ ਪਾਓ।

3. ਰਸਾਇਣਾਂ ਨੂੰ ਸੁਰੱਖਿਆ ਨਾਲ ਸੰਭਾਲੋ
- ਅਣਜਾਣ ਜਾਂ ਖਤਰਨਾਕ ਰਸਾਇਣਾਂ ਨੂੰ ਨਾ ਛੂਹੋ।
- ਸੰਭਾਲਣ ਅਤੇ ਨਿਪਟਾਰੇ ਲਈ ਸਹੀ ਪ੍ਰਕਿਰਿਆਵਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।

4. ਅਲਾਰਮ ਦਿਓ
- ਗੈਸ ਲੀਕ, ਅੱਗ ਜਾਂ ਹੋਰ ਖਤਰੇ ਦੀ ਸਥਿਤੀ ਵਿੱਚ ਤੁਰੰਤ ਅਲਾਰਮ ਦਿਓ।
- ਸੁਪਰਵਾਈਜ਼ਰਾਂ ਅਤੇ ਸਾਥੀਆਂ ਨੂੰ ਤੁਰੰਤ ਸੂਚਿਤ ਕਰੋ।

5. ਸ਼ਾਂਤੀ ਨਾਲ ਨਿਕਲੋ
- ਸਥਾਨ ਨੂੰ ਸ਼ਾਂਤੀ ਨਾਲ ਛੱਡੋ ਅਤੇ ਨਿਯਤ ਨਿਕਾਸੀ ਰਾਹ ਦੀ ਪਾਲਣਾ ਕਰੋ।
- ਜੇ ਸੁਰੱਖਿਅਤ ਹੋਵੇ ਤਾਂ ਸਾਥੀਆਂ ਦੀ ਮਦਦ ਕਰੋ।

ਯਾਦ ਰੱਖੋ: ਸਾਵਧਾਨੀ, ਧਿਆਨ ਅਤੇ ਤੇਜ਼ ਕਾਰਵਾਈ ਜੀਵਨ ਬਚਾ ਸਕਦੀ ਹੈ।`,
},

    image: "/images/industrial.jpg",
    quiz: [
      {
        question: {
          en: "What should you first check at workplace?",
          hi: "कार्यस्थल पर सबसे पहले क्या देखना चाहिए?",
          pa: "ਕੰਮ ਵਾਲੀ ਥਾਂ 'ਤੇ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਕੀ ਦੇਖਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Emergency exits", "Cafeteria", "Decoration", "Parking"],
          hi: ["आपातकालीन निकास", "कैफेटेरिया", "सजावट", "पार्किंग"],
          pa: ["ਐਮਰਜੈਂਸੀ ਗੇਟ", "ਕੈਂਟੀਨ", "ਸਜਾਵਟ", "ਪਾਰਕਿੰਗ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "What should workers wear?",
          hi: "मज़दूरों को क्या पहनना चाहिए?",
          pa: "ਮਜ਼ਦੂਰਾਂ ਨੂੰ ਕੀ ਪਾਉਣਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Protective gear", "Casual clothes", "Fashion clothes", "Sports wear"],
          hi: ["सुरक्षात्मक उपकरण", "कैज़ुअल कपड़े", "फैशन कपड़े", "स्पोर्ट्स वियर"],
          pa: ["ਸੁਰੱਖਿਆ ਕੱਪੜੇ", "ਕੈਜ਼ੁਅਲ ਕੱਪੜੇ", "ਫੈਸ਼ਨ ਕੱਪੜੇ", "ਸਪੋਰਟਸ ਕੱਪੜੇ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "What should you NOT touch?",
          hi: "किसे नहीं छूना चाहिए?",
          pa: "ਕੀ ਨਹੀਂ ਛੂਹਣਾ ਚਾਹੀਦਾ?",
        },
        options: {
          en: ["Unknown chemicals", "Safety mask", "Water bottle", "Switch"],
          hi: ["अज्ञात रसायन", "सुरक्षा मास्क", "पानी की बोतल", "स्विच"],
          pa: ["ਅਣਜਾਣ ਰਸਾਇਣ", "ਸੁਰੱਖਿਆ ਮਾਸਕ", "ਪਾਣੀ ਦੀ ਬੋਤਲ", "ਸਵਿੱਚ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "What to do during gas leak?",
          hi: "गैस रिसाव पर क्या करना चाहिए?",
          pa: "ਗੈਸ ਰਿਸਾਅ ਦੌਰਾਨ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Raise alarm", "Ignore it", "Smoke", "Sleep"],
          hi: ["अलार्म बजाना", "अनदेखा करना", "धूम्रपान करना", "सोना"],
          pa: ["ਅਲਾਰਮ ਦੇਣਾ", "ਅਣਡਿੱਠਾ ਕਰਨਾ", "ਧੂਮਰਪਾਨ ਕਰਨਾ", "ਸੌਣਾ"],
        },
        answerIndex: 0,
      },
      {
        question: {
          en: "How should you evacuate?",
          hi: "निकासी कैसे करनी चाहिए?",
          pa: "ਨਿਕਾਸ ਕਿਵੇਂ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
        },
        options: {
          en: ["Calmly, help others", "Push and run", "Hide", "Delay"],
          hi: ["शांतिपूर्वक, दूसरों की मदद करें", "धक्का देकर भागें", "छुपें", "देरी करें"],
          pa: ["ਸ਼ਾਂਤੀ ਨਾਲ, ਹੋਰਾਂ ਦੀ ਮਦਦ ਕਰੋ", "ਧੱਕਾ ਦੇ ਕੇ ਭੱਜੋ", "ਛੁਪੋ", "ਦੇਰੀ ਕਰੋ"],
        },
        answerIndex: 0,
      },
    ],
  },
  {
  id: 7,
  title: { en: "Drought Preparedness", hi: "सूखे से तैयारी", pa: "ਸੂਖੇ ਦੀ ਤਿਆਰੀ" },
  description: {
    en: "Droughts often affect Punjab during dry seasons, reducing water availability and affecting crops.",
    hi: "सूखा अक्सर पंजाब में शुष्क मौसम के दौरान पानी की कमी और फसलों पर असर डालता है।",
    pa: "ਸੂਖਾ ਅਕਸਰ ਪੰਜਾਬ ਵਿੱਚ ਸੁੱਕੇ ਮੌਸਮ ਦੌਰਾਨ ਪਾਣੀ ਦੀ ਘਾਟ ਅਤੇ ਫਸਲਾਂ 'ਤੇ ਪ੍ਰਭਾਵ ਪਾਉਂਦਾ ਹੈ।",
  },
  content: {
    en: `Drought Safety Guidelines:

1. Conserve Water
- Use water sparingly for daily activities.
- Fix leaking taps and pipelines.
- Collect rainwater wherever possible.

2. Agriculture Precautions
- Plant drought-resistant crops.
- Use drip irrigation or water-saving methods.
- Store fodder and grains for livestock.

3. Health and Safety
- Drink safe water; avoid contaminated sources.
- Stay hydrated, especially in hot weather.
- Avoid outdoor activities during peak heat hours.

4. Community Support
- Share resources with neighbors in need.
- Report water shortages to local authorities.
- Participate in community water-saving programs.

Remember: Efficient water use and planning help minimize drought impact.`,

    hi: `सूखा सुरक्षा दिशानिर्देश:

1. पानी बचाएं
- दैनिक गतिविधियों के लिए पानी की बचत करें।
- लीकेज वाले नल और पाइप ठीक करें।
- जहां संभव हो, बारिश का पानी इकट्ठा करें।

2. कृषि सावधानियाँ
- सूखा-प्रतिरोधी फसलें उगाएँ।
- ड्रिप इरिगेशन या पानी बचाने के तरीके अपनाएँ।
- पशुधन के लिए चारा और अनाज संग्रह करें।

3. स्वास्थ्य और सुरक्षा
- सुरक्षित पानी पिएं; संदूषित स्रोतों से बचें।
- हॉट वेदर में हाइड्रेटेड रहें।
- गर्मी के सबसे अधिक समय में बाहर की गतिविधियों से बचें।

4. सामुदायिक सहायता
- जरूरतमंद पड़ोसियों के साथ संसाधन साझा करें।
- स्थानीय अधिकारियों को पानी की कमी की सूचना दें।
- सामुदायिक पानी बचाने वाले कार्यक्रमों में भाग लें।

याद रखें: पानी का सही उपयोग और योजना सूखे के प्रभाव को कम करने में मदद करती है।`,

    pa: `ਸੂਖਾ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਪਾਣੀ ਬਚਾਓ
- ਰੋਜ਼ਾਨਾ ਦੇ ਕੰਮਾਂ ਲਈ ਪਾਣੀ ਦੀ ਬਚਤ ਕਰੋ।
- ਲੀਕ ਹੋ ਰਹੇ ਟੈਪ ਅਤੇ ਪਾਈਪ ਠੀਕ ਕਰੋ।
- ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ, ਬਾਰਿਸ਼ ਦਾ ਪਾਣੀ ਇਕੱਤਰ ਕਰੋ।

2. ਖੇਤੀਬਾੜੀ ਸਾਵਧਾਨੀਆਂ
- ਸੂਖੇ-ਰੋਧੀ ਫਸਲਾਂ ਬੀਜੋ।
- ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਜਾਂ ਪਾਣੀ ਬਚਾਉਣ ਦੇ ਤਰੀਕੇ ਵਰਤੋਂ।
- ਪਸ਼ੂਆਂ ਲਈ ਚਾਰਾ ਅਤੇ ਅਨਾਜ਼ ਸਟੋਰ ਕਰੋ।

3. ਸਿਹਤ ਅਤੇ ਸੁਰੱਖਿਆ
- ਸੁਰੱਖਿਅਤ ਪਾਣੀ ਪੀਓ; ਪ੍ਰਦੂਸ਼ਿਤ ਸਰੋਤਾਂ ਤੋਂ ਬਚੋ।
- ਖਾਸ ਤੌਰ 'ਤੇ ਗਰਮੀ ਵਿੱਚ ਹਾਈਡ੍ਰੇਟ ਰਹੋ।
- ਸਭ ਤੋਂ ਗਰਮ ਸਮੇਂ ਦੌਰਾਨ ਬਾਹਰ ਦੀਆਂ ਸਰਗਰਮੀਆਂ ਤੋਂ ਬਚੋ।

4. ਸਮੂਦਾਇਕ ਸਹਿਯੋਗ
- ਲੋੜਵੰਦ ਪੜੋਸੀਆਂ ਨਾਲ ਸਾਂਝੇ ਰਿਸੋਰਸ ਵਰਤੋ।
- ਪਾਣੀ ਦੀ ਘਾਟ ਦੀ ਸੂਚਨਾ ਸਥਾਨਕ ਅਧਿਕਾਰੀਆਂ ਨੂੰ ਦਿਓ।
- ਸਮੂਦਾਇਕ ਪਾਣੀ ਬਚਾਉਣ ਵਾਲੇ ਪ੍ਰੋਗਰਾਮਾਂ ਵਿੱਚ ਹਿੱਸਾ ਲਵੋ।

ਯਾਦ ਰੱਖੋ: ਪਾਣੀ ਦੀ ਕੁਸ਼ਲ ਵਰਤੋਂ ਅਤੇ ਯੋਜਨਾ ਸੂਖੇ ਦੇ ਪ੍ਰਭਾਵ ਨੂੰ ਘਟਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀ ਹੈ।`,
  },
  image: "/images/drought.jpg",
  quiz: [
    {
      question: {
        en: "What is the first step to save water during drought?",
        hi: "सूखे के दौरान पानी बचाने का पहला कदम क्या है?",
        pa: "ਸੂਖੇ ਦੌਰਾਨ ਪਾਣੀ ਬਚਾਉਣ ਦਾ ਪਹਿਲਾ ਕਦਮ ਕੀ ਹੈ?",
      },
      options: {
        en: ["Use water sparingly", "Ignore leaks", "Waste water", "Plant more grass"],
        hi: ["पानी की बचत करें", "लीक को नजरअंदाज करें", "पानी बर्बाद करें", "अधिक घास लगाएँ"],
        pa: ["ਪਾਣੀ ਦੀ ਬਚਤ ਕਰੋ", "ਲੀਕ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰੋ", "ਪਾਣੀ ਬਰਬਾਦ ਕਰੋ", "ਹੋਰ ਘਾਹ ਲਗਾਓ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "Which type of crops should be planted in drought conditions?",
        hi: "सूखा पड़ने पर किस प्रकार की फसलें लगानी चाहिए?",
        pa: "ਸੂਖੇ ਦੌਰਾਨ ਕਿਸ ਕਿਸਮ ਦੀਆਂ ਫਸਲਾਂ ਬੀਜਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ?",
      },
      options: {
        en: ["Drought-resistant crops", "Water-intensive crops", "Exotic plants", "Flowers only"],
        hi: ["सूखा-प्रतिरोधी फसलें", "जल-गहन फसलें", "विदेशी पौधे", "सिर्फ फूल"],
        pa: ["ਸੂਖਾ-ਰੋਧੀ ਫਸਲਾਂ", "ਪਾਣੀ ਜ਼ਿਆਦਾ ਲੈਣ ਵਾਲੀਆਂ ਫਸਲਾਂ", "ਵਿਦੇਸ਼ੀ ਪੌਦੇ", "ਸਿਰਫ ਫੁੱਲ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "Why is it important to collect rainwater?",
        hi: "बारिश का पानी इकट्ठा करना क्यों महत्वपूर्ण है?",
        pa: "ਬਾਰਿਸ਼ ਦਾ ਪਾਣੀ ਇਕੱਤਰ ਕਰਨਾ ਕਿਉਂ ਜਰੂਰੀ ਹੈ?",
      },
      options: {
        en: ["To increase water availability", "To waste time", "To decorate homes", "To play games"],
        hi: ["पानी की उपलब्धता बढ़ाने के लिए", "समय बर्बाद करने के लिए", "घर सजाने के लिए", "खेल खेलने के लिए"],
        pa: ["ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ ਵਧਾਉਣ ਲਈ", "ਸਮਾਂ ਬਰਬਾਦ ਕਰਨ ਲਈ", "ਘਰ ਸਜਾਉਣ ਲਈ", "ਖੇਡਣ ਲਈ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "What should you avoid during drought?",
        hi: "सूखे के दौरान क्या नहीं करना चाहिए?",
        pa: "ਸੂਖੇ ਦੌਰਾਨ ਕੀ ਨਹੀਂ ਕਰਨਾ ਚਾਹੀਦਾ?",
      },
      options: {
        en: ["Wasting water", "Fixing leaks", "Using drip irrigation", "Sharing water"],
        hi: ["पानी बर्बाद करना", "लीक ठीक करना", "ड्रिप इरिगेशन का उपयोग", "पानी साझा करना"],
        pa: ["ਪਾਣੀ ਬਰਬਾਦ ਕਰਨਾ", "ਲੀਕ ਠੀਕ ਕਰਨਾ", "ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਵਰਤਣਾ", "ਪਾਣੀ ਸਾਂਝਾ ਕਰਨਾ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "How can communities help during drought?",
        hi: "समुदाय सूखे के दौरान कैसे मदद कर सकते हैं?",
        pa: "ਸਮੂਦਾਇ ਸੂਖੇ ਦੌਰਾਨ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਨ?",
      },
      options: {
        en: ["Share resources and report shortages", "Ignore neighbors", "Waste water", "Plant water-intensive crops"],
        hi: ["संसाधन साझा करें और कमी की सूचना दें", "पड़ोसियों की अनदेखी करें", "पानी बर्बाद करें", "जल-गहन फसलें लगाएँ"],
        pa: ["ਸੰਸਾਧਨ ਸਾਂਝੇ ਕਰੋ ਅਤੇ ਘਾਟ ਦੀ ਸੂਚਨਾ ਦਿਓ", "ਪੜੋਸੀਆਂ ਨੂੰ ਨਜ਼ਰਅੰਦਾਜ਼ ਕਰੋ", "ਪਾਣੀ ਬਰਬਾਦ ਕਰੋ", "ਪਾਣੀ ਜ਼ਿਆਦਾ ਲੈਣ ਵਾਲੀਆਂ ਫਸਲਾਂ ਬੀਜੋ"],
      },
      answerIndex: 0,
    },
  ],
},{
  id: 8,
  title: { en: "Landslide Preparedness", hi: "भूस्खलन से तैयारी", pa: "ਭੂਸਖਲਨ ਦੀ ਤਿਆਰੀ" },
  description: {
    en: "Landslides can occur in hilly areas of Punjab during heavy rainfall, posing risks to life and property.",
    hi: "भारी बारिश के दौरान पंजाब के पहाड़ी क्षेत्रों में भूस्खलन हो सकता है, जो जीवन और संपत्ति के लिए खतरा है।",
    pa: "ਭਾਰੀ ਬਾਰਿਸ਼ ਦੌਰਾਨ ਪੰਜਾਬ ਦੇ ਪਹਾੜੀ ਖੇਤਰਾਂ ਵਿੱਚ ਭੂਸਖਲਨ ਹੋ ਸਕਦਾ ਹੈ, ਜੋ ਜੀਵਨ ਅਤੇ ਸੰਪਤੀ ਲਈ ਖ਼ਤਰਾ ਹੈ।",
  },
  content: {
    en: `Landslide Safety Guidelines:

1. Stay Informed
- Monitor weather reports and landslide warnings.
- Follow instructions from local authorities.

2. Home Safety
- Avoid building homes on steep slopes or unstable land.
- Reinforce slopes with retaining walls or vegetation.

3. Evacuation Safety
- Move to higher or safer ground immediately if a landslide occurs.
- Avoid crossing landslide-affected areas.

4. Emergency Kit
- Keep food, water, medicines, flashlight, and first-aid ready.
- Pack important documents in a waterproof bag.

5. During a Landslide
- Do not panic; move quickly but safely.
- Stay away from the landslide path and falling debris.

6. After a Landslide
- Return home only after authorities declare it safe.
- Inspect property carefully before entering.

Remember: Awareness and prompt action can save lives.`,

    hi: `भूस्खलन सुरक्षा दिशानिर्देश:

1. सूचना में रहें
- मौसम रिपोर्ट और भूस्खलन चेतावनियों पर ध्यान दें।
- स्थानीय अधिकारियों के निर्देशों का पालन करें।

2. घर की सुरक्षा
- ढलानों या अस्थिर भूमि पर घर न बनाएं।
- ढलानों को रिटेनिंग वॉल या पेड़-पौधों से मजबूत करें।

3. सुरक्षित निकासी
- भूस्खलन होने पर तुरंत ऊँची या सुरक्षित जगह जाएँ।
- भूस्खलन प्रभावित क्षेत्रों से बचें।

4. आपातकालीन किट
- भोजन, पानी, दवाइयाँ, टॉर्च और प्राथमिक चिकित्सा तैयार रखें।
- महत्वपूर्ण दस्तावेज़ जलरोधी बैग में रखें।

5. भूस्खलन के दौरान
- घबराएँ नहीं; जल्दी लेकिन सुरक्षित तरीके से हटें।
- भूस्खलन पथ और गिरते मलबे से दूर रहें।

6. भूस्खलन के बाद
- अधिकारियों के सुरक्षित कहने तक घर वापस न लौटें।
- घर में प्रवेश करने से पहले संपत्ति का सावधानीपूर्वक निरीक्षण करें।

याद रखें: जागरूकता और त्वरित कार्रवाई जीवन बचा सकती है।`,

    pa: `ਭੂਸਖਲਨ ਸੁਰੱਖਿਆ ਨਿਯਮ:

1. ਜਾਣਕਾਰੀ ਵਿੱਚ ਰਹੋ
- ਮੌਸਮ ਦੀਆਂ ਰਿਪੋਰਟਾਂ ਅਤੇ ਭੂਸਖਲਨ ਚੇਤਾਵਨੀਆਂ ਨੂੰ ਦੇਖੋ।
- ਸਥਾਨਕ ਅਧਿਕਾਰੀਆਂ ਦੇ ਹੁਕਮਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ।

2. ਘਰ ਦੀ ਸੁਰੱਖਿਆ
- ਢਲਾਣਾਂ ਜਾਂ ਅਸਥਿਰ ਜ਼ਮੀਨ 'ਤੇ ਘਰ ਨਾ ਬਣਾਓ।
- ਢਲਾਣਾਂ ਨੂੰ ਰਿਟੇਨਿੰਗ ਵਾਲ ਜਾਂ ਪੌਦਿਆਂ ਨਾਲ ਮਜ਼ਬੂਤ ਕਰੋ।

3. ਸੁਰੱਖਿਅਤ ਨਿਕਾਸੀ
- ਭੂਸਖਲਨ ਹੋਣ 'ਤੇ ਤੁਰੰਤ ਉੱਚੀ ਜਾਂ ਸੁਰੱਖਿਅਤ ਜਗ੍ਹਾ ਤੇ ਜਾਓ।
- ਭੂਸਖਲਨ ਪ੍ਰਭਾਵਿਤ ਖੇਤਰਾਂ ਤੋਂ ਬਚੋ।

4. ਐਮਰਜੈਂਸੀ ਕਿੱਟ
- ਖਾਣਾ, ਪਾਣੀ, ਦਵਾਈਆਂ, ਟਾਰਚ ਅਤੇ ਫਰਸਟ-ਏਡ ਤਿਆਰ ਰੱਖੋ।
- ਮਹੱਤਵਪੂਰਨ ਦਸਤਾਵੇਜ਼ ਵਾਟਰਪ੍ਰੂਫ ਬੈਗ ਵਿੱਚ ਰੱਖੋ।

5. ਭੂਸਖਲਨ ਦੌਰਾਨ
- ਡਰੋ ਨਾ; ਤੇਜ਼ੀ ਨਾਲ ਪਰ ਸੁਰੱਖਿਅਤ ਤਰੀਕੇ ਨਾਲ ਹਟੋ।
- ਭੂਸਖਲਨ ਦੇ ਰਸਤੇ ਅਤੇ ਡਿੱਗਦੇ ਮਲਬੇ ਤੋਂ ਦੂਰ ਰਹੋ।

6. ਭੂਸਖਲਨ ਦੇ ਬਾਅਦ
- ਅਧਿਕਾਰੀਆਂ ਦੇ ਸੁਰੱਖਿਅਤ ਕਹਿਣ ਤੱਕ ਘਰ ਵਾਪਸ ਨਾ ਜਾਓ।
- ਘਰ ਵਿੱਚ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸੰਪਤੀ ਨੂੰ ਧਿਆਨ ਨਾਲ ਜाँचੋ।

ਯਾਦ ਰੱਖੋ: ਸਾਵਧਾਨੀ ਅਤੇ ਤੁਰੰਤ ਕਾਰਵਾਈ ਜ਼ਿੰਦਗੀਆਂ ਬਚਾ ਸਕਦੀ ਹੈ।`,
  },
  image: "/images/landslide.jpg",
  quiz: [
    {
      question: {
        en: "What should you do if a landslide occurs nearby?",
        hi: "अगर आपके पास भूस्खलन हो जाए तो क्या करें?",
        pa: "ਜੇ ਤੁਹਾਡੇ ਕੋਲ ਭੂਸਖਲਨ ਹੋਵੇ ਤਾਂ ਕੀ ਕਰੋ?",
      },
      options: {
        en: ["Move to higher ground", "Stand still", "Run downhill", "Take photos"],
        hi: ["ऊँची जगह जाएँ", "खड़े रहें", "नीचे भागें", "फोटो लें"],
        pa: ["ਉੱਚੀ ਜਗ੍ਹਾ ਤੇ ਜਾਓ", "ਖੜੇ ਰਹੋ", "ਥੱਲੇ ਦੌੜੋ", "ਫੋਟੋ ਲਵੋ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "Where should homes NOT be built to avoid landslides?",
        hi: "भूस्खलन से बचने के लिए घर कहाँ नहीं बनाना चाहिए?",
        pa: "ਭੂਸਖਲਨ ਤੋਂ ਬਚਣ ਲਈ ਘਰ ਕਿੱਥੇ ਨਹੀਂ ਬਣਾਉਣੇ ਚਾਹੀਦੇ?",
      },
      options: {
        en: ["Steep slopes", "Flat land", "Valleys", "Community areas"],
        hi: ["ढलानों पर", "समतल भूमि पर", "घाटियों में", "सामुदायिक क्षेत्रों में"],
        pa: ["ਢਲਾਨਾਂ 'ਤੇ", "ਸਮਤਲ ਜ਼ਮੀਨ 'ਤੇ", "ਵੈਲੀਜ਼ ਵਿੱਚ", "ਸਮੂਦਾਇਕ ਖੇਤਰਾਂ ਵਿੱਚ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "Which item is important in a landslide emergency kit?",
        hi: "भूस्खलन आपातकालीन किट में कौन सा सामान महत्वपूर्ण है?",
        pa: "ਭੂਸਖਲਨ ਐਮਰਜੈਂਸੀ ਕਿੱਟ ਵਿੱਚ ਕਿਹੜਾ ਸਮਾਨ ਜਰੂਰੀ ਹੈ?",
      },
      options: {
        en: ["Flashlight", "Toys", "Paint", "Clothes you won't use"],
        hi: ["टॉर्च", "खिलौने", "पेंट", "अप्रयुक्त कपड़े"],
        pa: ["ਟਾਰਚ", "ਖਿਲੌਣੇ", "ਪੇਂਟ", "ਜਿਹੜੇ ਕੱਪੜੇ ਤੁਸੀਂ ਵਰਤੋਂਗੇ ਨਹੀਂ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "During a landslide, you should:",
        hi: "भूस्खलन के दौरान आपको क्या करना चाहिए?",
        pa: "ਭੂਸਖਲਨ ਦੌਰਾਨ ਤੁਹਾਨੂੰ ਕੀ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ?",
      },
      options: {
        en: ["Stay away from debris", "Stand under trees", "Walk in the path", "Take selfies"],
        hi: ["मलबे से दूर रहें", "पेड़ों के नीचे खड़े रहें", "पथ में चलें", "सेल्फी लें"],
        pa: ["ਮਲਬੇ ਤੋਂ ਦੂਰ ਰਹੋ", "ਦਰੱਖਤਾਂ ਹੇਠਾਂ ਖੜੇ ਰਹੋ", "ਰਸਤੇ ਵਿੱਚ ਤੁਰੋ", "ਸੈਲਫੀ ਲਵੋ"],
      },
      answerIndex: 0,
    },
    {
      question: {
        en: "When can you return home after a landslide?",
        hi: "भूस्खलन के बाद घर कब लौट सकते हैं?",
        pa: "ਭੂਸਖਲਨ ਤੋਂ ਬਾਅਦ ਘਰ ਕਦੋਂ ਵਾਪਸ ਜਾ ਸਕਦੇ ਹੋ?",
      },
      options: {
        en: ["Only after authorities say it's safe", "Immediately", "Next day without checking", "Never"],
        hi: ["केवल जब अधिकारी कहें कि सुरक्षित है", "तुरंत", "बिना जांच अगले दिन", "कभी नहीं"],
        pa: ["ਸਿਰਫ ਅਧਿਕਾਰੀਆਂ ਦੇ ਸੁਰੱਖਿਅਤ ਕਹਿਣ ਤੋਂ ਬਾਅਦ", "ਫੌਰ ਹੀ", "ਅਗਲੇ ਦਿਨ ਬਿਨਾਂ ਜਾਂਚ", "ਕਦੇ ਨਹੀਂ"],
      },
      answerIndex: 0,
    },
  ],
},




];
