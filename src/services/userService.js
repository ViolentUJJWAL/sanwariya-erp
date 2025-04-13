import api from './api'; // Adjust the path as needed

// Get all users with pagination, search, and filters
export const getAllUsers = async (params = {}) => {
  try {
    const { search, isVerified, page = 1, limit = 20 } = params;
    let queryString = `?page=${page}&limit=${limit}`;
    
    if (search) queryString += `&search=${encodeURIComponent(search)}`;
    if (isVerified !== undefined) queryString += `&isVerified=${isVerified}`;
    
    const response = await api.get(`/admin/users${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
