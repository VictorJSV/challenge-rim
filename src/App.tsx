import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Quote from './features/quote/Quote';
import PlanSelector from './features/plans/PlanSelector';
import QuoteSummary from './features/resume/QuoteSummary';
import Layout from './features/layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<>NOT FOUND</>} />
          <Route path="/" element={<Quote />} />
          <Route path="/planes" element={<PlanSelector />} />
          <Route path="/resumen" element={<QuoteSummary />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
