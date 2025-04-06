import React from "react";
import Homepage from "./components/Homepage";
import AboutUs from './components/AboutUs';
import Transactions from './components/transaction/Transactions';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
};

export default App;