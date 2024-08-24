import React, { useState } from 'react';
import { useModal } from '../../contexts/ModalContext';
import { useSettings } from '../../contexts/SettingsContext';

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
    <div style={{ display: 'flex' }}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: color,
            marginRight: index === colors.length - 1 ? '0' : '2px', // No margin on last box
            borderRadius: '4px',
          }}
        />
      ))}
    </div>
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
                <label
                  key={schemeName}
                  className="radio"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    width: '100%', 
                  }}
                >
                  <input
                    type="radio"
                    name="color-scheme"
                    value={schemeName}
                    checked={selectedScheme === schemeName}
                    onChange={handleSchemeChange}
                    style={{ marginRight: '10px' }}
                  />
                  <span style={{ minWidth: '80px', textTransform: 'capitalize', marginRight: '10px' }}>
                    {schemeName}
                  </span>
                  {renderColorGrid(settings.colorSchemes[schemeName])}
                </label>
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
