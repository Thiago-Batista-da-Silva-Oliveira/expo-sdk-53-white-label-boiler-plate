import { LoginCredentials, LoginResponse } from '@/types/auth';

export const sessionMock = {
  POST: async (data: LoginCredentials): Promise<LoginResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (data.email === 'test@example.com' && data.password === '123456') {
      return {
        token: 'fake-jwt-token-12345',
        refreshToken: 'fake-refresh-token-67890',
        userId: 'user-123',
        driverId: 'driver-456',
        urlImage: 'https://via.placeholder.com/150',
        user: {
          id: 'user-123',
          driverId: 'driver-456',
          companyId: 'company-1',
          sectorId: 'sector-1',
          sectorName: 'Setor Centro',
          name: 'Usuário de Teste',
          email: 'test@example.com',
          individualRegistration: '12345678901',
          accessType: 'passenger',
          status: true,
          phone: '+55 11 99999-9999',
          urlImage: 'https://via.placeholder.com/150',
          createdAt: '08/10/2023',
          company: {
            masterId: 'master-1',
            id: 'company-1',
            CompanyHasAccessTo: {}
          }
        },
        company: {
          masterId: 'master-1',
          id: 'company-1'
        },
        trackingEnabled: true
      };
    }
    
    throw new Error('Credenciais inválidas');
  },
};