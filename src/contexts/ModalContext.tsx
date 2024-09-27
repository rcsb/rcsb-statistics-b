import React, { useContext, useState, createContext, ReactNode } from 'react';

type ModalType = 'fullscreen' | 'settings' | 'information' | 'snapshot' | ''; 

interface ModalContextType {
  showModal: boolean;
  handleOpenModal: (type: ModalType) => void;
  handleCloseModal: () => void;
  modalType: ModalType;
}

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(''); 

  const handleOpenModal = (type: ModalType) => { 
    setModalType(type); 
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setModalType(''); 
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, handleOpenModal, handleCloseModal, modalType }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};