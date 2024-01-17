import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { useAppDrawerContext } from '../contexts';

interface LayoutBaseDePaginaProps {
    children?: ReactNode;
    titulo: string;
    barraDeFerramenta?: ReactNode
}

export const LayoutBaseDePagina: React.FC<LayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramenta }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    const theme = useTheme();
    const { toggleDrawerOpen } = useAppDrawerContext();

    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} display="flex" alignItems="center" gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} >
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>
                            menu
                        </Icon>
                    </IconButton>
                )}
                <Typography
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipses"
                >
                    {titulo}
                </Typography>
            </Box>
            {(barraDeFerramenta &&
                <Box>
                    {barraDeFerramenta}
                </Box>
            )}
            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box >
    );
};