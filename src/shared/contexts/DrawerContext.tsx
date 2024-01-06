import { createContext, ReactNode, useCallback, useState, useContext } from 'react';

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
}
interface IDrawerontextProps {
    children?: ReactNode;
}

interface IDrawerOption {
    icon: string;
    path: string;
    label: string;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<IDrawerontextProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);
    const handleSetDrawerOptions = useCallback((newDrawerOption: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOption);
    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions ,toggleDrawerOpen, setDrawerOption: handleSetDrawerOptions }}>
            {children}
        </DrawerContext.Provider>
    );
};