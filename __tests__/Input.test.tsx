import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Input } from '../src/components/Input';
import { lightTheme } from '../src/theme/light';

jest.mock('@/theme', () => ({
  useTheme: () => ({
    text: '#222222',
    textSecondary: '#666666',
    background: '#ffffff',
    border: '#e0e0e0',
    error: { 500: '#dc3545' },
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Input', () => {
  it('Input — deve renderizar corretamente', () => {
    renderWithTheme(
      <Input
        placeholder="Enter text"
        value="Test value"
        onChangeText={jest.fn()}
      />
    );
    
    expect(screen.getByDisplayValue('Test value')).toBeTruthy();
  });

  it('should render with label', () => {
    renderWithTheme(
      <Input
        label="Test Label"
        placeholder="Enter text"
        value=""
        onChangeText={jest.fn()}
      />
    );
    
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('should render with error message', () => {
    renderWithTheme(
      <Input
        placeholder="Enter text"
        value=""
        onChangeText={jest.fn()}
        error="This field is required"
      />
    );
    
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('should render without label and error when not provided', () => {
    renderWithTheme(
      <Input
        placeholder="Enter text"
        value=""
        onChangeText={jest.fn()}
      />
    );
    
    expect(screen.getByPlaceholderText('Enter text')).toBeTruthy();
  });
});