import api from "./api";

const paymentService = {
  // ================= CREATE ORDER =================
  createOrder: async (plan) => {
    const res = await api.post("/payment/create-order", { plan });
    return res.data;
  },

  // ================= VERIFY PAYMENT =================
  verifyPayment: async (paymentData) => {
    const res = await api.post("/payment/verify-payment", paymentData);
    return res.data;
  },

  // ================= GET SUBSCRIPTION STATUS =================
  getSubscriptionStatus: async () => {
    const res = await api.get("/payment/status");
    return res.data;
  },

  // ================= CANCEL SUBSCRIPTION =================
  cancelSubscription: async () => {
    const res = await api.post("/payment/cancel");
    return res.data;
  },
};

export default paymentService;