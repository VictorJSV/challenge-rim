import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quote from './features/quote/Quote';
import Plans from './features/plans/Plans';
import QuoteSummary from './features/summary/Summary';
import Layout from './features/layout/Layout';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="*" element={<>NOT FOUND</>} />
            <Route path="/" element={<Quote />} />
            <Route path="/planes" element={<Plans />} />
            <Route path="/resumen" element={<QuoteSummary />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
