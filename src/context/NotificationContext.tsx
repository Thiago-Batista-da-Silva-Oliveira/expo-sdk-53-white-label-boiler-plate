import React, { createContext, useContext, ReactNode } from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  warning: ({ text1, text2, ...rest }: any) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: '#FFA500' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
      text2Style={{
        fontSize: 13,
        color: '#666'
      }}
      text1={text1}
      text2={text2}
    />
  ),
};

interface NotificationContextType {
  notify: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
  };
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notify = {
    success: (message: string, title: string = 'Sucesso') => {
      Toast.show({
        type: 'success',
        text1: title,
        text2: message,
        visibilityTime: 4000,
        position: 'top',
      });
    },

    error: (message: string, title: string = 'Erro') => {
      Toast.show({
        type: 'error',
        text1: title,
        text2: message,
        visibilityTime: 5000,
        position: 'top',
      });
    },

    info: (message: string, title: string = 'Informação') => {
      Toast.show({
        type: 'info',
        text1: title,
        text2: message,
        visibilityTime: 4000,
        position: 'top',
      });
    },

    warning: (message: string, title: string = 'Atenção') => {
      Toast.show({
        type: 'warning',
        text1: title,
        text2: message,
        visibilityTime: 4000,
        position: 'top',
      });
    },
  };

  const contextValue: NotificationContextType = {
    notify,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Toast config={toastConfig} />
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};