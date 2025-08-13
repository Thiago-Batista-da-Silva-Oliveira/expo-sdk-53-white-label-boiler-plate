import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalState {
  [key: string]: boolean;
}

interface ModalManagerContextType {
  isModalOpen: (modalId: string) => boolean;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  activeModal: string | null;
}

const ModalManagerContext = createContext<ModalManagerContextType | undefined>(undefined);

interface ModalManagerProviderProps {
  children: ReactNode;
}

export const ModalManagerProvider: React.FC<ModalManagerProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const isModalOpen = (modalId: string): boolean => {
    return modalState[modalId] || false;
  };

  const openModal = (modalId: string) => {
    setModalState(prevState => {
      const newState: ModalState = {};
      Object.keys(prevState).forEach(key => {
        newState[key] = key === modalId;
      });
      newState[modalId] = true;
      return newState;
    });
    setActiveModal(modalId);
  };

  const closeModal = (modalId: string) => {
    setModalState(prevState => ({
      ...prevState,
      [modalId]: false,
    }));
    
    if (activeModal === modalId) {
      setActiveModal(null);
    }
  };

  const closeAllModals = () => {
    setModalState({});
    setActiveModal(null);
  };

  const contextValue: ModalManagerContextType = {
    isModalOpen,
    openModal,
    closeModal,
    closeAllModals,
    activeModal,
  };

  return (
    <ModalManagerContext.Provider value={contextValue}>
      {children}
    </ModalManagerContext.Provider>
  );
};

export const useModalManager = (): ModalManagerContextType => {
  const context = useContext(ModalManagerContext);
  if (context === undefined) {
    throw new Error('useModalManager must be used within a ModalManagerProvider');
  }
  return context;
};