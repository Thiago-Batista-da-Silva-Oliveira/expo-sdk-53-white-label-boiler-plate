import React from 'react';
import { render } from '@testing-library/react-native';
import { PushNotificationManager } from '../src/components/PushNotificationManager';

// Mock dependencies
jest.mock('expo-notifications', () => ({
  addNotificationReceivedListener: jest.fn(() => ({
    remove: jest.fn(),
  })),
  addNotificationResponseReceivedListener: jest.fn(() => ({
    remove: jest.fn(),
  })),
}));

jest.mock('@/hooks/useNotificationToken', () => ({
  useNotificationToken: () => ({
    registrationError: null,
  }),
}));

jest.mock('@/context/NotificationContext', () => ({
  useNotification: () => ({
    notify: {
      info: jest.fn(),
      warning: jest.fn(),
    },
  }),
}));

describe('PushNotificationManager', () => {
  it('PushNotificationManager — deve renderizar corretamente', () => {
    
    expect(() => render(<PushNotificationManager />)).not.toThrow();
  });

  it('should handle registration error', () => {
    const mockWarning = jest.fn();
    
    jest.doMock('@/hooks/useNotificationToken', () => ({
      useNotificationToken: () => ({
        registrationError: 'Test error',
      }),
    }));
    
    jest.doMock('@/context/NotificationContext', () => ({
      useNotification: () => ({
        notify: {
          info: jest.fn(),
          warning: mockWarning,
        },
      }),
    }));

    expect(() => render(<PushNotificationManager />)).not.toThrow();
  });

  it('should render without errors when no registration error', () => {
    jest.doMock('@/hooks/useNotificationToken', () => ({
      useNotificationToken: () => ({
        registrationError: null,
      }),
    }));

    expect(() => render(<PushNotificationManager />)).not.toThrow();
  });
});