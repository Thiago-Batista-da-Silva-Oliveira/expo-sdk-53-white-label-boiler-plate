import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { CustomDateTimePicker } from '../src/components/DateTimePicker';
import { lightTheme } from '../src/theme/light';

jest.mock('@react-native-community/datetimepicker', () => {
  return ({ testID, value, onChange, ...props }: any) => {
    const { View, Text } = require('react-native');
    return (
      <View testID={testID}>
        <Text>DateTimePicker Mock</Text>
      </View>
    );
  };
});

jest.mock('date-fns', () => ({
  format: jest.fn((date, formatString) => {
    if (formatString.includes('dd/MM/yyyy HH:mm')) return '15/01/2024 14:30';
    if (formatString.includes('HH:mm')) return '14:30';
    if (formatString.includes('dd/MM/yyyy')) return '15/01/2024';
    return '15/01/2024 14:30';
  }),
}));

jest.mock('date-fns/locale', () => ({
  ptBR: {},
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('CustomDateTimePicker', () => {
  it('DateTimePicker — deve renderizar corretamente', () => {
    const mockChange = jest.fn();
    const testDate = new Date('2024-01-15T14:30:00');
    
    renderWithTheme(
      <CustomDateTimePicker
        label="Test Date"
        value={testDate}
        onChange={mockChange}
        placeholder="Select date"
      />
    );
    
    expect(screen.getByText('Test Date')).toBeTruthy();
    expect(screen.getByText('15/01/2024 14:30')).toBeTruthy();
  });

  it('should render placeholder when no value', () => {
    const mockChange = jest.fn();
    
    renderWithTheme(
      <CustomDateTimePicker
        label="Empty Date"
        onChange={mockChange}
        placeholder="Select date"
      />
    );
    
    expect(screen.getByText('Empty Date')).toBeTruthy();
    expect(screen.getByText('Select date')).toBeTruthy();
  });

  it('should show error message when provided', () => {
    const mockChange = jest.fn();
    
    renderWithTheme(
      <CustomDateTimePicker
        label="Error Date"
        onChange={mockChange}
        error="Date is required"
      />
    );
    
    expect(screen.getByText('Error Date')).toBeTruthy();
    expect(screen.getByText('Date is required')).toBeTruthy();
  });
});