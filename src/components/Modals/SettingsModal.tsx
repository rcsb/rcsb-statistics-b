import React, { useState, useEffect } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useSettings } from '../../contexts/SettingsContext';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import { SketchPicker } from 'react-color';

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
  cursor: pointer;
  position: relative;

  &:last-child {
    margin-right: 0;
  }
`;

const ColorSchemeContainer = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
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

const Popover = styled.div<{ top: number; left: number }>`
  position: absolute;
  z-index: 2;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const SettingsModal: React.FC = () => {
  const { showModal, handleCloseModal } = useModal();
  const { settings, changeColorScheme, updateCustomColor } = useSettings();
  const queryClient = useQueryClient();

  const [selectedScheme, setSelectedScheme] = useState(settings.schemeName);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (selectedScheme !== 'custom') {
      setDisplayColorPicker(false);
      setColorPickerIndex(null);
    }
  }, [selectedScheme]);

  const handleSchemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const schemeName = event.target.value;
    setSelectedScheme(schemeName);
    changeColorScheme(schemeName);
    queryClient.invalidateQueries({ queryKey: ['experimentalMethodsData', schemeName] });
  };

  const handleSaveChanges = () => {
    changeColorScheme(selectedScheme);
    queryClient.invalidateQueries({ queryKey: ['experimentalMethodsData', selectedScheme] });
    handleCloseModal();
  };

  const handleColorClick = (color: string, index: number, event: React.MouseEvent) => {
    if (selectedScheme !== 'custom') return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const modalRect = (event.currentTarget as HTMLElement).closest('.modal-content')?.getBoundingClientRect();

    if (modalRect) {
      setPickerPosition({
        top: rect.top - modalRect.top + rect.height,
        left: rect.left - modalRect.left,
      });
    }

    setCurrentColor(color);
    setColorPickerIndex(index);
    setDisplayColorPicker(true);
  };

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex);
    if (colorPickerIndex !== null) {
      updateCustomColor(colorPickerIndex, color.hex);
    }
  };

  const handleClosePicker = () => {
    setDisplayColorPicker(false);
    setColorPickerIndex(null);
  };

  if (!showModal) return null;

  const renderColorGrid = (colors: string[]) => (
    <ColorGrid>
      {colors.map((color: string, index: number) => (
        <ColorBox
          key={index}
          color={color}
          onClick={(event) => handleColorClick(color, index, event)}
        />
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
            <label>Current Color Scheme:</label> {settings.schemeName.charAt(0).toUpperCase() + settings.schemeName.slice(1)}
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
          {displayColorPicker && (
            <Popover top={pickerPosition.top} left={pickerPosition.left}>
              <Cover onClick={handleClosePicker} />
              <SketchPicker color={currentColor} onChange={handleColorChange} />
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
