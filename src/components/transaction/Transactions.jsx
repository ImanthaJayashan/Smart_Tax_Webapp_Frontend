import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import AddTransactionForm from './AddTransactionForm';
import TransactionTable from './TransactionTable';
import ReportControls from './ReportControls';
import ImageUploadModal from '../ImageUploadModal';
import { transactionApi } from '../../services/api';

const TransactionReport = ({ transactions, startDate, endDate }) => {
  const filteredTransactions = transactions.filter(
    t => t.date >= startDate && t.date <= endDate
  );

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Transaction Report</Text>
          <Text style={styles.subheader}>
            {startDate} to {endDate}
          </Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Date</Text>
              <Text style={styles.tableHeader}>Description</Text>
              <Text style={styles.tableHeader}>Category</Text>
              <Text style={styles.tableHeader}>Amount</Text>
            </View>
            {filteredTransactions.map((transaction) => (
              <View style={styles.tableRow} key={transaction._id || transaction.id || Date.now()}>
                <Text style={styles.tableCell}>{transaction.date}</Text>
                <Text style={styles.tableCell}>{transaction.description}</Text>
                <Text style={styles.tableCell}>{transaction.category}</Text>
                <Text style={styles.tableCell}>LKR {transaction.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.summary}>
            Total Transactions: {filteredTransactions.length}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [reportTransactions, setReportTransactions] = useState([]);

  // Fetch all transactions on load
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Fetch transactions for reporting when date range changes
  useEffect(() => {
    if (generateReport && startDate && endDate) {
      fetchTransactionsByDateRange();
    }
  }, [generateReport, startDate, endDate]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await transactionApi.getAll();
      setTransactions(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Failed to fetch transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionsByDateRange = async () => {
    try {
      const data = await transactionApi.getByDateRange(startDate, endDate);
      setReportTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions for report:", err);
      // We'll just use the full transactions list filtered by date in this case
      setReportTransactions(transactions);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const newTransaction = {
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        amount: parseFloat(transaction.amount),
        imageUrl: transaction.imageUrl || null
      };

      await transactionApi.create(newTransaction);
      // Refresh data from backend instead of updating local state
      await fetchTransactions();
    } catch (err) {
      console.error("Failed to add transaction:", err);
      setError("Failed to add transaction. Please try again.");
    }
  };

  const handleImageUpload = (imageData) => {
    const newTransaction = {
      date: imageData.date || new Date().toISOString().split('T')[0],
      description: imageData.description || 'Image Receipt',
      category: imageData.shopName || 'Retail',
      amount: parseFloat(imageData.amount) || 0,
      imageUrl: imageData.imageUrl
    };
    addTransaction(newTransaction);
    setShowImageModal(false);
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionApi.delete(id);
        // Refresh data from backend instead of filtering local state
        await fetchTransactions();
      } catch (err) {
        console.error("Failed to delete transaction:", err);
        setError("Failed to delete transaction. Please try again.");
      }
    }
  };

  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      // Use _id or id based on availability
      const transactionId = updatedTransaction._id || updatedTransaction.id;
      await transactionApi.update(
        transactionId, 
        {
          date: updatedTransaction.date,
          description: updatedTransaction.description,
          category: updatedTransaction.category,
          amount: parseFloat(updatedTransaction.amount),
          imageUrl: updatedTransaction.imageUrl || null
        }
      );
      
      // Refresh data from backend instead of updating local state
      await fetchTransactions();
      setEditingTransaction(null);
    } catch (err) {
      console.error("Failed to update transaction:", err);
      setError("Failed to update transaction. Please try again.");
    }
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Same as your other pages */}
      <header style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7vZKGmx5-WlrJ-539bkuDt9Bz2gtG_CxrA&s" 
              alt="Tax Logo" 
              className="h-16 w-16 rounded-full border-2 border-white"
            />
            <h1 className="text-lg font-bold">Smart Tax Webapp</h1>
          </div>
          <nav className="flex justify-center items-center w-full space-x-6">
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/transactions" className="hover:text-gray-300 font-bold">Transactions</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="absolute right-4">
              <button
                style={{ backgroundColor: '#eeb029' }}
                className="hover:opacity-90 text-white py-2 px-4 rounded"
              >
                Tax Learning Hub
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Transaction Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">Transaction Manager</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-semibold">Create Transaction</h5>
              <button 
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                onClick={() => setShowImageModal(true)}
              >
                Upload Receipt Image
              </button>
            </div>
            <AddTransactionForm 
              addTransaction={addTransaction} 
              editingTransaction={editingTransaction}
              updateTransaction={handleUpdateTransaction}
              cancelEdit={cancelEdit}
            />
          </div>

          <ImageUploadModal 
            show={showImageModal}
            onClose={() => setShowImageModal(false)}
            onSave={handleImageUpload}
          />

          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-6 mb-8">
            <ReportControls
              generateReport={generateReport}
              setGenerateReport={setGenerateReport}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            {generateReport && startDate && endDate && (
              <div className="mt-4">
                <PDFDownloadLink
                  document={<TransactionReport 
                    transactions={reportTransactions.length > 0 ? reportTransactions : transactions} 
                    startDate={startDate} 
                    endDate={endDate} 
                  />}
                  fileName={`transactions_${startDate}_to_${endDate}.pdf`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  {({ loading }) => (loading ? 'Preparing document...' : 'Download Report')}
                </PDFDownloadLink>
              </div>
            )}
          </div>

          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            {loading ? (
              <p className="text-gray-500">Loading transactions...</p>
            ) : transactions.length > 0 ? (
              <TransactionTable 
                transactions={transactions} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              <p className="text-gray-500">No transactions yet</p>
            )}
          </div>
        </div>
      </main>

      {/* Footer - Same as your other pages */}
      <footer style={{ backgroundColor: '#2b2d78' }} className="text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Smart Tax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 5,
    flex: 1,
    textAlign: 'center',
  },
  summary: {
    marginTop: 20,
    fontSize: 14,
    textAlign: 'right',
  },
});

export default Transactions; 