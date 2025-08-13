import { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export const useAuthNavigation = () => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [canNavigate, setCanNavigate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitialized || !canNavigate) return;

    const inAuthGroup = segments[0] === '(auth)';

    try {
      if (!isAuthenticated && !inAuthGroup) {
        router.replace('/login');
      } else if (isAuthenticated && inAuthGroup) {
        router.replace('/(drawer)/home');
      }
    } catch (error) {
      console.warn('Erro na navegação de autenticação:', error);
    }
  }, [isAuthenticated, segments, router, isInitialized, canNavigate]);

  return {
    isNavigationReady: isInitialized,
    isAuthenticated,
  };
};