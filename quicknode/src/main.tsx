import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const ws = new WebSocket('wss://your-websocket-server');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received NFT sale:', data);
  // Update your application state with the new data
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)