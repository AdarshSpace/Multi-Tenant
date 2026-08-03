import { apiFetch } from "./api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export async function startPayment(courseId: string) {
  const res = await apiFetch("/api/payment/create-order", {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  const options = {
    key: data.RAZORPAY_KEY_ID,
    amount: data.order.amount,
    currency: data.order.currency,
    order_id: data.order.id,
    name: "Motionkart.online",
    description: "Course Purchase",
    method: {
      upi: true,
      card: true,
      netbanking: false,
      wallet: false,
    },
    handler: async function (response: any) {
      await apiFetch("/api/payment/verify", {
        method: "POST",
        body: JSON.stringify({
          paymentId: data.paymentId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      window.location.href = "/courses";
    },
    theme: {
      color: "#7c3aed",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
}
