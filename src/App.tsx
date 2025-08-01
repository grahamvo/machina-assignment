import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router';
import { CookiesProvider } from 'react-cookie';

import { AuthProvider } from 'Context/auth-provider';

import AppRoutes from 'Routes/AppRoutes';

// Import global styles
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
  return (
    <BrowserRouter>
        <CookiesProvider>
          <AuthProvider>
            <MantineProvider defaultColorScheme="dark">
              <Notifications />
              <AppRoutes />
            </MantineProvider>
          </AuthProvider>
        </CookiesProvider>
    </BrowserRouter>
  )
}

export default App
