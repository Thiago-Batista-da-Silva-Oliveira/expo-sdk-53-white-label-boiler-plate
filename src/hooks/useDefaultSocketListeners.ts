import { useEffect } from 'react';
import { useSocket } from '@/context/SocketContext';
import { queryClient } from '@/config/queryClient';
import { useModalManager } from '@/context/ModalManagerContext';
import { ITripAcceptedByDriver, ITripSocketMessage } from '@/types/socket';

export const useDefaultSocketListeners = () => {
  const { socket } = useSocket();
  const { openModal } = useModalManager();

  const checkInProgressTrip = () => {
    queryClient.invalidateQueries({ queryKey: ['checkInProgressTrip'] });
  };

  useEffect(() => {
    if (!socket) return;

    const handleTripAcceptedByDriver = async (data: ITripAcceptedByDriver) => {
      console.log('Trip accepted by driver:', data);
      checkInProgressTrip();
    };

    const handleTripFinishedByDriver = async (data: ITripSocketMessage) => {
      console.log('Trip finished by driver:', data);
      checkInProgressTrip();
      openModal('tripFinished');
    };

    const handleTripStartedByDriver = async (data: ITripSocketMessage) => {
      console.log('Trip started by driver:', data);
      checkInProgressTrip();
    };

    const handleTripValidated = async (data: ITripSocketMessage) => {
      console.log('Trip validated:', data);
      checkInProgressTrip();
    };

    const handleRefetchMobile = async (data: ITripSocketMessage) => {
      console.log('Refetch mobile:', data);
      checkInProgressTrip();
    };

    const handleTripInProgressCanceled = async (data: ITripSocketMessage) => {
      console.log('Trip in progress canceled:', data);
      checkInProgressTrip();
      openModal('tripCanceled');
    };

    const handleTripCanceledByRenter = async (data: ITripSocketMessage) => {
      checkInProgressTrip();
      openModal('tripCanceled');
    };

    socket.off('alertTripAcceptedByDriver').on('alertTripAcceptedByDriver', handleTripAcceptedByDriver);
    socket.off('tripFinishedByDriverOnMobile').on('tripFinishedByDriverOnMobile', handleTripFinishedByDriver);
    socket.off('tripStartedByDriverOnMobile').on('tripStartedByDriverOnMobile', handleTripStartedByDriver);
    socket.off('tripValidated').on('tripValidated', handleTripValidated);
    socket.off('refetchMobilie').on('refetchMobilie', handleRefetchMobile);
    socket.off('tripInProgressCanceled').on('tripInProgressCanceled', handleTripInProgressCanceled);
    socket.off('tripCanceledByRenterOnMobile').on('tripCanceledByRenterOnMobile', handleTripCanceledByRenter);

    return () => {
      socket.off('alertTripAcceptedByDriver');
      socket.off('tripFinishedByDriverOnMobile');
      socket.off('tripStartedByDriverOnMobile');
      socket.off('tripValidated');
      socket.off('refetchMobilie');
      socket.off('tripInProgressCanceled');
      socket.off('tripCanceledByRenterOnMobile');
    };
  }, [socket, openModal]);
};