import api from "./api";

const handleApiError = (error) => {
  console.error("API Error:", error);
  throw new Error(error.response?.data?.message || error.message);
};

const ProductService = {
  createProduct: async (formData) => {
    try {
      const response = await api.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateProduct: async (productId, formData) => {
    try {
      const response = await api.put(`/admin/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/admin/products/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await api.delete(`/admin/products/${productId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateProductStatus: async (productId) => {
    try {
      const response = await api.patch(`/admin/products/${productId}/status`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateStock: async (productId, varietyId, stock) => {
    try {
      const response = await api.patch(`/admin/products/${productId}/variety/${varietyId}/stock`, { stock });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updatePrice: async (productId, varietyId, priceData) => {
    try {
      const response = await api.patch(`/admin/products/${productId}/variety/${varietyId}/price`, priceData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getAllProducts: async (params) => {
    try {
      const response = await api.get("/admin/products", { params });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateReview: async (productId, reviewId, reviewData) => {
    try {
      const response = await api.put(`/admin/products/${productId}/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  deleteReview: async (productId, reviewId) => {
    try {
      const response = await api.delete(`/admin/products/${productId}/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  getProductStats: async () => {
    try {
      const response = await api.get("/admin/products/stats");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

export default ProductService;
