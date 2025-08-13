import React from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { ModalHost } from '@/components/ModalHost';
import { useModalManager } from '@/context/ModalManagerContext';

const Container = styled.View`
  align-items: center;
  padding: 16px;
`;

const LottieContainer = styled.View`
  width: 150px;
  height: 150px;
  margin-bottom: 24px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 12px;
`;

const Message = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-bottom: 32px;
  line-height: 22px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.primary[500]};
  padding: 12px 32px;
  border-radius: 8px;
  width: 100%;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const TripFinishedModal: React.FC = () => {
  const { closeModal } = useModalManager();

  const handleClose = () => {
    closeModal('tripFinished');
  };

  return (
    <ModalHost modalId="tripFinished" closeOnBackdropPress={true}>
      <Container>
        <LottieContainer>
          <LottieView
            source={require('@/assets/json/carLottie.json')}
            autoPlay
            loop={false}
            style={{ width: '100%', height: '100%' }}
          />
        </LottieContainer>
        
        <Title>Viagem Finalizada!</Title>
        
        <Message>
          Sua viagem foi finalizada com sucesso. Esperamos que tenha tido uma boa experiência!
        </Message>
        
        <Button onPress={handleClose}>
          <ButtonText>OK</ButtonText>
        </Button>
      </Container>
    </ModalHost>
  );
};