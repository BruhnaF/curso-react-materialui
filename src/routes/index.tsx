import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalheDeCidades, DetalheDePessoas, ListagemDeCidades, ListagemDePessoas } from '../pages';

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
                icon: 'people',
                path: '/pessoas',
                label: 'Pessoas',
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
            <Route path="/pessoas" element={<ListagemDePessoas />} />
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas />} />
            <Route path="/cidades" element={<ListagemDeCidades />} />
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades />} />
            <Route path="*" element={<Navigate to="pagina-inicial" />} />
        </Routes>
    );
};
