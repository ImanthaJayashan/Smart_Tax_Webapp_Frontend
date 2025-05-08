import React from "react";
import Homepage from "./components/Homepage"; //home page
import AboutUs from './components/AboutUs'; // AboutUs import
import Tax_Learning_home from './components/Tax_Learning_home'; // Tax_Learning_home import
import LearnAboutTax from './components/LearnAboutTax'; // LearnAboutTax import
import TaxCal from './components/taxcal'; // Import the TaxCal component
import Taxform from './components/taxform'; // Import the Taxform component
import { Route, Routes } from 'react-router-dom';
import Transactions from './components/transaction/Transactions';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/Tax_learning_home" element={<Tax_Learning_home />} /> {/* Fixed */}
      <Route path="/LearnAboutTax" element={<LearnAboutTax />} /> {/* Fixed */}
      <Route path="/taxcal" element={<TaxCal />} /> {/* Add this route */}
      <Route path="/taxform" element={<Taxform />} /> {/* Add this route */}
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
};

export default App;