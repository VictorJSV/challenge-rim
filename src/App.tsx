import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './features/layout/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<>NOT FOUND</>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
