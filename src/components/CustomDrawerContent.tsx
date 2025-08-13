import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { brand } from '@/brands';
import { useTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/authStore';

const Container = styled(DrawerContentScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const HeaderContainer = styled(View)`
  padding: 24px 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
  margin-bottom: 16px;
`;

const LogoContainer = styled(View)`
  align-items: center;
  margin-bottom: 16px;
`;

const Logo = styled(Image)`
  width: 80px;
  height: 80px;
  resize-mode: contain;
  margin-bottom: 12px;
`;

const LogoutContainer = styled(View)`
  padding: 8px;
  border-top-width: 1px;
  margin-top: 16px;
`;

const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin: 4px 0;
  border-radius: 12px;
  background-color: transparent;
`;

const LogoutIconContainer = styled(View)`
  margin-right: 16px;
  width: 24px;
  align-items: center;
`;

const LogoutLabel = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color:'#dc3545';
`;


const BrandName = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary[500]};
  text-align: center;
`;

const WelcomeText = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-top: 4px;
`;

const MenuSection = styled(View)`
  flex: 1;
  padding: 0 8px;
`;

const MenuItemContainer = styled(TouchableOpacity)<{ isActive: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin: 4px 0;
  border-radius: 12px;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.primary[100] : 'transparent'};
`;

const MenuIcon = styled(Text)`
  font-size: 20px;
  margin-right: 16px;
  width: 24px;
  text-align: center;
`;

const MenuLabel = styled(Text)<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, isActive }) => 
    isActive ? theme.primary[700] : theme.text};
`;


const menuItems = [
  { key: 'home', label: 'Home', icon: '⚙️' },
];

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const theme = useTheme();
  const { state, navigation } = props;
  const currentRoute = state.routes[state.index].name;
  const { clearAuth } = useAuthStore();

    const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            clearAuth();
          },
        },
      ]
    );
  };

  return (
    <Container {...props} theme={theme}>
      <HeaderContainer theme={theme}>
        <LogoContainer>
          <Logo source={brand.config.sidebarLogo} />
          <BrandName theme={theme}>{brand.config.name}</BrandName>
          <WelcomeText theme={theme}>Bem-vindo(a)!</WelcomeText>
        </LogoContainer>
      </HeaderContainer>

      <MenuSection>
        {menuItems.map((item) => {
          const isActive = currentRoute === item.key;
          return (
            <MenuItemContainer
              key={item.key}
              isActive={isActive}
              onPress={() => navigation.navigate(item.key)}
              activeOpacity={0.7}
            >
              <MenuIcon>{item.icon}</MenuIcon>
              <MenuLabel isActive={isActive}>
                {item.label}
              </MenuLabel>
            </MenuItemContainer>
          );
        })}
        <LogoutContainer>
        <LogoutButton onPress={handleLogout} activeOpacity={0.7}>
          <LogoutIconContainer>
            <Ionicons name="log-out-outline" size={24} color={theme.error?.[500] || '#dc3545'} />
          </LogoutIconContainer>
          <LogoutLabel >Sair</LogoutLabel>
        </LogoutButton>
        </LogoutContainer>
      </MenuSection>
    </Container>
  );
};