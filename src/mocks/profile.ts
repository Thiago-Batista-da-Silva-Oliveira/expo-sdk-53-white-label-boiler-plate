import { User } from '@/types/auth';

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  urlImage?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

const mockUser: User = {
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
  createdAt: new Date('2024-01-15T10:30:00Z'),
  company: {
    masterId: 'master-1',
    id: 'company-1',
    CompanyHasAccessTo: {}
  },
};

export const profileMock = {
  // GET /me - Get user profile
  GET: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  },

  // PATCH /me - Update user profile
  PATCH: async (data: UpdateProfileData): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update mock user data
    const updatedUser = {
      ...mockUser,
      ...data
    };
    
    // Simulate saving to storage
    Object.assign(mockUser, updatedUser);
    
    return updatedUser;
  },

  // PATCH /me/password - Change password
  CHANGE_PASSWORD: async (data: ChangePasswordData): Promise<{ success: boolean; message: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - in real app this would be more secure
    if (data.currentPassword !== '123456') {
      throw new Error('Senha atual inválida');
    }
    
    if (data.newPassword.length < 6) {
      throw new Error('A nova senha deve ter pelo menos 6 caracteres');
    }
    
    return {
      success: true,
      message: 'Senha alterada com sucesso'
    };
  },

  // PATCH /me/avatar - Update profile photo
  UPDATE_AVATAR: async (imageUri: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate uploading and updating avatar
    const updatedUser = {
      ...mockUser,
      urlImage: imageUri
    };
    
    Object.assign(mockUser, updatedUser);
    
    return updatedUser;
  }
};