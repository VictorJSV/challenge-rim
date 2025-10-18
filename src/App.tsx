import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="*" element={<>NOT FOUND</>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
