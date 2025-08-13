import type { Meta, StoryObj } from '@storybook/react-native';
// import { action } from '@storybook/addon-ondevice-actions';
const action = (name: string) => () => console.log(`Action: ${name}`);
import React, { useState } from 'react';
import { View } from 'react-native';
import { CustomDateTimePicker } from './DateTimePicker';

// Mock the DateTimePicker for Storybook
jest.mock('@react-native-community/datetimepicker', () => {
  return ({ value, onChange, mode }: any) => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return (
      <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 }}>
        <Text>DateTimePicker Mock ({mode})</Text>
        <TouchableOpacity 
          onPress={() => onChange?.({ type: 'set' }, new Date())}
          style={{ marginTop: 5, padding: 5, backgroundColor: '#007AFF', borderRadius: 4 }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Selecionar Data</Text>
        </TouchableOpacity>
      </View>
    );
  };
});

const DateTimePickerWithState = (args: any) => {
  const [value, setValue] = useState<Date | undefined>(args.value);

  return (
    <View style={{ padding: 20 }}>
      <CustomDateTimePicker
        {...args}
        value={value}
        onChange={(date: Date) => {
          setValue(date);
          args.onChange(date);
        }}
      />
    </View>
  );
};

const DateTimePickerMeta: Meta<typeof CustomDateTimePicker> = {
  title: 'Components/DateTimePicker',
  component: DateTimePickerWithState,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    mode: {
      control: {
        type: 'select',
      },
      options: ['date', 'time', 'datetime'],
    },
    error: {
      control: {
        type: 'text',
      },
    },
    onChange: {
      action: 'date changed',
    },
  },
  args: {
    onChange: action('date changed'),
  },
};

export default DateTimePickerMeta;

type Story = StoryObj<typeof DateTimePickerMeta>;

export const Default: Story = {
  args: {
    label: 'Data e Hora',
    placeholder: 'Selecionar data e hora',
  },
};

export const DateOnly: Story = {
  args: {
    label: 'Data de Nascimento',
    placeholder: 'Selecionar data',
    mode: 'date',
  },
};

export const TimeOnly: Story = {
  args: {
    label: 'Horário',
    placeholder: 'Selecionar horário',
    mode: 'time',
  },
};

export const DateTime: Story = {
  args: {
    label: 'Data e Hora do Agendamento',
    placeholder: 'Selecionar data e hora',
    mode: 'datetime',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Data Selecionada',
    placeholder: 'Selecionar data',
    mode: 'date',
    value: new Date('2024-12-25'),
  },
};

export const WithError: Story = {
  args: {
    label: 'Data Obrigatória',
    placeholder: 'Selecionar data',
    error: 'Data é obrigatória',
    mode: 'date',
  },
};

export const AppointmentDateTime: Story = {
  args: {
    label: 'Agendamento',
    placeholder: 'Selecionar data e horário do agendamento',
    mode: 'datetime',
    minimumDate: new Date(),
  },
};

export const BirthDate: Story = {
  args: {
    label: 'Data de Nascimento',
    placeholder: 'Selecionar data de nascimento',
    mode: 'date',
    maximumDate: new Date(),
  },
};

export const WorkingHours: Story = {
  args: {
    label: 'Horário de Trabalho',
    placeholder: 'Selecionar horário',
    mode: 'time',
  },
};

export const EventDateTime: Story = {
  args: {
    label: 'Data e Hora do Evento',
    placeholder: 'Quando será o evento?',
    mode: 'datetime',
    value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Uma semana a partir de hoje
  },
};