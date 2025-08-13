import type { Meta, StoryObj } from '@storybook/react-native';
// import { action } from '@storybook/addon-ondevice-actions';
const action = (name: string) => () => console.log(`Action: ${name}`);
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';

// Mock do react-native-google-places-autocomplete para o Storybook
jest.mock('react-native-google-places-autocomplete', () => ({
  GooglePlacesAutocomplete: ({ onPress, placeholder, textInputProps }: any) => {
    const { View, TextInput, TouchableOpacity, Text, FlatList } = require('react-native');
    const [text, setText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const mockSuggestions = [
      { description: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP' },
      { description: 'Rua Augusta, 500 - Consolação, São Paulo - SP' },
      { description: 'Praça da Sé, s/n - Sé, São Paulo - SP' },
    ];

    return (
      <View>
        <TextInput
          placeholder={placeholder}
          value={text}
          onChangeText={(value: string) => {
            setText(value);
            setShowSuggestions(value.length > 2);
            textInputProps?.onChangeText?.(value);
          }}
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
          }}
          {...textInputProps}
        />
        {showSuggestions && (
          <FlatList
            data={mockSuggestions.filter(item => 
              item.description.toLowerCase().includes(text.toLowerCase())
            )}
            keyExtractor={(item: { description: string }, index: number) => index.toString()}
            renderItem={({ item }: { item: { description: string } }) => (
              <TouchableOpacity
                style={{
                  padding: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
                onPress={() => {
                  setText(item.description);
                  setShowSuggestions(false);
                  onPress?.({ description: item.description }, {
                    geometry: { location: { lat: -23.5505, lng: -46.6333 } }
                  });
                }}
              >
                <Text>{item.description}</Text>
              </TouchableOpacity>
            )}
            style={{
              maxHeight: 150,
              borderWidth: 1,
              borderColor: '#ddd',
              borderTopWidth: 0,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          />
        )}
      </View>
    );
  },
}));

const GooglePlacesAutocompleteWithState = (args: any) => {
  const [selectedPlace, setSelectedPlace] = useState('');

  return (
    <View style={{ padding: 20 }}>
      <GooglePlacesAutocomplete
        {...args}
        value={selectedPlace}
        onPlaceSelect={(address: string, lat: number, lng: number, city?: string) => {
          setSelectedPlace(address);
          args.onPlaceSelect(address, lat, lng, city);
          Alert.alert('Local Selecionado', `${address}\nLat: ${lat}\nLng: ${lng}\nCidade: ${city}`);
        }}
        onFavoritesPress={() => {
          args.onFavoritesPress();
          Alert.alert('Favoritos', 'Abrir lista de locais favoritos');
        }}
      />
    </View>
  );
};

const GooglePlacesAutocompleteMeta: Meta<typeof GooglePlacesAutocomplete> = {
  title: 'Components/GooglePlacesAutocomplete',
  component: GooglePlacesAutocompleteWithState,
  argTypes: {
    placeholder: {
      control: {
        type: 'text',
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    error: {
      control: {
        type: 'text',
      },
    },
    showCurrentLocationText: {
      control: {
        type: 'boolean',
      },
    },
    onPlaceSelect: {
      action: 'place selected',
    },
    onFavoritesPress: {
      action: 'favorites pressed',
    },
  },
  args: {
    onPlaceSelect: action('place selected'),
    onFavoritesPress: action('favorites pressed'),
  },
};

export default GooglePlacesAutocompleteMeta;

type Story = StoryObj<typeof GooglePlacesAutocompleteMeta>;

export const Default: Story = {
  args: {
    placeholder: 'Digite o endereço',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Endereço de Origem',
    placeholder: 'De onde você está saindo?',
  },
};

export const WithError: Story = {
  args: {
    label: 'Destino',
    placeholder: 'Para onde você vai?',
    error: 'Por favor, selecione um destino',
  },
};

export const PickupLocation: Story = {
  args: {
    label: 'Local de Embarque',
    placeholder: 'Digite o endereço de embarque',
  },
};

export const DropoffLocation: Story = {
  args: {
    label: 'Local de Desembarque',
    placeholder: 'Digite o endereço de destino',
  },
};

export const CurrentLocation: Story = {
  args: {
    label: 'Localização Atual',
    placeholder: 'Localização atual',
    showCurrentLocationText: true,
    value: 'Minha localização atual',
  },
};

export const WorkAddress: Story = {
  args: {
    label: 'Endereço do Trabalho',
    placeholder: 'Digite o endereço do seu trabalho',
  },
};

export const HomeAddress: Story = {
  args: {
    label: 'Endereço de Casa',
    placeholder: 'Digite o endereço da sua casa',
  },
};

export const EventLocation: Story = {
  args: {
    label: 'Local do Evento',
    placeholder: 'Onde será o evento?',
  },
};

export const WithLongLabel: Story = {
  args: {
    label: 'Endereço Completo para Entrega do Produto',
    placeholder: 'Digite o endereço completo incluindo número e complemento',
  },
};