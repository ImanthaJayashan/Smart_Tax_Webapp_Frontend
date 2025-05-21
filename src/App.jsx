import React from "react";
import Homepage from "./components/Homepage"; // Home page
import AboutUs from './components/AboutUs'; // About Us page
import AddTaxDocument from './components/AddTaxDocument'; // Add Tax Document page
import TaxDocuments from "./components/TaxDocuments"; // Tax Documents page
import UpdateTaxDocument from './components/UpdateTaxDocument'; // Update Tax Document page

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/add-tax-document" element={<AddTaxDocument />} />
      <Route path="/tax-documents" element={<TaxDocuments/>} />
      <Route path="/update-tax-document" element={<UpdateTaxDocument />} />
    </Routes>
  );
};

export default App; 