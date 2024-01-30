import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import { useAuthContext } from '../../contexts';
import * as yup from 'yup';

interface ILoginProps {
    children: ReactNode;
}

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5)
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        loginSchema.validate({ email, password }, { abortEarly: false }).then(dadosValidados => {
            login(dadosValidados.email, dadosValidados.password).then(() => {
                setIsLoading(false);
            });
        }).catch((errors: yup.ValidationError) => {
            setIsLoading(false);
            errors.inner.forEach(error => {
                if (error.path === 'email') {
                    setEmailError(error.message);
                } else if (error.path === 'password') {
                    setPasswordError(error.message);
                }
            });
        });
    };

    if (isAuthenticated) return (
        <>{children}</>
    );

    return (
        <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardContent>
                    <Box display='flex' flexDirection='column' gap={2} width={250}>
                        <Typography variant='h6' align='center'>Login</Typography>
                        <TextField
                            label='Email'
                            type='email'
                            fullWidth
                            value={email}
                            error={!!emailError}
                            helperText={emailError}
                            onKeyDown={() => setEmailError('')}
                            onChange={e => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <TextField
                            label='Senha'
                            type='password'
                            fullWidth
                            value={password}
                            helperText={passwordError}
                            error={!!passwordError}
                            onKeyDown={() => setPasswordError('')}
                            onChange={e => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </Box>
                </CardContent>
                <CardActions>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Button
                            variant='contained'
                            onClick={handleSubmit}
                            disabled={isLoading}
                            endIcon={
                                isLoading ?
                                    <CircularProgress
                                        size={20}
                                        variant='indeterminate'
                                        color='inherit'
                                    /> : undefined}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    );
};