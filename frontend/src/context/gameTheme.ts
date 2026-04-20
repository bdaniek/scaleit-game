import { createContext, useContext } from 'react';

export const ThemeColorContext = createContext<(color: string) => void>(() => {});

export const useSetThemeColor = () => useContext(ThemeColorContext);
