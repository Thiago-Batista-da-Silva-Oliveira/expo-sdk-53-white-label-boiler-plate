import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
}

interface UseCurrentLocationReturn {
  currentLocation: LocationData | null;
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean;
  refreshLocation: () => void;
}

export const useCurrentLocation = (): UseCurrentLocationReturn => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  
  const hasInitialized = useRef(false);
  const isExecuting = useRef(false);

  const reverseGeocode = useCallback(async (latitude: number, longitude: number): Promise<{ address: string; city?: string }> => {
    try {
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (result && result.length > 0) {
        const locationInfo = result[0];
        
        const addressParts: string[] = [];
        
        if (locationInfo.street) {
          if (locationInfo.streetNumber) {
            addressParts.push(`${locationInfo.street}, ${locationInfo.streetNumber}`);
          } else {
            addressParts.push(locationInfo.street);
          }
        }
        
        if (locationInfo.district) {
          addressParts.push(locationInfo.district);
        }
        
        const city = locationInfo.city || locationInfo.subregion || locationInfo.region;
        if (city) {
          addressParts.push(city);
        }
        
        if (locationInfo.region && locationInfo.region !== city) {
          addressParts.push(locationInfo.region);
        }
        
        if (locationInfo.postalCode) {
          addressParts.push(`CEP ${locationInfo.postalCode}`);
        }
        
        if (locationInfo.country) {
          addressParts.push(locationInfo.country);
        }
        
        const address = addressParts.filter(part => part?.trim()).join(', ');
        
        return { 
          address: address || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`, 
          city: city || undefined 
        };
      }
      return { address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` };
    } catch (error) {
      console.error('Erro ao fazer geocodificação reversa:', error);
      return { address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` };
    }
  }, []);

  const getCurrentLocation = useCallback(async (force: boolean = false) => {
    if (isExecuting.current) {
      console.log('getCurrentLocation já está executando, ignorando...');
      return;
    }

    if (hasInitialized.current && !force) {
      console.log('getCurrentLocation já foi executado, ignorando...');
      return;
    }

    console.log('Iniciando getCurrentLocation...');
    isExecuting.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setHasPermission(false);
        setError('Permissão de localização negada');
        return;
      }

      setHasPermission(true);

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1,
      });

      const { address, city } = await reverseGeocode(location.coords.latitude, location.coords.longitude);
      
      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address,
        city,
      };

      setCurrentLocation(locationData);
      hasInitialized.current = true;
      
      console.log('getCurrentLocation concluído com sucesso:', locationData);

    } catch (err: any) {
      console.error('Erro ao obter localização:', err);
      setError(err.message || 'Erro ao obter localização');
    } finally {
      setIsLoading(false);
      isExecuting.current = false;
    }
  }, [reverseGeocode]);

  const refreshLocation = useCallback(() => {
    hasInitialized.current = false;
    getCurrentLocation(true);
  }, [getCurrentLocation]);

  useEffect(() => {
    if (!hasInitialized.current && !isExecuting.current) {
      getCurrentLocation();
    }
  }, []); 

  return {
    currentLocation,
    isLoading,
    error,
    hasPermission,
    refreshLocation,
  };
};