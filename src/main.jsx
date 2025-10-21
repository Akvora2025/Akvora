import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FoundersPage from './components/FoundersPage.jsx'
import CEOPage from './components/CEOPage.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Dummy function for standalone pages
const dummySetActiveSection = () => {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/founders" element={<FoundersPage setActiveSection={dummySetActiveSection} />} />
        <Route path="/ceo" element={<CEOPage setActiveSection={dummySetActiveSection} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)