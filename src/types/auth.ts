export interface Company {
  masterId: string;
  id: string;
  CompanyHasAccessTo?: any;
}

export interface User {
  id: string;
  driverId?: string;
  companyId?: string;
  sectorId?: string;
  sectorName?: string;
  name: string;
  email?: string;
  password?: string;
  dynamicSector?: boolean
  thirdPartyCompany?: string;
  isMasterOperator?: boolean;
  roleProfileId?: string;
  individualRegistration: string;
  registration?: string;
  accessType: string;
  status: boolean;
  phone: string;
  urlImage?: string | null;
  fileName?: string;
  needToChangePassword?: boolean;
  company: Company;
  createdAt: Date | string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  userId: string;
  driverId?: string;
  urlImage?: string | null;
  user: User;
  company: {
    masterId: string;
    id: string;
  };
  trackingEnabled?: boolean;
}