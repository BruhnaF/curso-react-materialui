import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { PessoaService } from '../../shared/services/api/pessoas/PessoaService';
import { VTextField, VForm, useVForm } from '../../shared/forms';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

interface IFormData {
    email: string;
    cidadeId: number;
    nome: string;
    sobrenome: string;
}

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            PessoaService.getById(Number(id)).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                } else {
                    setNome(result.nome);
                    formRef.current?.setData(result);
                }
            });
        } else {
            formRef.current?.setData({
                email: '',
                cidadeId: '',
                nome: ''
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoaService.create(dados).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else if (isSaveAndClose()) {
                    navigate('/pessoas');
                } else {
                    navigate(`/pessoas/detalhe/${result}`);
                }
            });
        } else {
            PessoaService.updateById(Number(id), { id: Number(id), ...dados }).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else if (isSaveAndClose()) {
                    navigate('/pessoas');
                }
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar o registro?')) {
            PessoaService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro apagado com sucesso');
                    navigate('/pessoas');
                }
            });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova pessoa' : nome}
            barraDeFerramenta={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}
                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            <VForm ref={formRef} onSubmit={handleSave} placeholder=''>
                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined' >
                    <Grid container item direction='column' padding={2} spacing={2}>
                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}
                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container direction='row' spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    label='Nome'
                                    name='nome'
                                    disabled={isLoading}
                                    onChange={e => setNome(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid container direction='row' spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label='Email' name='email' disabled={isLoading} />
                            </Grid>
                        </Grid>
                        <Grid container direction='row' spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label='Cidade' name='cidadeId' disabled={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <button type='submit'>Salvar</button>
            </VForm>
        </LayoutBaseDePagina >
    );
};