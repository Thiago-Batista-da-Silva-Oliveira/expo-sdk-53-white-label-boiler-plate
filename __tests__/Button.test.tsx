import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Button } from '../src/components/Button';
import { lightTheme } from '../src/theme/light';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('Button', () => {
  it('Button — deve renderizar corretamente', () => {
    const mockPress = jest.fn();
    
    renderWithTheme(
      <Button title="Test Button" onPress={mockPress} />
    );
    
    expect(screen.getByText('Test Button')).toBeTruthy();
  });

  it('should render with loading state', () => {
    const mockPress = jest.fn();
    
    renderWithTheme(
      <Button title="Loading Button" onPress={mockPress} loading />
    );
    
    expect(screen.getByText('Loading Button')).toBeTruthy();
  });

  it('should render with different variants', () => {
    const mockPress = jest.fn();
    
    renderWithTheme(
      <Button title="Secondary Button" onPress={mockPress} variant="secondary" />
    );
    
    expect(screen.getByText('Secondary Button')).toBeTruthy();
  });
});