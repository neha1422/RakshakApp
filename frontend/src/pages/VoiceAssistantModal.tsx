import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Mic, MicOff, Volume2, AlertTriangle, Languages, Home, Play } from 'lucide-react';
import { SafetyInstruction } from '@/hooks/useEmergencyTools';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  isListening: boolean;
  recognizedText: string;
  matchedInstruction: SafetyInstruction | null;
  language: 'en' | 'hi' | 'pa';
  onLanguageChange: (lang: 'en' | 'hi' | 'pa') => void;
  onStartListening: () => void;
  onStopListening: () => void;
  onSpeakInstruction: (instruction: SafetyInstruction) => void;
  onCloseAll?: () => void;
}

export function VoiceAssistantModal({
  isOpen,
  onClose,
  isListening,
  recognizedText,
  matchedInstruction,
  language,
  onLanguageChange,
  onStartListening,
  onStopListening,
  onSpeakInstruction,
  onCloseAll
}: VoiceAssistantModalProps) {
  const { t } = useTranslation();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  // Clean up speech when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const handleClose = () => {
    // Stop speaking and listening when closing
    if (isSpeaking) {
      stopSpeaking();
    }
    if (isListening) {
      onStopListening();
    }
    onClose();
    if (onCloseAll) {
      onCloseAll();
    }
  };

  const handleBackToDashboard = () => {
    if (onCloseAll) {
      onCloseAll();
    }
    onClose();
  };

  // Enhanced TTS function with proper language support
  const speakText = (text: string, lang: 'en' | 'hi' | 'pa') => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any ongoing speech
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance();
    
    // Set text and language
    utterance.text = text;
    
    // Configure language based on selection with proper language codes
    const languageConfig = {
      en: { code: 'en-IN', voiceName: 'Google UK English Female' },
      hi: { code: 'hi-IN', voiceName: 'Google हिन्दी' },
      pa: { code: 'pa-IN', voiceName: null } // Punjabi might not have specific voice
    };

    const config = languageConfig[lang];
    utterance.lang = config.code;
    
    // Try to find appropriate voice
    const voices = speechSynthesis.getVoices();
    let preferredVoice = voices.find(voice => 
      voice.lang === config.code || 
      voice.lang.startsWith(config.code.split('-')[0])
    );

    if (config.voiceName) {
      preferredVoice = voices.find(voice => 
        voice.name.includes(config.voiceName!) || 
        voice.lang === config.code
      ) || preferredVoice;
    }

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Configure speech properties
    utterance.rate = 0.8;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeech(utterance);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeech(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setCurrentSpeech(null);
      
      // Fallback: Try with default language if specific language fails
      if (lang !== 'en') {
        console.log('Trying English fallback...');
        const fallbackUtterance = new SpeechSynthesisUtterance(text);
        fallbackUtterance.lang = 'en-US';
        fallbackUtterance.rate = 0.8;
        speechSynthesis.speak(fallbackUtterance);
      }
    };

    // Speak the text
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeech(null);
    }
  };

  const handleSpeakInstruction = (instruction: SafetyInstruction, lang: 'en' | 'hi' | 'pa') => {
    const title = instruction.title[lang];
    const steps = instruction.steps[lang].join('. ');
    const fullText = `${title}. ${steps}`;
    speakText(fullText, lang);
  };

  const handleSpeakWelcomeMessage = () => {
    const welcomeMessages = {
      en: "Emergency voice assistant activated. Say earthquake, fire, flood, or chemical for safety instructions.",
      hi: "आपातकालीन वॉयस सहायक सक्रिय। सुरक्षा निर्देशों के लिए भूकंप, आग, बाढ़, या रासायनिक कहें।",
      pa: "ਐਮਰਜੈਂਸੀ ਵੌਇਸ ਅਸਿਸਟੈਂਟ ਸਰਗਰਮ ਹੈ। ਸੁਰੱਖਿਆ ਨਿਰਦੇਸ਼ਾਂ ਲਈ ਭੂਚਾਲ, ਅੱਗ, ਹੜ੍ਹ, ਜਾਂ ਰਸਾਇਣਕ ਕਹੋ।"
    };
    speakText(welcomeMessages[language], language);
  };

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Some browsers need this to populate voices
      const voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
          console.log('Voices loaded:', speechSynthesis.getVoices().map(v => `${v.name} (${v.lang})`));
        });
      } else {
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
      }
    }
  }, []);

  // Auto-speak when instruction is matched
  useEffect(() => {
    if (matchedInstruction && isOpen) {
      // Small delay to allow modal to open
      setTimeout(() => {
        handleSpeakInstruction(matchedInstruction, language);
      }, 500);
    }
  }, [matchedInstruction, isOpen, language]);

  const languageNames = {
    en: t("English"),
    hi: t("Hindi"), 
    pa: t("Punjabi")
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 emergency-modal-overlay">
      <Card className="glass-card w-full max-w-md max-h-[80vh] overflow-hidden border-0">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-emergency/10 to-emergency/5">
          <CardTitle className="text-emergency flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {t("Emergency Voice Assistant")}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToDashboard}
              className="hover:bg-emergency/10"
              title={t("Back To Dashboard")}
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              className="hover:bg-emergency/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-2 bg-muted/20 p-3 rounded-lg">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t("Language")}:</span>
            <div className="flex space-x-1 ml-auto">
              {(['en', 'hi', 'pa'] as const).map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => onLanguageChange(lang)}
                  className="text-xs h-8 px-2"
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {/* Voice Control */}
          <div className="text-center space-y-4 p-4 bg-gradient-to-br from-muted/10 to-muted/5 rounded-lg">
            <div className="flex justify-center space-x-4">
              <Button
                variant={isListening ? "emergency" : "default"}
                size="lg"
                className={`rounded-full w-16 h-16 p-0 ${
                  isListening ? 'listening' : ''
                } bg-gradient-to-r from-emergency to-emergency-glow`}
                onClick={isListening ? onStopListening : onStartListening}
              >
                {isListening ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>
              
              <Button
                variant={isSpeaking ? "emergency" : "default"}
                size="lg"
                className={`rounded-full w-16 h-16 p-0 ${
                  isSpeaking ? 'animate-pulse' : ''
                } bg-gradient-to-r from-blue-500 to-blue-600`}
                onClick={isSpeaking ? stopSpeaking : handleSpeakWelcomeMessage}
                disabled={isListening}
              >
                {isSpeaking ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <Play className="h-6 w-6 ml-1" />
                )}
              </Button>
            </div>
            
            <div>
              <p className="text-sm font-medium">
                {isListening ? t("emergency.listening") : 
                 isSpeaking ? "Speaking..." : t("Tap To Speak")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("Current Language")}: {languageNames[language]}
              </p>
            </div>
          </div>

          {/* Recognized Text */}
          {recognizedText && (
            <div className="p-3 bg-muted/20 rounded-lg border">
              <p className="text-sm font-medium">{t("Heard")}: "{recognizedText}"</p>
            </div>
          )}

          {/* Matched Instructions */}
          {matchedInstruction && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4 animate-slide-up">
              <h4 className="font-semibold text-success mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                {matchedInstruction.title[language]}
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                {matchedInstruction.steps[language].map((step: string, index: number) => (
                  <li key={index} className="pl-2 text-foreground/80">{step}</li>
                ))}
              </ol>
              
              {/* Multi-language Speak Buttons */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {(['en', 'hi', 'pa'] as const).map((lang) => (
                  <Button
                    key={lang}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpeakInstruction(matchedInstruction, lang)}
                    className="bg-success/5 border-success/20 hover:bg-success/10 text-xs"
                    disabled={isSpeaking}
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    {lang.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Commands Hint */}
          <div className="text-center p-3 bg-muted/10 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              {t("Try Saying")}:
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {['earthquake', 'fire', 'flood', 'chemical', 'medical'].map((cmd) => (
                <span key={cmd} className="text-xs bg-emergency/10 text-emergency px-2 py-1 rounded">
                  {cmd}
                </span>
              ))}
            </div>
          </div>

          {/* Voice Status */}
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-300">
              {isSpeaking ? "🔊 Speaking instructions..." : 
               isListening ? "🎤 Listening for commands..." :
               "💡 Tap the play button to hear welcome message"}
            </p>
          </div>

          {/* Back to Dashboard Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleBackToDashboard}
          >
            <Home className="h-3 w-3 mr-2" />
            {t("Back To Dashboard")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}