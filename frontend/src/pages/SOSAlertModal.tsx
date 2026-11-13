import { useAuth } from '@/context/AuthContext';
import { create } from '@/lib/cloud';
import { removeRecord } from '@/lib/cloud';
import { useCloud } from '@/hooks/useCloud';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Navigation, AlertTriangle, MapPin, CheckCircle, XCircle, Send } from 'lucide-react';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
  error?: string;
}

interface SOSAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SOSAlertModal({ isOpen, onClose }: SOSAlertModalProps) {
  const { t } = useTranslation();
  const { schoolId } = useAuth();
  const { rows: requests, error: requestsError } = useCloud('sosRequests', true);
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null
  });
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationSent, setLocationSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation();
    }
  }, [isOpen]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t("Location Error"));
      setIsGettingLocation(false);
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);
    setLocationSent(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError(getLocationErrorMessage(error));
        setIsGettingLocation(false);
        setLocation(prev => ({ ...prev, error: getLocationErrorMessage(error) }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const getLocationErrorMessage = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return t("Location Error") + " - Permission denied";
      case error.POSITION_UNAVAILABLE:
        return t("Location Error") + " - Position unavailable";
      case error.TIMEOUT:
        return t("Location Error") + " - Request timeout";
      default:
        return t("Location Error");
    }
  };

  const sendLocationToEmergencyServices = async () => {
    if (!schoolId) { setLocationError('School assignment required.'); return; }
    if (location.latitude === null || location.longitude === null) return;
    setIsGettingLocation(true); setLocationError(null);
    try { await create('sosRequests', schoolId, { latitude: location.latitude, longitude: location.longitude, accuracy: location.accuracy || 0, status: 'pending' }); setLocationSent(true); }
    catch (e) { setLocationError(e.message); }
    finally { setIsGettingLocation(false); }
  };

  const handleClose = () => {
    setIsGettingLocation(false);
    setLocationError(null);
    setLocationSent(false);
    setLocation({
      latitude: null,
      longitude: null,
      accuracy: null,
      timestamp: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-red-600/20 flex items-center justify-center z-50 p-4 emergency-modal-overlay">
      <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
      
      <Card className="glass-card w-full max-w-md max-h-[90vh] overflow-y-auto border-0 relative z-10 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardTitle className="flex items-center text-white">
            <AlertTriangle className="h-6 w-6 mr-2 animate-pulse" />
            {t("SOS Alert")}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClose}
            className="hover:bg-red-400/20 text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 space-y-4">
          {requestsError && <p role="alert">{requestsError}</p>}
          {requests.slice(0, 3).map(r => <div key={r.id} className="text-sm">My school request: {r.status} <button onClick={() => void removeRecord('sosRequests', r.id).catch(e => setLocationError(e.message))}>Delete location record</button></div>)}
          {/* Emergency Alert Message */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
              {locationSent ? "School request recorded" : "Share SOS with your school"}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300">
              {t("Location")}
            </p>
          </div>

          {/* Location Information */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t("Location Status")}:
              </span>
              {isGettingLocation && !locationSent ? (
                <div className="flex items-center text-yellow-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                  {t("Getting Location")}
                </div>
              ) : locationError ? (
                <div className="flex items-center text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  {locationError}
                </div>
              ) : locationSent ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Request saved
                </div>
              ) : (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Location ready
                </div>
              )}
            </div>

            {/* Location Details */}
            {location.latitude !== null && location.longitude !== null && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t("latitude")}:</span>
                  <div className="font-mono font-bold">{location.latitude.toFixed(6)}</div>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">{t("longitude")}:</span>
                  <div className="font-mono font-bold">{location.longitude.toFixed(6)}</div>
                </div>
                {location.accuracy && (
                  <div className="col-span-2">
                    <span className="text-gray-500 dark:text-gray-400">{t("accuracy")}:</span>
                    <div className="font-mono font-bold">
                      ±{location.accuracy.toFixed(1)} {t("meters")}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Send Location Button */}
            {!locationSent && location.latitude !== null && location.longitude !== null && (
              <Button
                variant="emergency"
                onClick={sendLocationToEmergencyServices}
                disabled={isGettingLocation}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send location to school administrator
              </Button>
            )}

            {/* Retry Button for Location Error */}
            {locationError && (
              <Button
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                className="w-full border-red-200 text-red-600 hover:bg-red-50"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Retry Location
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                if (location.latitude !== null && location.longitude !== null) {
                  const url = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
                  window.open(url, '_blank');
                }
              }}
              disabled={location.latitude === null || location.longitude === null}
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Open in Maps
            </Button>
            
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-2" />
              {t("Close Alert")}
            </Button>
          </div>

          {/* Emergency Instructions */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-xs text-yellow-800 dark:text-yellow-200 text-center">
              This sends a private request to your school administrator. It does not dispatch emergency services. In an emergency, call 112.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
