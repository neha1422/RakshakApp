import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, Mic, Flashlight, Siren, Volume2, X } from 'lucide-react';
import { useEmergencyTools, SafetyInstruction } from '@/hooks/useEmergencyTools';
import { EmergencyContactsModal } from './EmergencyContactsModal';
import { VoiceAssistantModal } from './VoiceAssistantModal';
import { SOSAlertModal } from './SOSAlertModal';

export function EmergencyTools() {
  const { t } = useTranslation();
  const [showSOSAlert, setShowSOSAlert] = useState(false);
  
  const {
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
    emergencyContacts,
    stopSiren,
    stopFlashlight
  } = useEmergencyTools();

  const handleSpeakInstruction = (instruction: SafetyInstruction) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance();
      const stepsText = instruction.steps[language].join('. ');
      utterance.text = `${instruction.title[language]}. ${stepsText}`;
      
      const languageConfig = {
        en: 'en-IN',
        hi: 'hi-IN', 
        pa: 'pa-IN'
      };
      
      utterance.lang = languageConfig[language];
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === utterance.lang || 
        voice.lang.startsWith(language)
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        if (language !== 'en') {
          const fallbackUtterance = new SpeechSynthesisUtterance(utterance.text);
          fallbackUtterance.lang = 'en-US';
          fallbackUtterance.rate = 0.8;
          speechSynthesis.speak(fallbackUtterance);
        }
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Enhanced SOS trigger function - REMOVED TELEPHONE CALL
  const handleEmergencySOS = () => {
    // REMOVED: callNumber('112');
    
    // Start siren if not active
    if (!isSirenOn) {
      toggleSiren();
    }
    
    // Start flashlight if not active
    if (!isFlashlightOn) {
      toggleFlashlight();
    }
    
    // Show SOS alert modal with location feature
    setShowSOSAlert(true);
  };

  const closeAllEmergencyFeatures = () => {
    if (isListening) {
      stopListening();
    }
    
    if (isSirenOn) {
      stopSiren();
    }
    
    if (isFlashlightOn) {
      stopFlashlight();
    }
    
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    
    setShowContacts(false);
    setShowVoiceAssistant(false);
    setShowSOSAlert(false);
  };

  return (
    <>
      <Card className="glass-card animate-slide-up-1 border-0 bg-gradient-to-br from-card/80 to-card/60">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center text-emergency text-lg">
            <AlertTriangle className="h-5 w-5 mr-2" />
            {t("Emergency Access")}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={closeAllEmergencyFeatures}
            className="h-8 w-8 p-0 hover:bg-emergency/10"
            title={t("Close All")}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Emergency SOS Button - UPDATED: No telephone call */}
          <Button 
            variant="emergency" 
            className="w-full text-left justify-start h-12 bg-gradient-to-r from-emergency to-emergency-glow hover:from-emergency-glow hover:to-emergency animate-pulse"
            onClick={handleEmergencySOS}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="font-semibold">{t("Emergency SOS")}</span>
          </Button>

          {/* Emergency Contacts */}
          <Button 
            variant="outline" 
            className="w-full text-left justify-start h-12 hover-lift border-muted/50 hover:border-emergency/30"
            onClick={() => setShowContacts(true)}
          >
            <Phone className="h-4 w-4 mr-2" />
            {t("Emergency Contacts")}
          </Button>

          {/* Voice Assistant */}
          <Button 
            variant="outline" 
            className="w-full text-left justify-start h-12 hover-lift border-muted/50 hover:border-emergency/30"
            onClick={() => setShowVoiceAssistant(true)}
          >
            <Mic className="h-4 w-4 mr-2" />
            {t("Voice Assistant")}
          </Button>

          {/* Safety Tools Row */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant={isFlashlightOn ? "emergency" : "outline"}
              className="flex-1 h-10 bg-gradient-to-r from-emergency to-emergency-glow"
              onClick={toggleFlashlight}
            >
              <Flashlight className="h-4 w-4" />
            </Button>
            <Button
              variant={isSirenOn ? "emergency" : "outline"}
              className="flex-1 h-10 bg-gradient-to-r from-emergency to-emergency-glow"
              onClick={toggleSiren}
            >
              <Siren className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 border-muted/50 hover:border-emergency/30"
              onClick={() => setShowVoiceAssistant(true)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Status Indicators */}
          <div className="flex justify-between text-xs text-muted-foreground pt-2">
            <span className={isFlashlightOn ? "text-emergency" : ""}>
              {t("Flashlight")}: {isFlashlightOn ? t("On") : t("Off")}
            </span>
            <span className={isSirenOn ? "text-emergency" : ""}>
              {t("Siren")}: {isSirenOn ? t("On") : t("Off")}
            </span>
          </div>

          {/* Active Features Warning */}
          {(isFlashlightOn || isSirenOn || isListening || showSOSAlert) && (
            <div className="p-2 bg-emergency/10 rounded-lg border border-emergency/20">
              <p className="text-xs text-emergency text-center">
                ⚠️ {t("WARNING!")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <EmergencyContactsModal
        isOpen={showContacts}
        onClose={() => setShowContacts(false)}
        contacts={emergencyContacts}
        onCall={(number) => {
          // Optional: You can keep this for the contacts modal but remove from SOS
          console.log('Calling:', number);
          // window.location.href = `tel:${number}`; // Commented out to prevent telephone calls
        }}
        onCloseAll={closeAllEmergencyFeatures}
      />

      <VoiceAssistantModal
        isOpen={showVoiceAssistant}
        onClose={() => setShowVoiceAssistant(false)}
        isListening={isListening}
        recognizedText={recognizedText}
        matchedInstruction={matchedInstruction}
        language={language}
        onLanguageChange={setLanguage}
        onStartListening={startListening}
        onStopListening={stopListening}
        onSpeakInstruction={handleSpeakInstruction}
        onCloseAll={closeAllEmergencyFeatures}
      />

      {/* SOS Alert Modal - This will handle location sharing only */}
      <SOSAlertModal
        isOpen={showSOSAlert}
        onClose={() => setShowSOSAlert(false)}
      />

      {/* Siren Visual Effect */}
      {isSirenOn && (
        <div className="fixed inset-0 pointer-events-none z-40 animate-siren"></div>
      )}
    </>
  );
}
