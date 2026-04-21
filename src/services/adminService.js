import api from "./api";

const adminService = {
  // ================= DASHBOARD =================
  getStats: async () => {
    const res = await api.get("/admin/dashboard");
    return res.data;
  },

  // ================= USERS =================
  getAllUsers: async () => {
    const res = await api.get("/admin/users");
    return res.data;
  },

  getUserById: async (id) => {
    const res = await api.get(`/admin/user/${id}`);
    return res.data;
  },

  updateUser: async (id, data) => {
    const res = await api.put(`/admin/user/${id}`, data);
    return res.data;
  },

  // ================= DRAW (FROM DRAW ROUTES, NOT ADMIN) =================
  runDraw: async (drawType) => {
    const res = await api.post("/draws/run", { drawType });
    return res.data;
  },

  publishDraw: async (drawId) => {
    const res = await api.post(`/draws/publish/${drawId}`);
    return res.data;
  },

  // ================= OPTIONAL =================
  getAllDraws: async () => {
    const res = await api.get("/draws");
    return res.data;
  },

  getDrawById: async (id) => {
    const res = await api.get(`/draws/${id}`);
    return res.data;
  },

  getWinnersMe: async () => {
    const res = await api.get("/draws/winnings/me");
    return res.data;
  },
};

export default adminService;