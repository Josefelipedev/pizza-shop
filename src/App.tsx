import '@/globalStyles/global.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme/theme-provider.tsx';
import { router } from '@/routes.tsx';

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
        <Helmet titleTemplate="%s | Pizzashop" defaultTitle="Pizzashop" />
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
