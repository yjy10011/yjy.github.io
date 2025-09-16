import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 确保导入了 BrowserRouter
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter> {/* 确保用 BrowserRouter 包裹 App */}
      <App />
    </BrowserRouter>

);