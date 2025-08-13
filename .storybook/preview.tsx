import type { Preview } from '@storybook/react-native';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme } from '../src/theme/light';

// Mock environment
jest.mock('@/config/env', () => ({
  env: {
    EXPO_PUBLIC_API_URL: 'https://storybook-api.com',
    EXPO_PUBLIC_SOCKET_URL: 'https://storybook-socket.com',
    EXPO_PUBLIC_ENVIRONMENT: 'test',
    EXPO_PUBLIC_GOOGLE_MAPS_KEY: 'storybook_key',
    EXPO_PUBLIC_BRAND: 'default1',
  },
}));

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
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