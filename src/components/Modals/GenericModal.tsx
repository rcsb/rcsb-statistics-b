import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import SettingsModalContent from './SettingsModalContent';
import InfoModal from './InfoModal';
import styled from 'styled-components';

const StyledModal = styled.div<{ showModal: boolean }>`
  display: ${({ showModal }) => (showModal ? 'block' : 'none')};
  position: fixed;
  z-index: 1050;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModalDialog = styled.div<{ modalType: string }>`
  margin: 30px auto;
  width: ${({ modalType }) => {
    switch (modalType) {
      case 'fullscreen':
        return '100%';
      case 'settings':
        return '40%';
      case 'information':
        return '60%';
      case 'snapshot':
        return '40%';
      default:
        return '50%';
    }
  }};
  height: ${({ modalType }) => (modalType === 'fullscreen' ? '100%' : 'auto')};
  max-height: 100%;
  position: relative;
`;

const GenericModal: React.FC = () => {
  const { showModal, handleCloseModal, modalType } = useModal();

  if (!showModal) return null;

  const renderModalContent = () => {
    switch (modalType) {
      case 'settings':
        return <SettingsModalContent />;
      case 'information':
        return<InfoModal />;
      case 'fullscreen':
        return <div>Fullscreen Modal Content</div>;
      case 'snapshot':
        return <div>Snapshot Modal Content</div>;
      default:
        return null;
    }
  };

  return (
    <StyledModal showModal={showModal}>
      <StyledModalDialog modalType={modalType}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
            <h4 className="modal-title">{modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h4>
          </div>
          <div className="modal-body">{renderModalContent()}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </StyledModalDialog>
    </StyledModal>
  );
};

export default GenericModal;


