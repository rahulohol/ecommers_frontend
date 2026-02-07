import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";
import NavBar from "../features/navbar/Navbar";

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

export default function OrderSuccess() {
  const params = useParams();
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset cart after successful order
    dispatch(resetCartAsync());
    // Reset order in redux store
    dispatch(resetOrder());
  }, [dispatch]);

  return (
  <NavBar>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
          
          .success-container {
            font-family: 'Inter', sans-serif;
          }
          
          .success-title {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .checkmark-circle {
            animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          
          .checkmark-path {
            animation: drawCheck 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
            stroke-dasharray: 60;
            stroke-dashoffset: 60;
          }
          
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes drawCheck {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          .fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .card {
            animation: fadeInUp 0.6s ease-out 0.2s forwards;
            opacity: 0;
          }
          
          .button-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
          }
          
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #667eea;
            animation: confettiFall 3s linear infinite;
          }
          
          @keyframes confettiFall {
            to {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>

      <div className="success-container max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <svg
              className="checkmark-circle w-32 h-32 mx-auto"
              viewBox="0 0 52 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="checkmark-circle-path"
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
              <path
                className="checkmark-path"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeLinecap="round"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center fade-in mb-8">
          <h1 className="success-title text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-slate-500">
            Order ID: <span className="font-mono font-semibold text-slate-700">#{params.id}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="border-b border-slate-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              What's Next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Order Confirmation Email
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    We've sent a confirmation email to{" "}
                    <span className="font-medium">{user?.email || "your email"}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Track Your Order
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    You can track your order status in the "My Orders" section
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Estimated Delivery
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Your order will be delivered within 5-7 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Order Date</p>
              <p className="text-sm font-semibold text-slate-900">
                {new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Payment Status</p>
              <p className="text-sm font-semibold text-green-600">Confirmed</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/my-orders" className="block">
              <button className="button-primary w-full py-4 px-6 text-white font-semibold rounded-xl shadow-lg">
                View Order Details
              </button>
            </Link>
            <Link to="/" className="block">
              <button className="w-full py-4 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            Need help with your order?{" "}
            <a
              href="/contact"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
    </NavBar>
  );
}