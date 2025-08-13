import type { Meta, StoryObj } from '@storybook/react-native';
// import { action } from '@storybook/addon-ondevice-actions';
const action = (name: string) => () => console.log(`Action: ${name}`);
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { CustomModal } from './CustomModal';
import { Button } from './Button';

const ModalWithState = (args: any) => {
  const [visible, setVisible] = useState(args.visible);

  return (
    <View style={{ padding: 20 }}>
      <Button
        title="Abrir Modal"
        onPress={() => setVisible(true)}
      />
      <CustomModal
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
          args.onClose();
        }}
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            {args.title || 'Modal Title'}
          </Text>
          <Text style={{ marginBottom: 20 }}>
            {args.content || 'Este é o conteúdo do modal. Você pode colocar qualquer conteúdo aqui.'}
          </Text>
          <Button
            title="Fechar"
            onPress={() => {
              setVisible(false);
              args.onClose();
            }}
          />
        </View>
      </CustomModal>
    </View>
  );
};

const CustomModalMeta: Meta<typeof CustomModal> = {
  title: 'Components/CustomModal',
  component: ModalWithState,
  argTypes: {
    visible: {
      control: {
        type: 'boolean',
      },
    },
    animationType: {
      control: {
        type: 'select',
      },
      options: ['none', 'slide', 'fade'],
    },
    closeOnOverlayPress: {
      control: {
        type: 'boolean',
      },
    },
    onClose: {
      action: 'closed',
    },
    title: {
      control: {
        type: 'text',
      },
    },
    content: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    onClose: action('closed'),
    visible: false,
  },
};

export default CustomModalMeta;

type Story = StoryObj<typeof CustomModalMeta>;

export const Default: Story = {
  args: {
    title: 'Modal Padrão',
    content: 'Este é um modal com configurações padrão.',
  },
};

export const WithFadeAnimation: Story = {
  args: {
    title: 'Modal com Fade',
    content: 'Este modal usa animação de fade.',
    animationType: 'fade',
  },
};

export const WithSlideAnimation: Story = {
  args: {
    title: 'Modal com Slide',
    content: 'Este modal usa animação de slide.',
    animationType: 'slide',
  },
};

export const WithoutOverlayClose: Story = {
  args: {
    title: 'Modal Sem Fechar por Overlay',
    content: 'Este modal não fecha quando você toca fora dele.',
    closeOnOverlayPress: false,
  },
};

export const ConfirmationModal: Story = {
  args: {
    title: 'Confirmar Ação',
    content: 'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
  },
};

export const InfoModal: Story = {
  args: {
    title: 'Informação',
    content: 'Sua operação foi realizada com sucesso! Você pode continuar usando o aplicativo normalmente.',
  },
};

export const LongContentModal: Story = {
  args: {
    title: 'Modal com Conteúdo Longo',
    content: 'Este é um modal com muito conteúdo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};