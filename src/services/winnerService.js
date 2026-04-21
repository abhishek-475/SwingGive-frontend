import api from './api';

const winnerService = {
  getAllWinners: async () => {
    const res = await api.get('/admin/winners');
    return res.data;
  }
};

export default winnerService;