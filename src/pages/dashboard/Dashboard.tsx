import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard: React.FC = () => {
    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramenta={(
                <FerramentasDaListagem
                    mostrarImputBusca
                    textoBotaoNovo='Novo'
                />
            )}>
            Testando
        </LayoutBaseDePagina>
    );
};