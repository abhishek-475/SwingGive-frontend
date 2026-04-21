import api from "./api";

const scoreService = {
  // ================= USER =================

  // Get logged-in user scores
  getMyScores: async () => {
    const res = await api.get("/scores/me");
    return res.data;
  },

  //if Dashboard still uses getScores
  getScores: async () => {
    const res = await api.get("/scores/me");
    return res.data;
  },

  // Get today's score
  getTodayScore: async () => {
    const res = await api.get("/scores/today");
    return res.data;
  },

  // Add new score
  addScore: async (scoreData) => {
    const res = await api.post("/scores", scoreData);
    return res.data;
  },

  // ================= ADMIN =================

  // Get all scores (admin only)
  getAllScores: async () => {
    const res = await api.get("/scores/all");
    return res.data;
  },

  // Get scores of a specific user (admin only)
  getUserScores: async (userId) => {
    const res = await api.get(`/scores/user/${userId}`);
    return res.data;
  },

  // Delete score (admin only)
  deleteScore: async (id) => {
    const res = await api.delete(`/scores/${id}`);
    return res.data;
  },
};

export default scoreService;