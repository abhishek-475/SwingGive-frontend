import api from "./api";

const drawService = {
  // ================= CURRENT DRAW =================
  getCurrentDraw: async () => {
    const res = await api.get("/draws/current");
    return res.data;
  },

  // ================= ALL DRAWS =================
  getAllDraws: async () => {
    const res = await api.get("/draws");
    return res.data;
  },

  // ================= SINGLE DRAW =================
  getDrawById: async (id) => {
    const res = await api.get(`/draws/${id}`);
    return res.data;
  },

  // ================= USER WINNINGS =================
  getMyWinnings: async () => {
    const res = await api.get("/draws/winnings/me");
    return res.data;
  },
};

export default drawService;