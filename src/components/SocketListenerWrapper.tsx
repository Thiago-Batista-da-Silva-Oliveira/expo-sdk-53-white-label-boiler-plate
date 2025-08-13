import React from 'react';
import { useDefaultSocketListeners } from '@/hooks/useDefaultSocketListeners';

export const SocketListenerWrapper: React.FC = () => {
  useDefaultSocketListeners();
  return null;
};