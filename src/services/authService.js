import api from "./api";
const authService = {
  signup: async (data) => {
    try {
      const response = await api.post("/admin/auth/signup", data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  signin: async (data) => {
    try {
      const response = await api.post("/admin/auth/signin", data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  signout: async () => {
    try {
      const response = await api.get("/admin/auth/signout");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/admin/auth/profile");
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  sendOtp: async (data) => {
    try {
      const response = await api.post("/admin/auth/send-otp", data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  verifyOtp: async (data) => {
    try {
      const response = await api.post("/admin/auth/verify-otp", data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default authService;
