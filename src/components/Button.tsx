import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const StyledButton = styled(TouchableOpacity)<{
  variant: 'primary' | 'secondary' | 'outline' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
}>`
  background-color: ${({ theme, variant, disabled }) => {
    if (disabled) return theme.border;
    switch (variant) {
      case 'primary':
        return theme.primary[500];
      case 'secondary':
        return theme.secondary[500];
      case 'outline':
        return 'transparent';
      case 'danger':
        return '#dc3545';
      default:
        return theme.primary[500];
    }
  }};
  border: ${({ theme, variant }) =>
    variant === 'outline' ? `1px solid ${theme.primary[500]}` : 'none'};
  border-radius: 8px;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '8px 16px';
      case 'medium':
        return '12px 24px';
      case 'large':
        return '16px 32px';
      default:
        return '12px 24px';
    }
  }};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '40px';
      case 'medium':
        return '48px';
      case 'large':
        return '56px';
      default:
        return '48px';
    }
  }};
`;

const ButtonText = styled(Text)<{
  variant: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled: boolean;
}>`
  color: ${({ theme, variant, disabled }) => {
    if (disabled) return theme.textSecondary;
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return '#FFFFFF';
      case 'outline':
        return theme.primary[500];
      default:
        return '#FFFFFF';
    }
  }};
  font-size: 16px;
  font-weight: 600;
  margin-left: ${({ children }) => (children ? '8px' : '0px')};
`;

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <StyledButton
      onPress={onPress}
      disabled={isDisabled}
      variant={variant}
      size={size}
      activeOpacity={0.8}
      style={style}
    >
      {loading && <ActivityIndicator size="small" color="#FFFFFF" />}
      <ButtonText variant={variant} disabled={isDisabled}>
        {title}
      </ButtonText>
    </StyledButton>
  );
};