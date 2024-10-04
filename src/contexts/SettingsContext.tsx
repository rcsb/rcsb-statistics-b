import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Settings {
    colorScheme: string[];
    schemeName: string;
    isDarkMode: boolean;
    colorSchemes: Record<string, string[]>;
    chartDetails: string;
  }
  
interface SettingsContextType {
    settings: Settings;
    toggleDarkMode: () => void;
    changeColorScheme: (schemeName: keyof typeof COLOR_SCHEMES) => void;
    updateCustomColor: (index: number, newColor: string) => void;
    changeChartDetails: (newChartDetails: string) => void;
}

interface SettingsProviderProps {
    children: ReactNode;
  }

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const COLOR_SCHEMES = {
    "default": [
        "#86b5e6", // Light Blue
        "#2fad30", // Green
        "#e71f8a", // Magenta
        "#f60505", // Red
        "#a27206", // Brownish Orange
        "#60e5bd", // Teal
        "#85ff34", // Lime Green
        "#ea6c05"  // Orange
    ],
    "Achromatic": [
        "#e69f00", // Orange
        "#56b4e9", // Sky Blue
        "#009e73", // Bluish Green
        "#f0e442", // Yellow
        "#0072b2", // Blue
        "#d55e00", // Vermillion
        "#cc79a7", // Reddish Purple
        "#000000"  // Black
    ],
    "custom": [
        "#ff0000", // Red
        "#00ff00", // Green
        "#0000ff", // Blue
        "#ffff00", // Yellow
        "#ff00ff", // Magenta
        "#00ffff", // Cyan
        "#8b0000", // Dark Red
        "#006400"  // Dark Green
    ]
};


  export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({
        colorScheme: COLOR_SCHEMES.default, 
        schemeName: 'default',
        isDarkMode: false,
        colorSchemes: COLOR_SCHEMES, 
        chartDetails: ""
    });

    const toggleDarkMode = () => {
        setSettings(prevSettings => ({
            ...prevSettings,
            isDarkMode: !prevSettings.isDarkMode,
        }));
    };

    const changeColorScheme = (schemeName: keyof typeof COLOR_SCHEMES) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            colorScheme: COLOR_SCHEMES[schemeName] || COLOR_SCHEMES.default,
            schemeName,
        }));
    };
    
    

    const updateCustomColor = (index: number, newColor: string) => {
        if (settings.schemeName !== 'custom' || index < 0 || index >= settings.colorSchemes.custom.length) {
            console.error('Invalid operation: Either the scheme is not custom or the index is out of bounds.');
            return;
        }

        const updatedCustomScheme = [...settings.colorSchemes.custom];
        updatedCustomScheme[index] = newColor;

        setSettings(prevSettings => ({
            ...prevSettings,
            colorSchemes: {
                ...prevSettings.colorSchemes,
                custom: updatedCustomScheme
            },
            colorScheme: updatedCustomScheme,
        }));
    };

    const changeChartDetails = (newChartDetails: string) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            chartDetails: newChartDetails,
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, toggleDarkMode, changeColorScheme, updateCustomColor, changeChartDetails }}>
            {children}
        </SettingsContext.Provider>
    );
};



export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
