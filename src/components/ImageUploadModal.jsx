import React, { useState } from 'react';
import { uploadApi } from '../services/api';

function ImageUploadModal({ show, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadData, setUploadData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    shopName: '',
    amount: ''
  });
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState(null);

  if (!show) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUploadData({
      ...uploadData,
      [name]: value
    });
  };

  const handleExtractData = () => {
    if (!preview) {
      setError('Please select an image first');
      return;
    }

    setExtracting(true);
    setError(null);

    // Simulate extraction with a timeout
    // In a real implementation, this would call an OCR API
    setTimeout(() => {
      // Example extracted data - in real implementation, this would come from OCR
      // In this example, we're just parsing the example receipt from the image
      const extractedData = {
        date: '2025-04-06', // Format it for input field
        shopName: 'CARGILLS FOOD CITY',
        description: 'Grocery receipt',
        amount: '120.96'
      };

      setUploadData({
        ...uploadData,
        ...extractedData
      });
      
      setExtracting(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image to upload');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Upload the image file
      const uploadResult = await uploadApi.uploadImage(file);
      
      // Save the transaction with the image URL
      onSave({
        ...uploadData,
        imageUrl: uploadResult.fileUrl
      });
      
      // Clear form and close modal
      setFile(null);
      setPreview(null);
      setUploadData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        shopName: '',
        amount: ''
      });
      onClose();
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Upload Receipt Image</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Receipt Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border rounded p-2"
            />
            {preview && (
              <div className="mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-60 rounded border"
                />
                <button
                  type="button"
                  onClick={handleExtractData}
                  disabled={extracting}
                  className={`mt-2 w-full py-2 px-4 rounded ${
                    extracting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {extracting ? 'Extracting...' : 'Extract Data'}
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={uploadData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (LKR)
              </label>
              <input
                type="number"
                name="amount"
                value={uploadData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop/Merchant Name
            </label>
            <input
              type="text"
              name="shopName"
              value={uploadData.shopName}
              onChange={handleInputChange}
              placeholder="Enter shop or merchant name"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={uploadData.description}
              onChange={handleInputChange}
              placeholder="Enter a description"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                uploading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? 'Uploading...' : 'Save Receipt'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageUploadModal; 