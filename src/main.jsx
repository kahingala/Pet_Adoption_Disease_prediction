import { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux';
import store from './Redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
