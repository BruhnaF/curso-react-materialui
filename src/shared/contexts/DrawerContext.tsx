import { createContext, ReactNode, useCallback, useState, useContext } from 'react';

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}
interface IDrawerontextProps {
    children?: ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<IDrawerontextProps> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);
    return (
        <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    );
};