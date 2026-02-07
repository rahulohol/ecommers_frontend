// export const apiUrl = 'https://full-stack-blogger.onrender.com';
export const apiUrl = "http://localhost:8000";
// export const apiUrl = 'http://localhost:8000';

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};



const handlePayment = async () => {
  const res = await loadRazorpay();
  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  // 1️⃣ Create order
  const orderRes = await fetch("http://localhost:8080/api/payment/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: 999 }),
  });
  const data = await orderRes.json();

  // 2️⃣ Razorpay options
  const options = {
    key: "rzp_test_S9cr8yoPrvtPqp", // test key
    amount: data.order.amount,
    currency: "INR",
    name: "My Ecommerce",
    description: "Order Payment",
    order_id: data.order.id,
    handler: async function (response) {
      // 3️⃣ Verify payment
      const verifyRes = await fetch(
        "http://localhost:8080/api/payment/verify-payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }
      );
      const result = await verifyRes.json();

      if (result.success) {
        alert("Payment Successful");
      } else {
        alert("Payment Failed");
      }
    },
    theme: { color: "#3399cc" },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
export default handlePayment;