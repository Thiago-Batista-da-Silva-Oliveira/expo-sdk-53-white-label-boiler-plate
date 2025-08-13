import type { Meta, StoryObj } from '@storybook/react-native';
// import { action } from '@storybook/addon-ondevice-actions';
const action = (name: string) => () => console.log(`Action: ${name}`);
import { Button } from './Button';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onPress: {
      action: 'pressed',
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'outline', 'danger'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    onPress: action('pressed'),
  },
};

export default ButtonMeta;

type Story = StoryObj<typeof ButtonMeta>;

export const Default: Story = {
  args: {
    title: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline Button',
    variant: 'outline',
  },
};

export const Danger: Story = {
  args: {
    title: 'Danger Button',
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    title: 'Small Button',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    title: 'Large Button',
    size: 'large',
  },
};

export const LoadingPrimary: Story = {
  args: {
    title: 'Loading Primary',
    variant: 'primary',
    loading: true,
  },
};