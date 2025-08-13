import type { Preview } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;