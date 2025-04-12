import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error handler
const handleApiError = (error, operation) => {
  if (error.code === 'ERR_NETWORK') {
    console.error(`Network error during ${operation}:`, error);
    throw new Error('cant connect to the server, please try again later');
  }
  if (error.response) {
    console.error(`Error ${operation}:`, error.response.data);
    throw new Error(error.response.data.message || `Failed to ${operation}`);
  }
  throw error;
};

export const getAllFeedbacks = async () => {
  try {
    const response = await axiosInstance.get('/feedbacks');
    console.log('API Response:', response); // Debug log
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetching feedbacks');
  }
};

export const createNewFeedback = async (feedbackData) => {
  try {
    const response = await axiosInstance.post('/feedback', feedbackData);
    return response.data;
  } catch (error) {
    handleApiError(error, 'creating feedback');
  }
};

export const updateExistingFeedback = async (id, feedbackData) => {
  try {
    console.log(`Making PUT request to /feedback/${id}`, feedbackData);
    const response = await axiosInstance.put(`/feedback/${id}`, feedbackData);
    console.log('Update API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update API error:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to update feedback');
  }
};

export const deleteFeedbackById = async (id) => {
  try {
    console.log(`Making DELETE request to /feedback/${id}`); // Debug log
    const response = await axiosInstance.delete(`/feedback/${id}`);
    console.log('Delete API response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Delete API error:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to delete feedback');
  }
};