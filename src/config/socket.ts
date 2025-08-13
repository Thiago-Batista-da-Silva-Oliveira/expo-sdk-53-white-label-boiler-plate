import { io, Socket } from 'socket.io-client';
import { env } from '@/config/env';

let socket: Socket | null = null;

export const createSocket = (userId?: string): Socket => {
  if (socket) {
    socket.disconnect();
  }

  socket = io(env.EXPO_PUBLIC_SOCKET_URL, {
    transports: ['websocket'],
    auth: {
      userId,
    },
    query: {
      user_id: userId,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  return socket;
};

export const getSocket = (): Socket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};