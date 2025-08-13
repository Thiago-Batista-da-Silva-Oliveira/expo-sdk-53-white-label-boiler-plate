import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

interface SocketActions {
  setSocket: (socket: Socket) => void;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
  disconnect: () => void;
}

type SocketStore = SocketState & SocketActions;

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  isConnecting: false,
  error: null,

  setSocket: (socket: Socket) => {
    set({ socket });
  },

  setConnected: (connected: boolean) => {
    set({ isConnected: connected });
  },

  setConnecting: (connecting: boolean) => {
    set({ isConnecting: connecting });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
    set({
      socket: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  },
}));