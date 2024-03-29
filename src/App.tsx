import { BrowserRouter } from 'react-router-dom';
import './shared/forms/TraducoesYup';
import { AppRoutes } from './routes';
import { AppDrawerProvider, AppThemeProvider, AuthProvider } from './shared/contexts';
import { Login, MenuLateral } from './shared/components';

export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Login>
          <AppDrawerProvider>
            <BrowserRouter>
              <MenuLateral>
                <AppRoutes />
              </MenuLateral>
            </BrowserRouter>
          </AppDrawerProvider>
        </Login>
      </AppThemeProvider>
    </AuthProvider>
  );
};
