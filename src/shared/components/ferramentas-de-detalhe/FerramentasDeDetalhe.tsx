import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';

interface IFerramentasDeDetalheProp {
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;
    mostrarBotaoVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEFechar?: () => void;
}

interface ICustomBtnProps {
    icone: string;
    label: string;
    variante: 'contained' | 'outlined';
    onClick: (() => void) | undefined
}
export const CustomBtn: React.FC<ICustomBtnProps> = ({ icone, label, variante, onClick }) => {
    return (
        <Button
            color='primary'
            disableElevation
            variant={variante}
            startIcon={<Icon>{icone}</Icon>}
            onClick={onClick}
        >
            <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                {label}
            </Typography>
        </Button>
    );
};

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProp> = ({
    textoBotaoNovo = 'Novo',
    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEFechar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,
    mostrarBotaoVoltarCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEFechar,

}) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();
    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            gap={1}
            alignItems="center"
            component={Paper}
        >
            {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando &&
                <CustomBtn
                    icone='save'
                    label='Salvar'
                    variante='contained'
                    onClick={aoClicarEmSalvar}
                />
            )}
            {(mostrarBotaoSalvarCarregando &&
                <Skeleton width={110} height={60} />
            )}
            {(mostrarBotaoSalvarEFechar &&
                !mostrarBotaoSalvarEFecharCarregando &&
                !smDown &&
                !mdDown &&
                <CustomBtn
                    icone='save'
                    label='Salvar e voltar'
                    variante='outlined'
                    onClick={aoClicarEmSalvarEFechar}
                />
            )}
            {(mostrarBotaoSalvarEFecharCarregando && !smDown && !mdDown &&
                <Skeleton width={180} height={60} />
            )}
            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando &&
                <CustomBtn
                    icone='delete'
                    label='Apagar'
                    variante='outlined'
                    onClick={aoClicarEmApagar}
                />
            )}
            {(mostrarBotaoApagarCarregando &&
                <Skeleton width={110} height={60} />
            )}
            {(mostrarBotaoNovo &&
                !mostrarBotaoNovoCarregando &&
                !smDown &&
                !mdDown &&
                <CustomBtn
                    icone='add'
                    label={textoBotaoNovo}
                    variante='outlined'
                    onClick={aoClicarEmNovo}
                />
            )}
            {(mostrarBotaoNovoCarregando && !smDown && !mdDown &&
                <Skeleton width={110} height={60} />
            )}
            {(mostrarBotaoVoltar &&
                (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar || mostrarBotaoSalvarEFechar) && (
                    <Divider variant='middle' orientation='vertical' />
                )
            )}
            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando &&
                <CustomBtn
                    icone='arrow_back'
                    label='Voltar'
                    variante='outlined'
                    onClick={aoClicarEmVoltar}
                />
            )}
            {(mostrarBotaoVoltarCarregando &&
                <Skeleton width={110} height={60} />
            )}
        </Box>

    );
};
