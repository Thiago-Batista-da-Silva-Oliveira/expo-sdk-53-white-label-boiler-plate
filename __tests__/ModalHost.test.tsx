import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ModalHost } from '../src/components/ModalHost';

jest.mock('@/context/ModalManagerContext', () => ({
  useModalManager: () => ({
    isModalOpen: jest.fn((modalId: string) => modalId === 'test-modal'),
    closeModal: jest.fn(),
  }),
}));

jest.mock('react-native', () => {
  const { View, TouchableOpacity, Modal, Text } = jest.requireActual('react-native');
  return {
    View,
    TouchableOpacity,
    Modal,
    Text,
    StyleSheet: {
      create: (styles: any) => styles,
      flatten: (styles: any) => styles,
    },
    Animated: {
      View,
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        interpolate: jest.fn(() => ({ inputRange: [0, 1], outputRange: [0.3, 1] })),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      parallel: jest.fn(() => ({
        start: jest.fn(),
      })),
    },
  };
});

describe('ModalHost', () => {
  it('ModalHost — deve renderizar corretamente', () => {
    render(
      <ModalHost modalId="test-modal">
        <Text>Modal Content</Text>
      </ModalHost>
    );
    
    expect(screen.getByText('Modal Content')).toBeTruthy();
  });

  it('should not render when modal is not open', () => {
    render(
      <ModalHost modalId="closed-modal">
        <Text>Hidden Content</Text>
      </ModalHost>
    );
    
    expect(screen.queryByText('Hidden Content')).toBeFalsy();
  });

  it('should render with different animation types', () => {
    render(
      <ModalHost modalId="test-modal" animationType="slide">
        <Text>Slide Modal</Text>
      </ModalHost>
    );
    
    expect(screen.getByText('Slide Modal')).toBeTruthy();
  });

  it('should render with backdrop press disabled', () => {
    render(
      <ModalHost modalId="test-modal" closeOnBackdropPress={false}>
        <Text>No Backdrop Close</Text>
      </ModalHost>
    );
    
    expect(screen.getByText('No Backdrop Close')).toBeTruthy();
  });
});