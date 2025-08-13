import React from 'react';
import { render } from '@testing-library/react-native';
import { SocketListenerWrapper } from '../src/components/SocketListenerWrapper';

jest.mock('@/hooks/useDefaultSocketListeners', () => ({
  useDefaultSocketListeners: jest.fn(),
}));

describe('SocketListenerWrapper', () => {
  it('SocketListenerWrapper — deve renderizar corretamente', () => {
    expect(() => render(<SocketListenerWrapper />)).not.toThrow();
  });

  it('should call useDefaultSocketListeners hook', () => {
    const mockHook = require('@/hooks/useDefaultSocketListeners').useDefaultSocketListeners;
    
    render(<SocketListenerWrapper />);
    
    expect(mockHook).toHaveBeenCalled();
  });

  it('should render without throwing errors', () => {
    expect(() => {
      render(<SocketListenerWrapper />);
    }).not.toThrow();
  });
});