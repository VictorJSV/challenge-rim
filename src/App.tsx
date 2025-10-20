import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quote from './features/quote/Quote';
import Plans from './features/plans/Plans';
import QuoteSummary from './features/resume/QuoteSummary';
import Layout from './features/layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<>NOT FOUND</>} />
          <Route path="/" element={<Quote />} />
          <Route path="/planes" element={<Plans />} />
          <Route path="/resumen" element={<QuoteSummary />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
