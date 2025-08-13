import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

const Container = styled(View)`
  margin-bottom: 16px;
`;

const Label = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const StyledTextInput = styled(TextInput)<{ hasError: boolean }>`
  border: 1px solid ${({ theme, hasError }) => hasError ? theme.error[500] : theme.border};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.error[500]};
  font-size: 14px;
  margin-top: 4px;
`;

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, containerStyle, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Container style={containerStyle}>
        {label && <Label>{label}</Label>}
        <StyledTextInput
          ref={ref}
          hasError={!!error}
          placeholderTextColor={theme.textSecondary}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }
);