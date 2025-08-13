import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { GooglePlacesAutocomplete as RNGooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { env } from '@/config/env';
import { extractCityFromGooglePlaceDetails } from '@/utils/cityExtractor';

const Container = styled.View<{ zIndex: number }>`
  margin-bottom: 16px;
  z-index: ${props => props.zIndex};
  position: relative;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
`;

const AutocompleteWrapper = styled.View<{ zIndex: number }>`
  flex: 1;
  z-index: ${props => props.zIndex};
  position: relative;
  min-width: 0;
`;

const StarButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: ${({ theme }) => theme.primary[100]};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.primary[300]};
  align-items: center;
  justify-content: center;
  min-height: 48px;
  width: 48px;
  z-index: 1;
`;

const StarIcon = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.primary[500]};
`;

const ErrorText = styled.Text`
  color: ${({ theme }) => theme.error[500]};
  font-size: 12px;
  margin-top: 4px;
`;

interface GooglePlacesAutocompleteProps {
  onPlaceSelect: (address: string, latitude: number, longitude: number, city?: string) => void;
  onFavoritesPress: () => void;
  placeholder?: string;
  label?: string;
  error?: string;
  zIndex?: number;
  value?: string;
  showCurrentLocationText?: boolean;
}

export const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = React.memo(({
  onPlaceSelect,
  onFavoritesPress,
  placeholder = 'Digite o endereço',
  label,
  error,
  zIndex = 1,
  value = '',
  showCurrentLocationText = false,
}) => {  
  const theme = useTheme();
  const ref = useRef<any>(null);
  const [listViewDisplayed, setListViewDisplayed] = useState(false);
  const [internalText, setInternalText] = useState(value);
  const lastValueRef = useRef(value);

  useEffect(() => {
    if (value !== lastValueRef.current) {
      lastValueRef.current = value;
      setInternalText(value);
      
      if (ref.current && ref.current.getAddressText() !== value) {
        ref.current.setAddressText(value);
      }
    }
  }, [value]);

  const handlePress = useCallback((data: any, details: any = null) => {
    if (details?.geometry?.location) {
      const { lat, lng } = details.geometry.location;
      const selectedAddress = data.description;
      const city = extractCityFromGooglePlaceDetails(details);
      
      setInternalText(selectedAddress);
      setListViewDisplayed(false);
      
      onPlaceSelect(selectedAddress, lat, lng, city || undefined);
      
      ref.current?.blur();
    } else {
      console.log('❌ No geometry details found');
    }
  }, [onPlaceSelect]);

  const handleTextChange = useCallback((text: string) => {
    setInternalText(text);
    setListViewDisplayed(text.length >= 2);
  }, []);

  const handleFocus = useCallback(() => {
    if (internalText.length >= 2) {
      setListViewDisplayed(true);
    }
  }, [internalText]);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setListViewDisplayed(false);
    }, 150);
  }, []);

  const displayPlaceholder = useMemo(() => 
    showCurrentLocationText && value ? 'Localização atual' : placeholder,
    [showCurrentLocationText, value, placeholder]
  );

  const googlePlacesQuery = useMemo(() => ({
    key: env.EXPO_PUBLIC_GOOGLE_MAPS_KEY || '',
    language: 'pt',
    components: 'country:br',
  }), []);

  const googlePlacesDetailsQuery = useMemo(() => ({
    fields: 'formatted_address,geometry,address_components',
  }), []);

  const textInputProps = useMemo(() => ({
    placeholderTextColor: theme.primary[500],
    autoCorrect: false,
    autoCapitalize: 'none' as const,
    returnKeyType: 'search' as const,
    clearButtonMode: 'while-editing' as const,
    blurOnSubmit: true,
    selectTextOnFocus: false,
    onChangeText: handleTextChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: internalText, 
  }), [theme.primary, handleTextChange, handleFocus, handleBlur, internalText]);

  const autocompleteStyles = useMemo(() => ({
    container: {
      flex: 0,
      zIndex: zIndex + 1000,
      width: '100%',
      position: 'relative' as const,
    },
    textInputContainer: {
      flexDirection: 'row' as const,
      width: '100%',
      backgroundColor: 'transparent',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      paddingHorizontal: 0,
    },
    textInput: {
      backgroundColor: theme.background,
      color: theme.text,
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: error ? theme.error[500] : theme.primary[300],
      height: 48,
      flex: 1,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    },
    poweredContainer: {
      display: 'none' as const,
    },
    powered: {
      display: 'none' as const,
    },
    listView: {
      backgroundColor: theme.background,
      borderRadius: 8,
      borderWidth: 1,
      marginTop: 4,
      maxHeight: 200,
      zIndex: zIndex + 10000,
      elevation: zIndex + 10000,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      right: 0,
      width: '100%',
      display: listViewDisplayed ? 'flex' : 'none',
    },
    row: {
      backgroundColor: theme.background,
      padding: 16,
      minHeight: 56,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      borderWidth: 0,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.primary[100],
      zIndex: 9999,
      elevation: 9999,
      pointerEvents: 'auto' as const,
    },
    separator: {
      height: 0,
    },
    description: {
      fontWeight: '500' as const,
      color: theme.text,
      fontSize: 15,
      flex: 1,
      lineHeight: 20,
    },
    predefinedPlacesDescription: {
      color: theme.primary[700],
    },
  }), [theme, error, zIndex, listViewDisplayed]);

  return (
    <Container zIndex={zIndex}>
      {label && <Label>{label}</Label>}
      
      <InputContainer>
        <AutocompleteWrapper zIndex={zIndex}>
          <RNGooglePlacesAutocomplete
            ref={ref}
            placeholder={displayPlaceholder}
            query={googlePlacesQuery}
            fetchDetails={true}
            enablePoweredByContainer={false}
            suppressDefaultStyles={true}
            keepResultsAfterBlur={false}
            enableHighAccuracyLocation={false}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            predefinedPlaces={[]}
            currentLocation={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            GooglePlacesDetailsQuery={googlePlacesDetailsQuery}
            minLength={2}
            timeout={20000}
            onPress={handlePress}
            onFail={(error) => {
              console.log('Google Places error:', error);
              setListViewDisplayed(false);
            }}
            onNotFound={() => {
              setListViewDisplayed(false);
            }}
            textInputProps={textInputProps}
            styles={autocompleteStyles}
            listEmptyComponent={() => null}
            listViewDisplayed={listViewDisplayed}
            disableScroll={true}
            keyboardShouldPersistTaps="always"
          />
        </AutocompleteWrapper>
        
        <StarButton onPress={onFavoritesPress}>
          <StarIcon>★</StarIcon>
        </StarButton>
      </InputContainer>
      
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
});