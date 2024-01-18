import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDeCidade } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOption } = useAppDrawerContext();
    useEffect(() => {
        setDrawerOption([
            {
                icon: 'home',
                path: '/pagina-inicial',
                label: 'Página inicial',
            },
            {
                icon: 'location_city',
                path: '/cidades',
                label: 'Cidades',
            }
        ]);
    }, []);
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />
            <Route path="/cidades" element={<ListagemDeCidade />} />
            {/*<Route path="/cidades/detalhe/:id" element={<Dashboard />} />*/}
            <Route path="*" element={<Navigate to="pagina-inicial" />} />
        </Routes>
    );
};
