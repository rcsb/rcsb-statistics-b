import React, { useState, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const InfoModal: React.FC = () => {
  const { settings } = useSettings();
  
  return (
    <div>
      {settings.chartDetails}
    </div>
  );
};

export default InfoModal;

