import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/', // Adjust this to your API's base URL
  timeout: 10000, // Adjust the timeout as needed
  headers: {
    'Content-Type': 'application/json',
    // You can add other common headers here
  },
});

export default apiClient;