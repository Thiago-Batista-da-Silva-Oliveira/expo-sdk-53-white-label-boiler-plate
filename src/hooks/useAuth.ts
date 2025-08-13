import { useMutation } from '@tanstack/react-query';
import { api } from '@/api/apiClient';
import { useAuthStore } from '@/stores/authStore';
import { useNotification } from '@/context/NotificationContext';
import { LoginCredentials, LoginResponse } from '@/types/auth';

export const useLogin = () => {
  const { setAuth, setLoading } = useAuthStore();
  const { notify } = useNotification();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      setLoading(true);
      try {
        const response = await api.post('/session/mobile', credentials);
        return response
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    onSuccess: (data: LoginResponse) => {
      const { user, token, refreshToken } = data;
            
      setAuth(user, { token, refreshToken });
      
      notify.success(`Bem-vindo, ${user.name}!`, 'Login realizado');
    },
    onError: (error: Error) => {
      console.error('Erro no login:', error.message);
      
      let errorMessage = 'Erro interno do servidor';
      
      if (error.message.includes('Credenciais inválidas')) {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      }
      
      notify.error(errorMessage, 'Erro no login');
    },
  });
};

export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const { notify } = useNotification();

  const logout = () => {
    clearAuth();
    notify.info('Você foi desconectado', 'Logout');
  };

  return { logout };
};