import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import SurveySection from './SurveySection';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/survey' element={<SurveySection/>}/>
    </Routes>
    </BrowserRouter>
    {/* <App/> */}
  </React.StrictMode>
);

reportWebVitals();
