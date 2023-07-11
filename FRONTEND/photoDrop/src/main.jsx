import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ValidateEmail } from './pages/ValidateEmail.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ValidateEmail />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
