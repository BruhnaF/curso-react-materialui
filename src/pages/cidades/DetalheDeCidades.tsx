import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';
import { CidadeService } from '../../shared/services/api/cidades/CidadeService';

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3)
});


export const DetalheDeCidades: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);
            CidadeService.getById(String(id)).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/cidades');
                } else {
                    setNome(result.nome);
                    formRef.current?.setData(result);
                }
            });
        } else {
            formRef.current?.setData({
                nome: ''
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        formValidationSchema.validate(dados, { abortEarly: false }).then(dadosValidados => {
            setIsLoading(true);
            if (id === 'nova') {
                CidadeService.create(dadosValidados).then(result => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else if (isSaveAndClose()) {
                        navigate('/cidades');
                    } else {
                        navigate(`/cidades/detalhe/${result}`);
                    }
                });
            } else {
                CidadeService.updateById(String(id), { id: String(id), ...dadosValidados }).then(result => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else if (isSaveAndClose()) {
                        navigate('/cidades');
                    }
                });
            }
        }).catch((errors: yup.ValidationError) => {
            const validationErrors: IVFormErrors = {};
            errors.inner.forEach(error => {
                if (!error.path) return;
                validationErrors[error.path] = error.message;
            });
            formRef.current?.setErrors(validationErrors);
        });

    };

    const handleDelete = (id: string) => {
        if (confirm('Realmente deseja apagar o registro?')) {
            CidadeService.deleteById(id).then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    alert('Registro apagado com sucesso');
                    navigate('/cidades');
                }
            });
        }
    };

    return (
        <LayoutBaseDePagina
            titulo={id === 'nova' ? 'Nova Cidade' : nome}
            barraDeFerramenta={
                <FerramentasDeDetalhe
                    textoBotaoNovo='Nova'
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== 'nova'}
                    mostrarBotaoNovo={id !== 'nova'}
                    aoClicarEmSalvar={save}
                    aoClicarEmSalvarEFechar={saveAndClose}
                    aoClicarEmApagar={() => handleDelete(String(id))}
                    aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/cidades')}
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
                    </Grid>
                </Box>
            </VForm>
        </LayoutBaseDePagina >
    );
};