import React, { useContext, useState, createContext, ReactNode } from 'react';

type ContextType = Record<string, any>;

const QueryContext = createContext<ContextType | undefined>(undefined);

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [contextState, setContextState] = useState<ContextType>({});

  const setProperty = (key: string, value: any) => {
    setContextState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <QueryContext.Provider value={{ ...contextState, setProperty }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useDataQuery = (): ContextType => {
    const context = useContext(QueryContext);
    if (!context) {
      throw new Error('useDataQuery must be used within a QueryProvider');
    }
    return context;
  };