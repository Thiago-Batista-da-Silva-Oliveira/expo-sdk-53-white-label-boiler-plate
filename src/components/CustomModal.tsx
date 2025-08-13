import React from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

const ModalOverlay = styled.View<{ justifyEnd?: boolean }>`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: ${({ justifyEnd }) => justifyEnd ? 'flex-end' : 'center'};
  align-items: center;
  padding: ${({ justifyEnd }) => justifyEnd ? '0px' : '20px'};
`;

const ModalContent = styled.View<{ isSlide?: boolean }>`
  background-color: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-height: 90%;
`;

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: 'slide' | 'fade' | 'none';
  closeOnOverlayPress?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  animationType = 'fade',
  closeOnOverlayPress = true,
}) => {
  const handleOverlayPress = () => {
    if (closeOnOverlayPress) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <ModalOverlay>
            <ModalContent>
              {children}
            </ModalContent>
        </ModalOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
};