export interface VehicleCategory {
  id: string;
  name: string;
  description?: string;
}

export interface VehicleClass {
  id: string;
  name: string;
  categoryId: string;
  description?: string;
  pricePerKm?: number;
}

export interface Sector {
  id: string;
  name: string;
  description?: string;
}

export interface TripEstimate {
  distance: number;
  duration: string;
  estimatedPrice?: number;
}

export interface AddressSuggestion {
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  formattedAddress: string;
}

export interface Driver {
  id: string;
  name: string;
  licensePlate: string;
  phone?: string;
  rating?: number;
  avatar?: string;
  latitude?: number;
  longitude?: number;
}

export interface Trip {
  id: string;
  driverId?: string;
  joinedTripId?: string;
  clientTripId?: string;
  isJoinedTrip?: boolean;
  requestedById?: string;
  acceptedById?: string;
  refusedById?: string;
  sectorId: string;
  startLat: number;
  finalLat?: number;
  finalLatDriverApp?: string;
  finalLongDriverApp?: string;
  finalLatDriverStc?: string;
  finalLongDriverStc?: string;
  addressStc?: string;
  externalCompany?: string;
  masterId?: string;
  status: string;
  startLong: number;
  vehicleCategoryId?: string;
  vehicleClassId?: string;
  requestedVehicleClassId?: string;
  finalLong?: number;
  recurringTripId?: string;
  refusedTripReason?: string;
  requestedTripReason?: string;
  requestTime?: Date;
  requestDate: Date;
  acceptedAt?: Date;
  initialOdometer?: string;
  finalOdometer?: string;
  manualInitialOdometer?: number;
  manualStartOdometer?: number;
  manualFinalOdometer?: number;
  cityOfOrigin?: string;
  cityOfDestination?: string;
  scheduledDate?: Date;
  type: string;
  licensePlate?: string;
  distance: number;
  distanceInTheCellPhone?: number;
  travelTime: string;
  addressFrom: string;
  addressTo: string;
  companyId: string;
  estimatedDateToFinishTrip?: string;
  renterId: string;
  createdAt?: Date;
  updatedAt?: Date;
  startTripDate?: Date;
  tripFinalDate?: Date;
  hasPendency?: boolean;
  stopPoints?: StopPoint[];
  usersSharingTrip?: UsersSharingTrip[];
  waitingTime?: WaitingTime[];
  driver?: Driver;
  company?: Company;
  sector?: Sector;
  tripPositions?: TripPositions[];
  estimatedDistance?: number;
  vehicleCategory?: VehicleCategory;
  userTripAnswer?: UserTripAnswer;
  requestedBy?: User;
  acceptedBy?: User;
  refusedBy?: User;
  vehicleClass?: VehicleClass;
  requestedVehicleClass?: VehicleClass;
  observation?: string;
  joinedTrip?: any;
  joinedTrips?: any[];
  tripAttachments?: TripAttachments[];
  tripPrice?: TripPrice;
  history?: TripHistory[];
}

export interface StopPoint {
  checked?: boolean;
  tripId?: string;
  order: number;
  lat: number;
  long: number;
  address: string;
  userId: string;
}

export interface MostUsedAddresses {
  id?: string;
  userId: string;
  address: string;
  name: string;
  latitude: number;
  city?: string;
  longitude: number;
  user?: User;
}

export interface Message {
  id?: string;
  receiverId?: string;
  userId?: string;
  driverId?: string;
  tripId?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  senderId?: string;
  user?: User;
  driver?: Driver;
}

export interface IAppointment {
  corporateName: string;
  estimatedPrice: number;
  stopPoints: any;
  distance: number;
  travelTime: string;
  driverId: string;
  id: string;
  masterId: string;
  addressFrom: string;
  recurringTrip: string;
  addressTo: string;
  cityOfOrigin: string;
  cityOfDestination: string;
  users: any;
  vehicleCategoryName: string;
  passenger: string;
  licensePlate: string;
  driver: string;
  date: Date;
  requestedAt: string;
  scheduledDate: string;
  status: string;
  color: string;
  background: string;
}

export interface UsersSharingTrip {}
export interface WaitingTime {}
export interface Company {}
export interface TripPositions {}
export interface UserTripAnswer {}
export interface User {}
export interface TripAttachments {}
export interface TripPrice {}
export interface TripHistory {}