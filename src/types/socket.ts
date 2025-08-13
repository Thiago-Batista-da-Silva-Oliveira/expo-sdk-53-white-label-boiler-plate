export interface ITripAcceptedByDriver {
  driverName: string;
  licensePlate: string;
}

export interface IDriverPosition {
  latitude: number;
  longitude: number;
  direction: number;
}

export interface ITripSocketMessage {
  tripId?: string;
  message?: string;
  data?: any;
}