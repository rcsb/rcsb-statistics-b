import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

declare global {
  interface Window {
    __STATISTICS_BASEROUTE__?: string;
  }
}

const basename = window.__STATISTICS_BASEROUTE__ || '';

const root = ReactDOM.createRoot(
  document.getElementById('statsroot') as HTMLElement
);
root.render(
  <App basename={basename} />
);

