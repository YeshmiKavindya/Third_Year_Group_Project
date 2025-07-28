// API Configuration
export const API_CONFIG = {
  // Development - replace with your computer's IP address
  // To find your IP: Windows: ipconfig, Mac/Linux: ifconfig
  BASE_URL: 'http://192.168.251.99:5000', // Your actual IP address
  
  // Production (when you deploy your backend)
  // BASE_URL: 'https://your-backend-domain.com',
  
  ENDPOINTS: {
    LOGIN: '/taprohq/login',
    SIGNUP: '/taprohq/register',
    LOGOUT: '/taprohq/logout',
    ADD_ITEM: '/taprohq/store/item_stock_details/add',
    GET_ITEMS: '/taprohq/store/item_stock_details',
    UPDATE_ITEM: '/taprohq/store/item_stock_details/update',
    DELETE_ITEM: '/taprohq/store/item_stock_details/delete',
    // Add more endpoints as needed
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to check if we're in development mode
export const isDevelopment = (): boolean => {
  return __DEV__;
}; 