import api from "./api";

const scoreService = {

  // USER
  getMyScores: async () => {
    const res = await api.get("/scores/me");
    return res.data;
  },

  getScores: async () => {
    const res = await api.get("/scores/me");
    return res.data;
  },

  getTodayScore: async () => {
    const res = await api.get("/scores/today");
    return res.data;
  },

  addScore: async (scoreData) => {
    const res = await api.post("/scores", scoreData);
    return res.data;
  },

  updateScore: async (id, data) => {
    const res = await api.put(`/scores/${id}`, data);
    return res.data;
  },

  deleteScore: async (id) => {
    const res = await api.delete(`/scores/${id}`);
    return res.data;
  },

  // ADMIN
  getAllScores: async () => {
    const res = await api.get("/scores/all");
    return res.data;
  },

  getUserScores: async (userId) => {
    const res = await api.get(`/scores/user/${userId}`);
    return res.data;
  }
};

export default scoreService;