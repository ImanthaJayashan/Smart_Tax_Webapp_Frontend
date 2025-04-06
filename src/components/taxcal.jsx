import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import jsPDF from 'jspdf'; // Import jsPDF

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const TaxCal = () => {
  const navigate = useNavigate();
  const [taxType, setTaxType] = useState(''); // State for selected tax type
  const [income, setIncome] = useState(''); // State for income (for income tax)
  const [price, setPrice] = useState(''); // State for price (for VAT)
  const [amountToPay, setAmountToPay] = useState(0); // State for calculated tax amount
  const [percentage, setPercentage] = useState(0); // State for tax percentage
  const [taxDetails, setTaxDetails] = useState(''); // State for tax details message
  const [showDetails, setShowDetails] = useState(false); // State to toggle details view
  const [taxTypeError, setTaxTypeError] = useState(false); // State for tax type error

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
    } else if (taxType === 'paye') {
      const salary = parseFloat(income);
      totalAmount = salary;

      // PAYE tax calculation for Sri Lanka
      if (salary <= 3000000) {
        calculatedTax = 0;
        details = `No PAYE tax for an annual salary of LKR ${salary}.`;
      } else if (salary <= 3500000) {
        calculatedTax = (salary - 3000000) * 0.06;
        details = `PAYE tax for LKR ${salary} is calculated at 6%.`;
      } else if (salary <= 4000000) {
        calculatedTax = (salary - 3500000) * 0.12 + 30000;
        details = `PAYE tax for LKR ${salary} is calculated at 12%.`;
      } else if (salary <= 4500000) {
        calculatedTax = (salary - 4000000) * 0.18 + 60000;
        details = `PAYE tax for LKR ${salary} is calculated at 18%.`;
      } else if (salary <= 5000000) {
        calculatedTax = (salary - 4500000) * 0.24 + 90000;
        details = `PAYE tax for LKR ${salary} is calculated at 24%.`;
      } else {
        calculatedTax = (salary - 5000000) * 0.30 + 120000;
        details = `PAYE tax for LKR ${salary} is calculated at 30%.`;
      }
    }

    setAmountToPay(calculatedTax);
    setPercentage(totalAmount > 0 ? ((calculatedTax / totalAmount) * 100).toFixed(2) : 0); // Calculate percentage
    setTaxDetails(details); // Update the tax details message
    setShowDetails(true); // Show the details section
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Tax Calculation Report", 105, 20, null, null, "center");

    // Add a horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Add tax type
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Tax Type: ${taxType}`, 10, 35);

    // Add income/salary or price
    if (taxType === "income" || taxType === "paye") {
      doc.text(`Income/Salary: LKR ${income}`, 10, 45);
    } else if (taxType === "vat") {
      doc.text(`Item Price: LKR ${price}`, 10, 45);
    }

    // Add tax amount and percentage
    doc.text(`Tax Amount: LKR ${amountToPay.toFixed(2)}`, 10, 55);
    doc.text(`Tax Percentage: ${percentage}%`, 10, 65);

    // Add tax details
    doc.setFont("helvetica", "italic");
    doc.text(`Details: ${taxDetails}`, 10, 75);

    // Add table for income tax installments (if applicable)
    if (taxType === "income" && amountToPay > 0) {
      doc.setFont("helvetica", "bold");
      doc.text("Income Tax Installments:", 10, 85);

      const tableData = [
        ["Installment", "Payment Date", "Amount (LKR)"],
        ["1st Installment", "On or before the 15th day of August", (amountToPay * 0.25).toFixed(2)],
        ["2nd Installment", "On or before the 15th day of November", (amountToPay * 0.25).toFixed(2)],
        ["3rd Installment", "On or before the 15th day of February", (amountToPay * 0.25).toFixed(2)],
        ["4th Installment", "On or before the 15th day of May", (amountToPay * 0.15).toFixed(2)],
        ["Final Installment", "On or before six months after year-end", (amountToPay * 0.10).toFixed(2)],
      ];

      let y = 95;
      doc.setFont("helvetica", "normal");
      tableData.forEach((row, index) => {
        if (index === 0) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }
        doc.text(row.join(" | "), 10, y);
        y += 10;
      });
    }

    // Add footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("Generated by Smart Tax Web App", 105, 290, null, null, "center");

    // Save the PDF
    doc.save("Tax_Calculation_Report.pdf");
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
      <main className="flex-grow flex flex-col lg:flex-row justify-center items-start px-4 py-8 space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Calculator Section */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded shadow-md">
          <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
            {taxType === 'income' && 'Income Tax Calculator'}
            {taxType === 'vat' && 'VAT Calculator'}
            {taxType === 'paye' && 'PAYE Tax Calculator'}
            {!taxType && 'Tax Calculator'}
          </h1>

          {/* Tax Type Dropdown */}
          <div className="w-full max-w-md mb-6 mx-auto">
            <label className="block text-lg font-medium text-gray-700 mb-2">Select Tax Type</label>
            <select
              value={taxType}
              onChange={(e) => {
                setTaxType(e.target.value); // Update selected tax type
                setTaxTypeError(false); // Clear error when a valid tax type is selected
              }}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Tax Type</option>
              <option value="income">Income Tax</option>
              <option value="vat">VAT</option>
              <option value="paye">PAYE Tax</option>
            </select>
            {taxTypeError && <p className="text-red-500 text-sm mt-1">Please select a tax type.</p>} {/* Error message */}
          </div>

          {/* Input Fields */}
          {taxType === 'income' && (
            <div className="w-full max-w-md mb-6 mx-auto">
              <label className="block text-lg font-medium text-gray-700 mb-2">Enter Income (LKR):</label>
              <input
                type="number"
                value={income}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    alert("Income cannot be negative.");
                    setIncome('');
                  } else {
                    setIncome(value);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {!income && taxType === 'income' && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid income.</p>
              )}
            </div>
          )}

          {taxType === 'vat' && (
            <div className="w-full max-w-md mb-6 mx-auto">
              <label className="block text-lg font-medium text-gray-700 mb-2">Enter Item Price (LKR):</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    alert("Price cannot be negative.");
                    setPrice('');
                  } else {
                    setPrice(value);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {!price && taxType === 'vat' && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid price.</p>
              )}
            </div>
          )}

          {taxType === 'paye' && (
            <div className="w-full max-w-md mb-6 mx-auto">
              <label className="block text-lg font-medium text-gray-700 mb-2">Enter Annual Salary (LKR):</label>
              <input
                type="number"
                value={income}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    alert("Salary cannot be negative.");
                    setIncome('');
                  } else {
                    setIncome(value);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {!income && taxType === 'paye' && (
                <p className="text-red-500 text-sm mt-1">Please enter a valid salary.</p>
              )}
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={() => {
              if (!taxType) {
                setTaxTypeError(true); // Show error if no tax type is selected
                return;
              }

              // Validate income or price based on the selected tax type
              if ((taxType === 'income' || taxType === 'paye') && !income) {
                alert("Please enter a valid income or salary.");
                return;
              }
              if (taxType === 'vat' && !price) {
                alert("Please enter a valid price.");
                return;
              }

              calculateTax(); // Proceed with tax calculation
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mx-auto block"
          >
            Calculate Tax
          </button>

          {/* Refresh Button */}
          <button
            onClick={() => {
              // Reset all state variables
              setTaxType('');
              setIncome('');
              setPrice('');
              setAmountToPay(0);
              setPercentage(0);
              setTaxDetails('');
              setShowDetails(false);
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition mx-auto block mt-4"
          >
            Refresh
          </button>

          {/* Tax Calculation Result */}
          {taxDetails && (
            <div className="mt-8 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded w-full max-w-md mx-auto">
              <p className="text-center">{taxDetails}</p> {/* Center the text */}
            </div>
          )}

          {amountToPay > 0 && (
            <div className="mt-8 w-full max-w-md mx-auto text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Tax Amount: LKR {amountToPay.toFixed(2)}</h2>
              <h3 className="text-lg font-medium text-gray-600 mb-4">Tax Percentage: {percentage}%</h3>
              <div className="flex justify-center mb-6">
                <Pie data={chartData} />
              </div>

              {/* Income Tax Installments Table */}
              {taxType === 'income' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Income Tax Installments</h3>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Installment</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Payment Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Amount (LKR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">1st Installment</td>
                        <td className="border border-gray-300 px-4 py-2">On or before the 15th day of the month of August, of that year of assessment</td>
                        <td className="border border-gray-300 px-4 py-2">{(amountToPay * 0.25).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">2nd Installment</td>
                        <td className="border border-gray-300 px-4 py-2">On or before the 15th day of the month of November, of that year of assessment</td>
                        <td className="border border-gray-300 px-4 py-2">{(amountToPay * 0.25).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">3rd Installment</td>
                        <td className="border border-gray-300 px-4 py-2">On or before the 15th day of the month of February, of that year of assessment</td>
                        <td className="border border-gray-300 px-4 py-2">{(amountToPay * 0.25).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">4th Installment</td>
                        <td className="border border-gray-300 px-4 py-2">On or before the 15th day of the month of May, of the next succeeding year of assessment</td>
                        <td className="border border-gray-300 px-4 py-2">{(amountToPay * 0.15).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">Final Installment</td>
                        <td className="border border-gray-300 px-4 py-2">On or before the date that is after six months end, of that year of assessment</td>
                        <td className="border border-gray-300 px-4 py-2">{(amountToPay * 0.10).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Generate Report Button */}
              <button
                onClick={generatePDF}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition mt-4"
              >
                Save PDF
              </button>
            </div>
          )}
        </div>

        {/* Rules and Regulations Section */}
        {showDetails && (
          <div className="w-full lg:w-1/2 bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Rules and Regulations</h2>

            {/* Income Tax Section */}
            {taxType === 'income' && (
              <div className="text-gray-600">
                <p>
                  <strong>Income Tax</strong> <br />
                  Income tax is charged on the basis of the provisions under the Inland Revenue Act, No. 24 of 2017 as amended by the Inland Revenue (Amendment) Act, No. 10 of 2021. The Inland Revenue Act provides the legal authority to charge, levy and collect income tax on the gains and profits of every person, which arose or is arising to such person for every year of assessment commencing after 1st of April, 2018.
                </p>
                <br />
                <p>
                  <strong>Sources of Income:</strong>
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li><strong>Employment Income:</strong> Calculation of an individual's gains and profits from employment for a year of assessment.</li>
                  <li><strong>Business Income:</strong> A person's income from a business for a year of assessment is the person's gains and profits from conducting the business for the year.</li>
                  <li><strong>Investment Income:</strong> A person's income from an investment for a year of assessment is the person's gains and profits from conducting the investment for the year.</li>
                  <li><strong>Other Income:</strong> A person’s income from other sources for a year of assessment is the person’s gains and profits from any source of any kind, however, it does not include profits of a casual and non-recurring nature.</li>
                </ul>
                <br />
                <p>
                  <strong>Income Tax Description:</strong> <br />
                  In respect of a person who is deemed to be resident in Sri Lanka, income tax is chargeable on income from Sri Lanka and income derived from outside Sri Lanka. The liability to income tax therefore extends to global income. A person who is deemed to be non-resident in Sri Lanka is chargeable with income tax only on the gains and profits arising or derived from Sri Lanka.​​
                </p>
              </div>
            )}

            {/* VAT Section */}
            {taxType === 'vat' && (
              <div className="text-gray-600">
                <p>
                  <strong>Value Added Tax (VAT)</strong> <br />
                  Value Added Tax (VAT) is introduced by the Act No. 14 of 2002 and is in force from 1st August, 2002. VAT Act replaced the Goods and Services Tax (GST), which was almost similar tax on the consumption of goods and services.
                </p>
                <br />
                <p>
                  It is a tax on domestic consumption of goods and services. The goods imported into Sri Lanka and goods and services supplied within the territorial limits of Sri Lanka are the subject matter of this tax. It is a multi-stage tax levied on the incremental Value at every stage in the production and distribution chain of Goods and Services. The tax is borne by the final or the ultimate consumer of Goods or services. It is an indirect tax and the Government will receive at the end, through all the intermediary suppliers in the chain of production and distribution, an amount equal to the amount paid by the final consumer.
                </p>
                <br />
                <p>
                  There are certain supplies of goods and services exempt from VAT. (As mentioned in the Part II of the First Schedule of VAT Act)
                </p>
                <br />
                <p>
                  <strong>Chargeability for Value Added Tax excluding chargeability on Financial Services:</strong>
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Manufactures</li>
                  <li>Importers</li>
                  <li>Service providers</li>
                  <li>Suppliers who supply goods under tender agreement</li>
                  <li>Wholesale and Retail Trade</li>
                </ul>
                <br />
                <p>
                  <strong>Registration Threshold:</strong> <br />
                  Value of taxable supply of goods or services other than financial services by any person including wholesale and retail trade (with effect from 01.01.2024):
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Exceeds Rs. 15 million for a quarter</li>
                  <li>Exceeds Rs. 60 million for a 12-month period</li>
                </ul>
                <br />
                <p>
                  <strong>VAT Rates:</strong>
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Zero Rate (0%) - Exports</li>
                  <li>Standard Rate - 18% (from 01.01.2024)</li>
                </ul>
                <br />
                <p>
                  <strong>Responsibilities of a Registered Person:</strong>
                </p>
                <ul className="list-disc list-inside mt-2">
                  <li>Display the Certificate of Registration at a clearly visible place in the business premises.</li>
                  <li>Issue tax invoices (to other registered persons).</li>
                  <li>Keep accounts for relevant periods.</li>
                  <li>Pay taxes and furnish returns on or before due dates.</li>
                </ul>
              </div>
            )}

            {/* PAYE Section */}
            {taxType === 'paye' && (
              <div className="text-gray-600">
                <p>
                  <strong>Pay As You Earn Tax (PAYE)</strong> <br />
                  In terms of Section 114 of the Inland Revenue Act No. 10 of 2006 or Section 83 of the Inland Revenue Act No. 24 of 2017 (from 1st April, 2018), Employers are required to deduct Income Tax on Employment Income of employees at the time of payment of remuneration.
                </p>
                <br />
                <p>
                  For this purpose, the Commissioner General of Inland Revenue specifies Tax Tables which are to be used in making such tax deductions. Since the Tax is paid at the time of earning the remuneration, this system is called the Pay-As-You-Earn System (PAYE).
                </p>
                <br />
                <p>
                  <strong>Payment of Tax:</strong> <br />
                  Every employer has an obligation to deduct PAYE Tax from the Employee as per PAYE tax tables, and the total deducted amount should be remitted to the department on or before the 15th of the following month.
                </p>
                <br />
                <p>
                  <strong>Furnishing PAYE Returns:</strong> <br />
                  <strong>Due date:</strong> Return of PAYE Tax (PAYE) for a relevant Assessment Year should be furnished on or before the 30th day of the month of April of the following Assessment Year.
                </p>
                <p>
                  <strong>Submit to:</strong> Central Document Management Unit (CDMU), 1st Floor of Inland Revenue building.
                </p>
              </div>
            )}
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
