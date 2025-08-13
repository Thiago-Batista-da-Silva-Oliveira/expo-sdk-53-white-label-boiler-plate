import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNotificationToken } from '@/hooks/useNotificationToken';
import { useNotification } from '@/context/NotificationContext';

export const PushNotificationManager: React.FC = () => {
  const { registrationError } = useNotificationToken();
  const { notify } = useNotification();

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('📧 Notificação recebida:', notification);
      
      const { title, body } = notification.request.content;
      if (title && body) {
        notify.info(body, title);
      }
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Notificação tocada:', response);
      
      const data = response.notification.request.content.data;
      if (data) {
        console.log('Dados da notificação:', data);
      }
    });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, [notify]);

  useEffect(() => {
    if (registrationError) {
      notify.warning('Não foi possível registrar notificações push. Algumas funcionalidades podem estar limitadas.');
    }
  }, [registrationError, notify]);

  return null;
};