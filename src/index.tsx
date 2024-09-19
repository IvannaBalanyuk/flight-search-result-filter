import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/app';
import { store } from './app/store';

import './index.css';
import './app/assets/styles/common.css';
import './app/assets/fonts/fonts.module.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
