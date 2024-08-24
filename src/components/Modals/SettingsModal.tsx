import React, { useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useSettings } from '../../contexts/SettingsContext';
import styled from 'styled-components';

const ColorGrid = styled.div`
  display: flex;
  margin-left: 10px;
`;

const ColorBox = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  margin-right: 1px;
  border-radius: 2px;

  &:last-child {
    margin-right: 0;
  }
`;

const ColorSchemeContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
`;

const SchemeName = styled.span`
 margin-left: 5px;
  min-width: 60px;
  text-transform: capitalize;
  margin-right: 10px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const SettingsModal: React.FC = () => {
  const { showModal, handleCloseModal } = useModal();
  const { settings, changeColorScheme } = useSettings();

  const [selectedScheme, setSelectedScheme] = useState(settings.schemeName);

  const handleSchemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedScheme(event.target.value);
  };

  const handleSaveChanges = () => {
    changeColorScheme(selectedScheme);
    handleCloseModal();
  };

  if (!showModal) return null;

  const renderColorGrid = (colors: string[]) => (
    <ColorGrid>
      {colors.map((color: string, index: number) => (
        <ColorBox key={index} color={color} />
      ))}
    </ColorGrid>
  );

  return (
    <div className={`modal fade ${showModal ? 'in' : ''}`} style={{ display: showModal ? 'block' : 'none' }} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
            <h4 className="modal-title">RCSB Chart Settings</h4>
          </div>
          <div className="modal-body">
            <div className="current-scheme">
              <strong>Current Color Scheme:</strong> {settings.schemeName.charAt(0).toUpperCase() + settings.schemeName.slice(1)}
            </div>
            <label>Select Color Scheme:</label>
            <div>
              {Object.keys(settings.colorSchemes).map((schemeName) => (
                <ColorSchemeContainer key={schemeName}>
                  <RadioInput
                    type="radio"
                    name="color-scheme"
                    value={schemeName}
                    checked={selectedScheme === schemeName}
                    onChange={handleSchemeChange}
                  />
                  <SchemeName>{schemeName}</SchemeName>
                  {renderColorGrid(settings.colorSchemes[schemeName])}
                </ColorSchemeContainer>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" onClick={handleCloseModal}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
