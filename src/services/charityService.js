import api from "./api";

const charityService = {
  // ================= USER =================

  getAllCharities: async () => {
    const res = await api.get("/charity");
    return res.data;
  },

  getCharityById: async (id) => {
    const res = await api.get(`/charity/${id}`);
    return res.data;
  },

  // ================= ADMIN =================

  createCharity: async (data) => {
    const res = await api.post("/charity", data);
    return res.data;
  },

  updateCharity: async (id, data) => {
    const res = await api.put(`/charity/${id}`, data);
    return res.data;
  },

  deleteCharity: async (id) => {
    const res = await api.delete(`/charity/${id}`);
    return res.data;
  },
};

export default charityService;