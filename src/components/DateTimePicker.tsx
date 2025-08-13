import React, { useState } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Container = styled.View`
  margin-bottom: 16px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const DateButton = styled.TouchableOpacity<{ hasError?: boolean }>`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme, hasError }) => hasError ? '#FF6B6B' : theme.primary[300]};
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateText = styled.Text<{ hasValue?: boolean }>`
  font-size: 16px;
  color: ${({ theme, hasValue }) => hasValue ? theme.text : theme.text + '80'};
`;

const ErrorText = styled.Text`
  color: #FF6B6B;
  font-size: 14px;
  margin-top: 4px;
`;

interface DateTimePickerProps {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  error?: string;
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onChange,
  placeholder = 'Selecionar data e hora',
  minimumDate = new Date(),
  maximumDate,
  mode = 'datetime',
  error
}) => {
  const [show, setShow] = useState(false);
  const [currentMode, setCurrentMode] = useState<'date' | 'time' | 'datetime'>(mode);
  const [tempDate, setTempDate] = useState<Date | undefined>(value);

  const handleChange = (event: any, selectedDate?: Date) => {
    if (!event) return;
    
    const { type } = event;
    
    if (Platform.OS === 'android') {
      if (type === 'dismissed') {
        setShow(false);
        setCurrentMode(mode);
        setTempDate(value);
        return;
      }
      
      if (type === 'set' && selectedDate) {
        if (mode === 'datetime') {
          if (currentMode === 'date') {
            // User selected date, now show time picker
            setTempDate(selectedDate);
            setCurrentMode('time');
            return;
          } else if (currentMode === 'time') {
            // User selected time, we're done
            onChange(selectedDate);
            setShow(false);
            setCurrentMode(mode);
            return;
          }
        }
        // For single mode (date or time only)
        onChange(selectedDate);
        setShow(false);
        setCurrentMode(mode);
      }
    } else {
      // iOS behavior
      setShow(Platform.OS === 'ios');
      if (selectedDate) {
        onChange(selectedDate);
      }
    }
  };

  const showDatepicker = () => {
    setCurrentMode(mode === 'datetime' ? 'date' : mode);
    setTempDate(value);
    setShow(true);
  };

  const formatDate = (date: Date) => {
    switch (mode) {
      case 'date':
        return format(date, 'dd/MM/yyyy', { locale: ptBR });
      case 'time':
        return format(date, 'HH:mm', { locale: ptBR });
      case 'datetime':
        return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
      default:
        return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <DateButton onPress={showDatepicker} hasError={!!error}>
        <DateText hasValue={!!value}>
          {value ? formatDate(value) : placeholder}
        </DateText>
        <DateText>📅</DateText>
      </DateButton>
      {error && <ErrorText>{error}</ErrorText>}
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={tempDate || value || new Date()}
          mode={currentMode === 'datetime' ? 'date' : currentMode}
          is24Hour={true}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </Container>
  );
};