import Cookies from 'js-cookie';

/**
 * Checks if a user is authenticated by verifying the presence of an authentication token in cookies
 * @returns {boolean} True if the authentication token exists, false otherwise
 */
export const isAuthenticated = () => {
  const token = Cookies.get('token'); // Assuming your token is stored in a cookie named 'token'
  return !!token; // Returns true if token exists and is not empty
};

/**
 * Gets the authentication token from cookies
 * @returns {string|null} The token string or null if not found
 */
export const getAuthToken = () => {
  return Cookies.get('token') || null;
};
