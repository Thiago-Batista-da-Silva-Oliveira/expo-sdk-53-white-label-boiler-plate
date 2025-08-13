import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components/native';
import { loginSchema, LoginFormData } from '@/schemas/loginSchema';
import { useLogin } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { brand } from '@/brands';
import { env } from '@/config/env';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  padding: 24px;
  min-height: 100%;
`;

const Header = styled(View)`
  align-items: center;
  margin-bottom: 48px;
`;

const LogoContainer = styled(View)`
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 20px;
  shadow-color: ${({ theme }) => theme.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

const Logo = styled(Image)`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`;

const BrandName = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary[500]};
  margin-top: 12px;
  text-align: center;
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-top: 8px;
`;

const Form = styled(View)`
  width: 100%;
`;

const TestCredentials = styled(View)`
  margin-top: 32px;
  padding: 16px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const TestTitle = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const TestText = styled(Text)`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 16px;
`;

export const LoginScreen: React.FC = () => {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollContainer
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Content>
            <Header>
              <LogoContainer>
                <Logo source={brand.config.logo} />
                <BrandName>{brand.config.name}</BrandName>
              </LogoContainer>
              <Subtitle>Faça login para continuar</Subtitle>
            </Header>

            <Form>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Login"
                    placeholder="Digite seu login"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry
                    error={errors.password?.message}
                  />
                )}
              />

              <Button
                title="Entrar"
                onPress={handleSubmit(onSubmit)}
                loading={loginMutation.isPending}
                disabled={!isValid}
                size="large"
              />
            </Form>
            {env.EXPO_PUBLIC_ENVIRONMENT === 'test' && (
              <TestCredentials>
                <TestTitle>🧪 Credenciais de Teste:</TestTitle>
                <TestText>
                  Email: test@example.com{'\n'}
                  Senha: 123456{'\n\n'}
                  Use estas credenciais para testar o login com mock
                </TestText>
              </TestCredentials>
            )}
          </Content>
        </ScrollContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};
