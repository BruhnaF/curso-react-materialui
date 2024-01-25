import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { CidadeService } from '../../../shared/services/api/cidades/CidadeService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
    id: string;
    label: string;
}

interface IAutoCompleteCidadeProps {
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({ isExternalLoading = false }) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
    const { debounce } = useDebounce();
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');
    const [selectedId, setSelectedId] = useState<string | undefined>(defaultValue);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setIsLoading(true);
        debounce(() => {
            CidadeService.getAll(1, busca).then(result => {
                setIsLoading(false);
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    console.log(result);
                    setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
                }
            });
        });
    }, [busca]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;
        const selectedOption = opcoes.find(opcao => opcao.id === selectedId);
        if (!selectedOption) return null;
        return selectedOption;
    }, [selectedId, opcoes]);

    return (
        <Autocomplete
            value={autoCompleteSelectedOption}
            loading={isLoading}
            disabled={isExternalLoading}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
            onInputChange={(_, newValue) => setBusca(newValue)}
            options={opcoes}
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'
            disablePortal
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Cidade"
                    error={!!error}
                    helperText={error}
                />
            )}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}
        />
    );
};