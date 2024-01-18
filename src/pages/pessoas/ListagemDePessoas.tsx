import { useSearchParams } from 'react-router-dom';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useMemo, useState } from 'react';
import { IListagemPessoa, PessoaService } from '../../shared/services/api/pessoas/PessoasService';
import { useDebounce } from '../../shared/hooks';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const ListagemDePessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [isLoading,
        setIsLoading] = useState(true);
    const [totalCount,
        setTotalCount] = useState(0);

    const busca = useMemo(() => {
        return searchParams.get('busca') ?? '';
    }, [searchParams]);

    useEffect(() => {
        if (isLoading || totalCount) {
            true;
        }
        setIsLoading(true);
        debounce(() => {
            PessoaService.getAll(1, busca).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);
                    setRows(result.data);
                    setTotalCount(result.totalCount);
                }
            });
        });
    }, [busca]);

    return (
        <LayoutBaseDePagina
            titulo='Listagem de pessoas'
            barraDeFerramenta={
                <FerramentasDaListagem
                    mostrarImputBusca
                    textoBotaoNovo='Nova'
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant='outlined' sx={{ n: 1, width: 'auto' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Ações</StyledTableCell>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell>Ações</StyledTableCell>
                                <StyledTableCell>{row.nome}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutBaseDePagina >
    );
};