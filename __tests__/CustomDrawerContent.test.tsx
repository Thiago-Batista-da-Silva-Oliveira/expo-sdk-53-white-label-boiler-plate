import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { CustomDrawerContent } from '../src/components/CustomDrawerContent';
import { lightTheme } from '../src/theme/light';

jest.mock('@/brands', () => ({
  brand: {
    config: {
      name: 'Test Brand',
      sidebarLogo: { uri: 'test-logo.png' },
    },
  },
}));

jest.mock('@/theme', () => ({
  useTheme: () => ({
    primary: { 100: '#E3F2FD', 500: '#2196F3', 700: '#1976D2' },
    background: '#ffffff',
    border: '#e0e0e0',
    text: '#222222',
    textSecondary: '#666666',
    error: { 500: '#dc3545' },
  }),
}));

jest.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    clearAuth: jest.fn(),
  }),
}));

jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children, ...props }: any) => {
    const { View } = require('react-native');
    return <View {...props}>{children}</View>;
  },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props}>Icon: {name}</Text>;
  },
}));

const mockDrawerProps = {
  state: {
    index: 0,
    routes: [{ name: 'home', key: 'home' }],
  },
  navigation: {
    navigate: jest.fn(),
  },
  descriptors: {},
} as any;

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('CustomDrawerContent', () => {
  it('CustomDrawerContent — deve renderizar corretamente', () => {
    renderWithTheme(
      <CustomDrawerContent {...mockDrawerProps} />
    );
    
    expect(screen.getByText('Test Brand')).toBeTruthy();
    expect(screen.getByText('Bem-vindo(a)!')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Sair')).toBeTruthy();
  });
});