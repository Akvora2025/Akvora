import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import FoundersPage from './components/FoundersPage.jsx';
import FounderProfilePage from './components/FounderProfilePage.jsx';
import CEOPage from './components/CEOPage.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App initialSection="home" />} />
        <Route path="/about" element={<App initialSection="about" />} />
        <Route path="/services" element={<App initialSection="services" />} />
        <Route path="/contact" element={<App initialSection="contact" />} />
        <Route path="/founders" element={<FoundersPage />} />
        <Route path="/founders/aravind" element={<FounderProfilePage founderSlug="aravind" />} />
        <Route path="/founders/karthik" element={<FounderProfilePage founderSlug="karthik" />} />
        <Route path="/founders/aravind-k" element={<Navigate to="/founders/aravind" replace />} />
        <Route path="/founders/karthik-k" element={<Navigate to="/founders/karthik" replace />} />
        <Route path="/ceo" element={<CEOPage />} />
        <Route path="*" element={<App initialSection="home" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
