import '@/globalStyles/global.css';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';

import { router } from '@/routes.tsx';

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizzashop" defaultTitle="Pizzashop" />
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
