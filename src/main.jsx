import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import FoundersPage from './components/FoundersPage.jsx';
import FounderProfilePage from './components/FounderProfilePage.jsx';
import CEOPage from './components/CEOPage.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App initialSection="home" />} />
        <Route path="/about" element={<App initialSection="about" />} />
        <Route path="/services" element={<App initialSection="services" />} />
        <Route path="/contact" element={<App initialSection="contact" />} />
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/founders/aravind-k" element={<FounderProfilePage founderSlug="aravind-k" />} />
        <Route path="/founders/karthik-k" element={<FounderProfilePage founderSlug="karthik-k" />} />
        <Route path="/ceo" element={<CEOPage />} />
        <Route path="*" element={<App initialSection="home" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
