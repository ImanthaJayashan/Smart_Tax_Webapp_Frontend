const API_BASE_URL = 'http://localhost:5000/api';

// Transaction-related API calls
export const transactionApi = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error in getAll:', error);
      throw error;
    }
  },

  getByDateRange: async (startDate, endDate) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/report?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions by date range');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error in getByDateRange:', error);
      throw error;
    }
  },

  create: async (transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error in create:', error);
      throw error;
    }
  },

  update: async (id, transactionData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
      });
      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error in update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }
      return await response.json();
    } catch (error) {
      console.error('API Error in delete:', error);
      throw error;
    }
  }
};

// Upload-related API calls
export const uploadApi = {
  uploadImage: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error in uploadImage:', error);
      throw error;
    }
  }
};

export default {
  transactionApi,
  uploadApi
}; 