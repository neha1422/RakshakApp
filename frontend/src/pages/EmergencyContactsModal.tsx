import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Phone, Home } from 'lucide-react';
import { EmergencyContact } from '@/hooks/useEmergencyTools';

interface EmergencyContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  onCall: (number: string) => void;
  onCloseAll?: () => void;
}

export function EmergencyContactsModal({ 
  isOpen, 
  onClose, 
  contacts, 
  onCall,
  onCloseAll
}: EmergencyContactsModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleClose = () => {
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

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 emergency-modal-overlay">
      <Card className="glass-card w-full max-w-md max-h-[80vh] overflow-hidden border-0 bg-gradient-to-br from-gray-900 to-gray-800">
        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700 bg-gradient-to-r from-emergency/20 to-emergency/10">
          <CardTitle className="text-white flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            {t("Emergency Contacts")}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBackToDashboard}
              className="hover:bg-emergency/20 text-white"
              title={t("To Dashboard")}
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClose}
              className="hover:bg-emergency/20 text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {contacts.map((contact) => (
              <div 
                key={contact.id} 
                className="flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-white">{contact.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-white">{contact.name}</div>
                    <div className="text-xs text-gray-300">{contact.number}</div>
                  </div>
                </div>
                <Button 
                  variant="emergency" 
                  size="sm"
                  onClick={() => onCall(contact.number)}
                  className="shrink-0 bg-gradient-to-r from-emergency to-emergency-glow text-white"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  {t("Call")}
                </Button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-800/50 border-t border-gray-700">
            <p className="text-xs text-gray-300 text-center">
              {t("Tap To Call")}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 border-gray-600 text-white hover:bg-gray-700"
              onClick={handleBackToDashboard}
            >
              <Home className="h-3 w-3 mr-2" />
              {t("To Dashboard")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}