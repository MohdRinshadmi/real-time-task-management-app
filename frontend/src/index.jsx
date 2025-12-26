import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import { Flip } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import store from './store/store.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <App />
    <ToastContainer position="bottom-center" pauseOnHover={false} autoClose={2000} theme='colored' transition={Flip} />
    </Provider>
  </React.StrictMode>,
)
