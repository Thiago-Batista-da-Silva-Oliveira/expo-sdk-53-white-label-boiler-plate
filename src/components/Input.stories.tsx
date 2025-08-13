import type { Meta, StoryObj } from '@storybook/react-native';
// import { action } from '@storybook/addon-ondevice-actions';
const action = (name: string) => () => console.log(`Action: ${name}`);
import { Input } from './Input';

const InputMeta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChangeText: {
      action: 'text changed',
    },
    onBlur: {
      action: 'blurred',
    },
    onFocus: {
      action: 'focused',
    },
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
    error: {
      control: {
        type: 'text',
      },
    },
    secureTextEntry: {
      control: {
        type: 'boolean',
      },
    },
    multiline: {
      control: {
        type: 'boolean',
      },
    },
    editable: {
      control: {
        type: 'boolean',
      },
    },
    maxLength: {
      control: {
        type: 'number',
      },
    },
  },
  args: {
    onChangeText: action('text changed'),
    onBlur: action('blurred'),
    onFocus: action('focused'),
  },
};

export default InputMeta;

type Story = StoryObj<typeof InputMeta>;

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome',
  },
};

export const WithValue: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'Digite seu e-mail',
    value: 'usuario@exemplo.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    error: 'Senha deve ter pelo menos 6 caracteres',
    value: '123',
  },
};

export const Password: Story = {
  args: {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    secureTextEntry: true,
    value: 'minhaSenhaSecreta',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Comentários',
    placeholder: 'Digite seus comentários aqui...',
    multiline: true,
    numberOfLines: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Campo não editável',
    value: 'Valor não editável',
    editable: false,
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Código (máx. 6 caracteres)',
    placeholder: 'Digite o código',
    maxLength: 6,
  },
};

export const Email: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'Digite seu e-mail',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
  },
};

export const Phone: Story = {
  args: {
    label: 'Telefone',
    placeholder: '(00) 00000-0000',
    keyboardType: 'phone-pad',
  },
};