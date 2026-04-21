import api from "../services/api";

const authService = {
  register: async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
  },

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  },

  getMe: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  updateProfile: async (userId, data) => {
    const res = await api.put(`/admin/user/${userId}`, data);
    return res.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const res = await api.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await api.post("/auth/forgot-password", { email });
    return res.data;
  },

  resetPassword: async (token, newPassword) => {
    const res = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return res.data;
  },
};

export default authService;