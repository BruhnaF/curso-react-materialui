import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { FerramentasDaListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useEffect, useState } from 'react';
import { CidadeService } from '../../shared/services/api/cidades/CidadeService';
import { PessoaService } from '../../shared/services/api/pessoas/PessoaService';

export const Dashboard: React.FC = () => {
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState(0);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);
        CidadeService.getAll(1).then(result => {
            setIsLoadingCidades(false);
            if (result instanceof Error) {
                alert(result.message);
            } else {
                console.log(result);
                setTotalCountCidades(result.totalCount);
            }
        });
        PessoaService.getAll(1).then(result => {
            setIsLoadingPessoas(false);
            if (result instanceof Error) {
                alert(result.message);
            } else {
                console.log(result);
                setTotalCountPessoas(result.totalCount);
            }
        });
    }, []);

    return (
        <LayoutBaseDePagina
            titulo='Página Inicial'
            barraDeFerramenta={(
                <FerramentasDaListagem
                    mostrarBotaoNovo={false}
                />
            )}>
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de pessoas
                                    </Typography>
                                    <Box display='flex' padding={6} justifyContent='center' alignItems='center'>
                                        {(!isLoadingPessoas && (
                                            <Typography variant='h1'>{totalCountPessoas}</Typography>
                                        ))}
                                        {(isLoadingPessoas && (
                                            <Typography variant='h6'>Carregando...</Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' align='center'>
                                        Total de cidades
                                    </Typography>
                                    <Box display='flex' padding={6} justifyContent='center' alignItems='center'>
                                        {(!isLoadingCidades && (
                                            <Typography variant='h1'>{totalCountCidades}</Typography>
                                        ))}
                                        {(isLoadingCidades && (
                                            <Typography variant='h6'>Carregando...</Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    );
};