import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeroesListPage from '../pages/HeroesListPage';
import CyHerosProvider from './CyHeroesProvider';
import HeroEditPage from '../pages/HeroEditPage';
import HeroNewPage from '../pages/HeroNewPage';

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <CyHerosProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="heroes" />} />

            <Route path="/heroes" element={<HeroesListPage />} />

            <Route path="/heroes/:id/edit" element={<HeroEditPage />} />

            <Route
              path="/heroes/new"
              element={<HeroNewPage />}
            />
          </Routes>
        </Layout>
      </QueryClientProvider>
    </CyHerosProvider>
  );
}

export default App;
