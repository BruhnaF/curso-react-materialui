import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOption } = useAppDrawerContext();
    useEffect(() => {
        setDrawerOption([{
            icon: 'home',
            path: '/pagina-inicial',
            label: 'Página inicial'
        }
        ]);
    }, []);
    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='*' element={<Navigate to='pagina-inicial' />} />
        </Routes>
    );
};
