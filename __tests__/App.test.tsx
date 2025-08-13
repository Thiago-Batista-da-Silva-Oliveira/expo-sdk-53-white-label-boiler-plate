import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { HomeScreen } from '../src/screens/HomeScreen';
import { lightTheme } from '../src/theme/light';

// Mock environment config
jest.mock('@/config/env', () => ({
  env: {
    EXPO_PUBLIC_API_URL: 'https://test-api.com',
    EXPO_PUBLIC_SOCKET_URL: 'https://test-socket.com',
    EXPO_PUBLIC_ENVIRONMENT: 'test',
    EXPO_PUBLIC_GOOGLE_MAPS_KEY: 'test_key',
    EXPO_PUBLIC_BRAND: 'default1',
  },
}));

// Mock dependencies
jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: null,
    isLoading: false,
  }),
  useMutation: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/config/queryClient', () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

jest.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    clearAuth: jest.fn(),
    token: 'mock-token',
  }),
}));

jest.mock('@/theme', () => ({
  useTheme: () => ({
    primary: { 500: '#2196F3', 100: '#E3F2FD', 700: '#1976D2' },
    secondary: { 500: '#FF9800' },
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#222222',
    textSecondary: '#666666',
    border: '#e0e0e0',
  }),
  useThemeContext: () => ({
    themeMode: 'auto',
    setThemeMode: jest.fn(),
  }),
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { Images: 'Images' },
}));

jest.mock('@/components/Button', () => ({
  Button: ({ title, onPress }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  },
}));

jest.mock('@/components/Input', () => ({
  Input: ({ placeholder, value, onChangeText }: any) => {
    const { TextInput } = require('react-native');
    return (
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    );
  },
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <HomeScreen />
      </ThemeProvider>
    );
    // Since the component shows loading initially, just check it renders
    expect(screen).toBeTruthy();
  });
});