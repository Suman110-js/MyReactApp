import React, { createContext, useContext, useState, useCallback } from 'react';

export type ScreenName =
  | 'home'
  | 'projects'
  | 'project-detail'
  | 'experience'
  | 'contact'
  | 'meow';

export interface NavigationState {
  currentScreen: ScreenName;
  params?: { projectId?: string; [key: string]: any };
}

interface NavigationContextType {
  currentScreen: ScreenName;
  params?: { projectId?: string; [key: string]: any };
  navigate: (screen: ScreenName, params?: { projectId?: string; [key: string]: any }) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<NavigationState[]>([
    { currentScreen: 'home' },
  ]);

  const currentState = history[history.length - 1];

  const navigate = useCallback(
    (screen: ScreenName, params?: { projectId?: string; [key: string]: any }) => {
      setHistory(prev => [...prev, { currentScreen: screen, params }]);
    },
    [],
  );

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, prev.length - 1);
    });
  }, []);

  const canGoBack = history.length > 1;

  return (
    <NavigationContext.Provider
      value={{
        currentScreen: currentState.currentScreen,
        params: currentState.params,
        navigate,
        goBack,
        canGoBack,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useAppNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }
  return context;
};
