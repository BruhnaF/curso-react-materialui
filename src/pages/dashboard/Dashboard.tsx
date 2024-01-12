import { BarraDeFerramentas } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {
    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramenta={(
                <BarraDeFerramentas
                    mostrarImputBusca
                    textoBotaoNovo='Novo'
                />
            )}>
            Testando
        </LayoutBaseDePagina>
    );
};