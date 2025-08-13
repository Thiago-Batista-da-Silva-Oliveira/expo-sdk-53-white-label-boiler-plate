import { create } from 'zustand';
import { LocationData, Region } from '@/types/location';

interface MapState {
  currentLocation: LocationData | null;
  region: Region | null;
  isLocationLoading: boolean;
  locationPermission: 'granted' | 'denied' | 'undetermined';
  mapType: 'standard' | 'satellite' | 'hybrid';
  showUserLocation: boolean;
  followUserLocation: boolean;
}

interface MapActions {
  setCurrentLocation: (location: LocationData) => void;
  setRegion: (region: Region) => void;
  setLocationLoading: (loading: boolean) => void;
  setLocationPermission: (permission: 'granted' | 'denied' | 'undetermined') => void;
  setMapType: (mapType: 'standard' | 'satellite' | 'hybrid') => void;
  setShowUserLocation: (show: boolean) => void;
  setFollowUserLocation: (follow: boolean) => void;
}

type MapStore = MapState & MapActions;

export const useMapStore = create<MapStore>((set) => ({
  currentLocation: null,
  region: null,
  isLocationLoading: false,
  locationPermission: 'undetermined',
  mapType: 'standard',
  showUserLocation: true,
  followUserLocation: true,

  setCurrentLocation: (location: LocationData) => {
    set({ currentLocation: location });
  },

  setRegion: (region: Region) => {
    set({ region });
  },

  setLocationLoading: (loading: boolean) => {
    set({ isLocationLoading: loading });
  },

  setLocationPermission: (permission: 'granted' | 'denied' | 'undetermined') => {
    set({ locationPermission: permission });
  },

  setMapType: (mapType: 'standard' | 'satellite' | 'hybrid') => {
    set({ mapType });
  },

  setShowUserLocation: (show: boolean) => {
    set({ showUserLocation: show });
  },

  setFollowUserLocation: (follow: boolean) => {
    set({ followUserLocation: follow });
  },
}));