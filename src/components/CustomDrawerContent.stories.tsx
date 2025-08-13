import type { Meta, StoryObj } from '@storybook/react-native';
// import { action } from '@storybook/addon-ondevice-actions';
const action = (name: string) => () => console.log(`Action: ${name}`);
import React from 'react';
import { View } from 'react-native';
import { CustomDrawerContent } from './CustomDrawerContent';

// Mock das dependências
jest.mock('@/brands', () => ({
  brand: {
    config: {
      name: 'Storybook Brand',
      sidebarLogo: { uri: 'https://via.placeholder.com/80x80.png?text=LOGO' },
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
    clearAuth: action('auth cleared'),
  }),
}));

jest.mock('@react-navigation/drawer', () => ({
  DrawerContentScrollView: ({ children, ...props }: any) => {
    const { ScrollView } = require('react-native');
    return <ScrollView {...props}>{children}</ScrollView>;
  },
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }: any) => {
    const { Text } = require('react-native');
    return <Text {...props} style={{ fontSize: size, color }}>🚪</Text>;
  },
}));

const DrawerWithMockProps = (args: any) => {
  const mockProps = {
    state: {
      index: args.activeIndex || 0,
      routes: [{ name: 'home', key: 'home' }],
    },
    navigation: {
      navigate: action('navigate'),
    },
    descriptors: {},
    ...args,
  };

  return (
    <View style={{ height: 600, width: 320, backgroundColor: '#fff' }}>
      <CustomDrawerContent {...mockProps} />
    </View>
  );
};

const CustomDrawerContentMeta: Meta<typeof CustomDrawerContent> = {
  title: 'Components/CustomDrawerContent',
  component: DrawerWithMockProps,
  argTypes: {
    activeIndex: {
      control: {
        type: 'number',
        min: 0,
        max: 0,
        step: 1,
      },
    },
  },
  args: {
    activeIndex: 0,
  },
};

export default CustomDrawerContentMeta;

type Story = StoryObj<typeof CustomDrawerContentMeta>;

export const Default: Story = {
  args: {
    activeIndex: 0,
  },
};

export const HomeActive: Story = {
  args: {
    activeIndex: 0,
  },
};

// Simulação com diferentes marcas
export const Brand1: Story = {
  render: (args: any) => {
    // Override do mock para Brand 1
    jest.doMock('@/brands', () => ({
      brand: {
        config: {
          name: 'Uber Clone',
          sidebarLogo: { uri: 'https://via.placeholder.com/80x80.png?text=UBER' },
        },
      },
    }));
    
    return <DrawerWithMockProps {...args} />;
  },
  args: {
    activeIndex: 0,
  },
};

export const Brand2: Story = {
  render: (args: any) => {
    // Override do mock para Brand 2
    jest.doMock('@/brands', () => ({
      brand: {
        config: {
          name: '99 Taxi',
          sidebarLogo: { uri: 'https://via.placeholder.com/80x80.png?text=99' },
        },
      },
    }));
    
    return <DrawerWithMockProps {...args} />;
  },
  args: {
    activeIndex: 0,
  },
};

export const LongBrandName: Story = {
  render: (args: any) => {
    jest.doMock('@/brands', () => ({
      brand: {
        config: {
          name: 'Aplicativo de Transporte Premium',
          sidebarLogo: { uri: 'https://via.placeholder.com/80x80.png?text=PREMIUM' },
        },
      },
    }));
    
    return <DrawerWithMockProps {...args} />;
  },
  args: {
    activeIndex: 0,
  },
};

export const ShortBrandName: Story = {
  render: (args: any) => {
    jest.doMock('@/brands', () => ({
      brand: {
        config: {
          name: 'Go',
          sidebarLogo: { uri: 'https://via.placeholder.com/80x80.png?text=GO' },
        },
      },
    }));
    
    return <DrawerWithMockProps {...args} />;
  },
  args: {
    activeIndex: 0,
  },
};

export const WithMultipleMenuItems: Story = {
  render: (args: any) => {
    // Simula múltiplos itens de menu (seria necessário modificar o componente)
    return <DrawerWithMockProps {...args} />;
  },
  args: {
    activeIndex: 0,
  },
};

export const DarkTheme: Story = {
  render: (args: any) => {
    jest.doMock('@/theme', () => ({
      useTheme: () => ({
        primary: { 100: '#1565C0', 500: '#1976D2', 700: '#0D47A1' },
        background: '#121212',
        border: '#333333',
        text: '#ffffff',
        textSecondary: '#aaaaaa',
        error: { 500: '#f44336' },
      }),
    }));
    
    return (
      <View style={{ backgroundColor: '#121212' }}>
        <DrawerWithMockProps {...args} />
      </View>
    );
  },
  args: {
    activeIndex: 0,
  },
};