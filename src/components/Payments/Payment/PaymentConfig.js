export const getRazorpayOptions = ({
  paymentRequest,
  requestNumber,
  handlePaymentSuccess,
  handlePaymentCancelled,
}) => {
  return {
    key: process.env.REACT_APP_RAZORPAY_KEY || '',
    amount: Math.round(paymentRequest.amount * 100), // amount in paisa
    currency: "INR",
    name: "Ditvi Biodata",
    description: `Payment for Test Request #${requestNumber}`,
    handler: async function (response) {
      await handlePaymentSuccess(response, paymentRequest.id);
    },
    modal: {
      ondismiss: async function () {
        await handlePaymentCancelled(paymentRequest.id);
      }
    },
    prefill: {
      name: "Guest User",
      email: "",
      contact: ""
    },
    notes: {
      request_number: requestNumber
    },
    theme: {
      color: "#FF8C42"
    }
  };
};