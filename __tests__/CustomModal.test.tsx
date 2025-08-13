import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { Text } from 'react-native';
import { CustomModal } from '../src/components/CustomModal';
import { lightTheme } from '../src/theme/light';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('CustomModal', () => {
  it('CustomModal — deve renderizar corretamente', () => {
    const mockClose = jest.fn();
    
    renderWithTheme(
      <CustomModal visible={true} onClose={mockClose}>
        <Text>Modal Content</Text>
      </CustomModal>
    );
    
    expect(screen.getByText('Modal Content')).toBeTruthy();
  });

  it('should not render when visible is false', () => {
    const mockClose = jest.fn();
    
    renderWithTheme(
      <CustomModal visible={false} onClose={mockClose}>
        <Text>Hidden Modal Content</Text>
      </CustomModal>
    );
    
    expect(screen.queryByText('Hidden Modal Content')).toBeFalsy();
  });

  it('should render with different animation types', () => {
    const mockClose = jest.fn();
    
    renderWithTheme(
      <CustomModal visible={true} onClose={mockClose} animationType="slide">
        <Text>Slide Modal</Text>
      </CustomModal>
    );
    
    expect(screen.getByText('Slide Modal')).toBeTruthy();
  });
});