import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const TaxCal = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const [taxType, setTaxType] = useState('income'); // State for selected tax type
  const [income, setIncome] = useState(''); // State for income (for income tax)
  const [price, setPrice] = useState(''); // State for price (for VAT)
  const [amountToPay, setAmountToPay] = useState(0); // State for calculated tax amount
  const [percentage, setPercentage] = useState(0); // State for tax percentage
  const [taxDetails, setTaxDetails] = useState(''); // State for tax details message

  const handleTaxTypeChange = (e) => {
    setTaxType(e.target.value); // Update selected tax type
  };

  const calculateTax = () => {
    let calculatedTax = 0;
    let details = '';
    let totalAmount = 0;

    if (taxType === 'income') {
      const incomeValue = parseFloat(income);
      totalAmount = incomeValue;
      if (incomeValue <= 300000) {
        details = `No tax to pay for LKR ${incomeValue}.`;
        calculatedTax = 0;
      } else {
        const taxRate = 0.06; // Example rate for income tax above 300,000 LKR
        calculatedTax = incomeValue * taxRate;
        details = `Income tax for LKR ${incomeValue} is calculated at 6%.`;
      }
    } else if (taxType === 'vat') {
      const priceValue = parseFloat(price);
      totalAmount = priceValue;
      if (priceValue <= 0) {
        details = `No tax to pay for LKR ${priceValue}.`;
        calculatedTax = 0;
      } else {
        const vatRate = 0.15; // Example VAT rate (15%)
        calculatedTax = priceValue * vatRate;
        details = `VAT for LKR ${priceValue} is calculated at 15%.`;
      }
    }

    setAmountToPay(calculatedTax);
    setPercentage(totalAmount > 0 ? ((calculatedTax / totalAmount) * 100).toFixed(2) : 0); // Calculate percentage
    setTaxDetails(details); // Update the tax details message
  };

  // Data for the chart
  const chartData = {
    labels: ['Tax Amount (%)', 'Remaining Amount (%)'],
    datasets: [
      {
        data: [percentage, 100 - percentage], // Use percentage for the chart
        backgroundColor: ['#FF0000', '#00FF00'],
      },
    ],
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1619252584172-a83a949b6efd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdoaXRlJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f0f0f0', // Fallback background color
      }}
    >
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s"
            alt="Tax Logo"
            className="h-16 w-16 rounded-full border-2 border-white"
          />
          <h1 className="text-lg font-bold">Tax Calculator</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/about" className="hover:text-gray-300">About</a></li>
            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
        <button
          onClick={() => navigate('/tax_learning_home')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Tax Calculator</h1>

        {/* Tax Type Dropdown */}
        <div className="w-full max-w-md mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">Select Tax Type</label>
          <select
            value={taxType}
            onChange={handleTaxTypeChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="income">Income Tax</option>
            <option value="vat">VAT</option>
          </select>
        </div>

        {/* Input Fields */}
        {taxType === 'income' && (
          <div className="w-full max-w-md mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Enter Income (LKR):</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {taxType === 'vat' && (
          <div className="w-full max-w-md mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Enter Item Price (LKR):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <button
          onClick={calculateTax}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Calculate Tax
        </button>

        {/* Tax Calculation Result */}
        {taxDetails && (
          <div className="mt-8 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded w-full max-w-md text-center">
            <p>{taxDetails}</p>
          </div>
        )}

        {amountToPay > 0 && (
          <div className="mt-8 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Tax Amount: LKR {amountToPay.toFixed(2)}</h2>
            <h3 className="text-lg font-medium text-gray-600 mb-4">Tax Percentage: {percentage}%</h3>
            <div className="flex justify-center">
              <Pie data={chartData} />
            </div>
          </div>
        )}

        {/* Income Tax Payment Schedule Table */}
        {amountToPay > 0 && (
          <div className="mt-8 bg-white p-6 rounded shadow-md w-full max-w-3xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Income Tax Payment Schedule</h2>
            <table className="table-auto w-full text-gray-700">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Installment</th>
                  <th className="border px-4 py-2">Payment Date</th>
                  <th className="border px-4 py-2">Approximate Amount (LKR)</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const installments = 4; // Number of installments
                  const baseAmount = Math.floor(amountToPay / installments); // Base amount for each installment
                  const remainder = amountToPay % installments; // Remainder to add to the final installment
                  const paymentSchedule = [
                    { installment: '1st Installment', date: 'On or before 15th August', amount: baseAmount },
                    { installment: '2nd Installment', date: 'On or before 15th November', amount: baseAmount },
                    { installment: '3rd Installment', date: 'On or before 15th February', amount: baseAmount },
                    { installment: '4th Installment', date: 'On or before 15th May (next year)', amount: baseAmount + remainder },
                  ];

                  return paymentSchedule.map((payment, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{payment.installment}</td>
                      <td className="border px-4 py-2">{payment.date}</td>
                      <td className="border px-4 py-2">LKR {payment.amount.toFixed(2)}</td>
                    </tr>
                  ));
                })()}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Smart Tax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TaxCal;
