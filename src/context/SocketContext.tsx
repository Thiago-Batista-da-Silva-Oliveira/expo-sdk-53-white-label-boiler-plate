import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { createSocket, disconnectSocket } from '@/config/socket';
import { useSocketStore } from '@/stores/socketStore';
import { useAuthStore } from '@/stores/authStore';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  const {
    socket,
    isConnected,
    isConnecting,
    error,
    setSocket,
    setConnected,
    setConnecting,
    setError,
    disconnect: storeDisconnect,
  } = useSocketStore();

  const connect = () => {
    if (!isAuthenticated || !user) {
      setError('Usuário não autenticado');
      return;
    }

    if (socket?.connected) {
      return;
    }

    setConnecting(true);
    setError(null);

    try {
      const newSocket = createSocket(user.id);
      setSocket(newSocket);

      newSocket.on('connect', () => {
        setConnected(true);
        setConnecting(false);
        setError(null);
      });

      newSocket.on('disconnect', () => {
        setConnected(false);
        setConnecting(false);
      });

      newSocket.on('connect_error', (error) => {
        setConnected(false);
        setConnecting(false);
        setError(error.message);
      });

    } catch (error) {
      setConnecting(false);
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const disconnect = () => {
    disconnectSocket();
    storeDisconnect();
  };

  useEffect(() => {
    if (isAuthenticated && user?.id && !socket) {
      connect();
    }

    if (!isAuthenticated && socket) {
      disconnect();
    }

    return () => {
      if (socket) {
        disconnect();
      }
    };
  }, [isAuthenticated, user?.id]);

  const contextValue: SocketContextType = {
    socket,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};