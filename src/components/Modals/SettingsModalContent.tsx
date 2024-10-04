import React, { useState, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { SketchPicker } from 'react-color';
import {
  ColorGrid,
  ColorBox,
  ColorSchemeContainer,
  SchemeName,
  RadioInput,
  Popover,
  Cover,
  PreStyled
} from '../../styles/GenericModalStyles';
import { TabContainer, TabButton, TabContent } from '../../styles/TabStyles';
import { useDataQuery } from '../../contexts/QueryContext';

const SettingsModalContent: React.FC = () => {
  const { settings, changeColorScheme, updateCustomColor } = useSettings();
  const [selectedTab, setSelectedTab] = useState('chartColors');
  const [selectedScheme, setSelectedScheme] = useState(settings.schemeName);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorPickerIndex, setColorPickerIndex] = useState<number | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('');
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const context = useDataQuery();
  const colorBlindText = 'Color Blind Friendly';

  useEffect(() => {
    setSelectedScheme(settings.schemeName);
  }, [settings.schemeName, selectedScheme]);

  const handleSchemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const schemeName = event.target.value;
    if (schemeName !== selectedScheme) {
      setSelectedScheme(schemeName);
      changeColorScheme(schemeName);
    }
  };

  const handleColorClick = (color: string, index: number, event: React.MouseEvent) => {
    if (selectedScheme !== 'custom') return;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const modalRect = (event.currentTarget as HTMLElement).closest('.modal-dialog')?.getBoundingClientRect();

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

  const renderChartColors = () => (
    <div>
      <label>Current: &nbsp;</label>
      {settings.schemeName === 'Achromatic' ? colorBlindText : settings.schemeName.charAt(0).toUpperCase() + settings.schemeName.slice(1)}
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
            <SchemeName>{schemeName === 'Achromatic' ? colorBlindText : schemeName}</SchemeName>
            {renderColorGrid(settings.colorSchemes[schemeName])}
          </ColorSchemeContainer>
        ))}

        {selectedScheme === 'custom' && (
          <p>Create a custom color scheme, click on the color you <br /> would like to change and use the color picker.</p>
        )}
      </div>
      {displayColorPicker && (
        <Popover top={pickerPosition.top} left={pickerPosition.left}>
          <Cover onClick={handleClosePicker} />
          <SketchPicker color={currentColor} onChange={handleColorChange} />
        </Popover>
      )}
    </div>
  );

  const renderQueryInfo = () => (
     <PreStyled>{JSON.stringify(context, null, 2)}</PreStyled>
  );

  return (
    <TabContainer>
      <div>
        <TabButton
          active={selectedTab === 'chartColors'}
          onClick={() => setSelectedTab('chartColors')}
        >
          Color Scheme
        </TabButton>
        <TabButton
          active={selectedTab === 'queryInfo'}
          onClick={() => setSelectedTab('queryInfo')}
        >
          Current Query Info
        </TabButton>
      </div>
      <TabContent>
        {selectedTab === 'chartColors' && renderChartColors()}
        {selectedTab === 'queryInfo' && renderQueryInfo()}
      </TabContent>
    </TabContainer>
  );
};

export default SettingsModalContent;

