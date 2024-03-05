import axios from "axios";

axios.defaults.withCredentials = true;

export const signup = async (userData) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/users/register`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/users/login`, credentials);
};

export const logout = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// export const authenticate = async () => {
//   return await axios.get(`${import.meta.env.VITE_API_URL}/users/authenticate`, {
//     withCredentials: true,
//   });
// };

