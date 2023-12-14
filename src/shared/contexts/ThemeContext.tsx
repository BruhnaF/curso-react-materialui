import { createContext, ReactNode, useCallback, useState, useMemo, useContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/system';
import { DarkTheme, LightTheme } from './../themes';

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}
interface IThemeContextProps {
    children?: ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IThemeContextProps> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');
    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, []);
    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;
        return DarkTheme;
    }, [themeName]);
    return (
        <ThemeContext.Provider value={useMemo(() => ({ themeName, toggleTheme }), [themeName, toggleTheme])}>
            <ThemeProvider theme={theme}>
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};