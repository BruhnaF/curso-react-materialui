import { Avatar, Divider, Drawer, useTheme, List, ListItemButton, ListItemIcon, ListItemText, Icon, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';
import { Box } from '@mui/system';
import { useAppDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IMenuLateralProps {
    children?: ReactNode;
}

interface IListItemLinkProps {
    label: string;
    icon: string;
    to: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ label, icon, to, onClick }) => {
    const navegate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navegate(to);
        onClick?.();
    };
    return (
        < ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton >
    );
};


export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
                            src="https://avatar.skype.com/v1/avatars/live:bruhnaformento?auth_key=-378753391&size=m"
                        />
                    </Box>
                    <Divider />
                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    to='/Página inicial'
                                    label='Página inicial'
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
};