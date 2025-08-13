import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { LoginScreen } from '../src/screens/LoginScreen';
import { lightTheme } from '../src/theme/light';

jest.mock('@/hooks/useAuth', () => ({
  useLogin: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@/brands', () => ({
  brand: {
    config: {
      name: 'Test Brand',
      logo: { uri: 'test-logo.png' },
    },
  },
}));

jest.mock('@/config/env', () => ({
  env: {
    EXPO_PUBLIC_ENVIRONMENT: 'test',
  },
}));

jest.mock('@/schemas/loginSchema', () => ({
  loginSchema: {
    parse: jest.fn(),
  },
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => () => ({})),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (callback: any) => callback,
    formState: {
      errors: {},
      isValid: true,
    },
  }),
  Controller: ({ render }: any) => {
    return render({
      field: {
        onChange: jest.fn(),
        onBlur: jest.fn(),
        value: '',
      },
    });
  },
}));

jest.mock('@/components/Input', () => ({
  Input: ({ label, placeholder, error, ...props }: any) => {
    const { TextInput, Text, View } = require('react-native');
    return (
      <View>
        {label && <Text>{label}</Text>}
        <TextInput placeholder={placeholder} {...props} />
        {error && <Text>{error}</Text>}
      </View>
    );
  },
}));

jest.mock('@/components/Button', () => ({
  Button: ({ title, onPress, loading, ...props }: any) => {
    const { TouchableOpacity, Text } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress} {...props}>
        <Text>{loading ? 'Loading...' : title}</Text>
      </TouchableOpacity>
    );
  },
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('LoginScreen', () => {
  it('LoginScreen — deve renderizar corretamente', () => {
    renderWithTheme(<LoginScreen />);
    
    expect(screen.getByText('Test Brand')).toBeTruthy();
    expect(screen.getByText('Faça login para continuar')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByText('Senha')).toBeTruthy();
    expect(screen.getByText('Entrar')).toBeTruthy();
  });

  it('should show test credentials in test environment', () => {
    renderWithTheme(<LoginScreen />);
    
    expect(screen.getByText('🧪 Credenciais de Teste:')).toBeTruthy();
    expect(screen.getByText(/test@example.com/)).toBeTruthy();
  });

  it('should render form fields correctly', () => {
    renderWithTheme(<LoginScreen />);
    
    expect(screen.getByPlaceholderText('Digite seu login')).toBeTruthy();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeTruthy();
  });
});