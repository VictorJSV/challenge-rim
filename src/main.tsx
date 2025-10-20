import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';
import './assets/styles/main.scss';

async function enableMocking() {
  if (import.meta.env.MODE !== 'other') {
    return
  }
  const { worker } = await import('./__mocks__/msw/browser')
  return worker.start()
}


enableMocking().then(() => {
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})
