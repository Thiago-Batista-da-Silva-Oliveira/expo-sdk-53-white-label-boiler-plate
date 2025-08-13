import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import { GooglePlacesAutocomplete } from '../src/components/GooglePlacesAutocomplete';
import { lightTheme } from '../src/theme/light';

jest.mock('@/config/env', () => ({
  env: {
    EXPO_PUBLIC_GOOGLE_MAPS_KEY: 'test_key',
  },
}));

jest.mock('@/utils/cityExtractor', () => ({
  extractCityFromGooglePlaceDetails: jest.fn(() => 'Test City'),
}));

jest.mock('react-native-google-places-autocomplete', () => ({
  GooglePlacesAutocomplete: ({ placeholder }: any) => {
    const { View, TextInput, Text } = require('react-native');
    return (
      <View testID="google-places-autocomplete">
        <TextInput 
          placeholder={placeholder}
          testID="places-input"
        />
        <Text>Places Autocomplete Mock</Text>
      </View>
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

describe('GooglePlacesAutocomplete', () => {
  it('GooglePlaceAutocomplete — deve renderizar corretamente', () => {
    const mockPlaceSelect = jest.fn();
    const mockFavoritesPress = jest.fn();
    
    renderWithTheme(
      <GooglePlacesAutocomplete
        onPlaceSelect={mockPlaceSelect}
        onFavoritesPress={mockFavoritesPress}
        label="Test Location"
        placeholder="Enter address"
      />
    );
    
    expect(screen.getByText('Test Location')).toBeTruthy();
    expect(screen.getByTestId('google-places-autocomplete')).toBeTruthy();
    expect(screen.getByText('★')).toBeTruthy();
  });

  it('should render with error message', () => {
    const mockPlaceSelect = jest.fn();
    const mockFavoritesPress = jest.fn();
    
    renderWithTheme(
      <GooglePlacesAutocomplete
        onPlaceSelect={mockPlaceSelect}
        onFavoritesPress={mockFavoritesPress}
        error="Location is required"
      />
    );
    
    expect(screen.getByText('Location is required')).toBeTruthy();
  });

  it('should render without label when not provided', () => {
    const mockPlaceSelect = jest.fn();
    const mockFavoritesPress = jest.fn();
    
    renderWithTheme(
      <GooglePlacesAutocomplete
        onPlaceSelect={mockPlaceSelect}
        onFavoritesPress={mockFavoritesPress}
      />
    );
    
    expect(screen.getByTestId('google-places-autocomplete')).toBeTruthy();
    expect(screen.getByText('★')).toBeTruthy();
  });
});