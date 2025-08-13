export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationData extends Coordinates {
  timestamp: number;
  accuracy?: number;
  heading?: number;
  speed?: number;
}

export interface Region extends Coordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}