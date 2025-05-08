import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

function ImageUploadModal({ show, onClose, onSave }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState({
    date: '',
    description: '',
    shopName: '',
    amount: ''
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const extractTextFromImage = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    try {
      const { data: { text } } = await Tesseract.recognize(
        image,
        'eng',
        { logger: m => console.log(m) }
      );
      
      const lines = text.split('\n');
      let parsedData = {
        date: '',
        description: '',
        shopName: '',
        amount: ''
      };

      lines.forEach(line => {
        const dateMatch = line.match(/(\d{2}[\/-]\d{2}[\/-]\d{4})/);
        if (dateMatch) parsedData.date = dateMatch[0].replace(/\//g, '-');

        const amountMatch = line.match(/(\d+\.\d{2})/);
        if (amountMatch) parsedData.amount = amountMatch[0];

        if (line.trim() && !parsedData.shopName && !dateMatch) {
          parsedData.shopName = line.trim();
        }

        if (line.match(/[a-zA-Z]{3,}/) && !parsedData.description) {
          parsedData.description = line.trim();
        }
      });

      setExtractedData(parsedData);
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert('Please select an image first');
      return;
    }
    
    const imageUrl = preview;
    onSave({
      ...extractedData,
      imageUrl
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Upload Receipt Image</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Receipt Image</label>
                      <input 
                        type="file" 
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    
                    {preview && (
                      <div className="mt-4">
                        <img 
                          src={preview} 
                          alt="Receipt preview" 
                          className="max-w-full h-auto rounded-lg shadow"
                          style={{ maxHeight: '300px' }}
                        />
                        <button 
                          className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                          onClick={extractTextFromImage}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Extract Data'}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={extractedData.date}
                        onChange={(e) => setExtractedData({...extractedData, date: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={extractedData.shopName}
                        onChange={(e) => setExtractedData({...extractedData, shopName: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={extractedData.description}
                        onChange={(e) => setExtractedData({...extractedData, description: e.target.value})}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <input
                        type="number"
                        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={extractedData.amount}
                        onChange={(e) => setExtractedData({...extractedData, amount: e.target.value})}
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isProcessing || !image}
            >
              Save Transaction
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadModal;