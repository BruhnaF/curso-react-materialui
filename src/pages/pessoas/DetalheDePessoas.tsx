import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useRef, useState } from 'react';
import { PessoaService } from '../../shared/services/api/pessoas/PessoaService';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { FormHandles } from '@unform/core';

interface IFormData {
    email: string;
    cidadeId: number;
    nome: string;
    sobrenome: string;
}

export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null);

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
        }

    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (id === 'nova') {
            PessoaService.create(dados).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    navigate(`/pessoas/detalhe/${result}`);
                }
            });
        } else {
            PessoaService.updateById(Number(id), { id: Number(id), ...dados }).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
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
                    aoClicarEmSalvar={() => formRef.current?.submitForm()}
                    aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                    aoClicarEmVoltar={() => navigate('/pessoas')}
                />
            }
        >
            {isLoading && (
                <></>
            )}

            <Form ref={formRef} onSubmit={handleSave} placeholder=''>
                <VTextField placeholder='Nome' name='nome' />
                <VTextField placeholder='Email' name='email' />
                <VTextField placeholder='Cidade id' name='cidadeId' />
                <button type='submit'>Salvar</button>
            </Form>
        </LayoutBaseDePagina>
    );
};