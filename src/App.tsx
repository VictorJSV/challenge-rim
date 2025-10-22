import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quote from './features/quote/Quote';
import Layout from './features/layout/Layout';
import Container from './shared/components/Container/Container';

const Plans = React.lazy(() => import('./features/plans/Plans'));
const Summary = React.lazy(() => import('./features/summary/Summary'));

const Loading = () => (
  <Container>
    <div className="c-general-msg">Cargando...</div>
  </Container>
);

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="*" element={<>NOT FOUND</>} />
            <Route path="/" element={<Quote />} />
            <Route path="/planes" element={<Plans />} />
            <Route path="/resumen" element={<Summary />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
