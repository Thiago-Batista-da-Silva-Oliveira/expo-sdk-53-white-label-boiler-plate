import { useEffect, useState } from 'react';
import { registerPushNotificationAsync } from '@/utils/notifications';
import { useAuthStore } from '@/stores/authStore';

export const useNotificationToken = () => {
  const { user, isAuthenticated, isInitialized } = useAuthStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const registerToken = async () => {
    if (!user?.id || isRegistering) return;

    setIsRegistering(true);
    setRegistrationError(null);

    try {
      const success = await registerPushNotificationAsync(user.id);
      setIsRegistered(success);
      
      if (!success) {
        setRegistrationError('Falha ao registrar token de notificação');
      }
    } catch (error) {
      setRegistrationError('Erro inesperado ao registrar notificações');
      console.error('Erro ao registrar token:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.id && isInitialized && !isRegistered && !isRegistering) {
      registerToken();
    }
  }, [isAuthenticated, user?.id, isInitialized, isRegistered, isRegistering]);

  return {
    isRegistering,
    isRegistered,
    registrationError,
    registerToken,
  };
};