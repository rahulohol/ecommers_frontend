import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";

export default function OrderFailed() {
  return (
    <NavBar>
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4 py-12">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
          
          .failed-container {
            font-family: 'Inter', sans-serif;
          }
          
          .failed-title {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .error-circle {
            animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
          
          .error-cross {
            animation: drawCross 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
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
          
          @keyframes drawCross {
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
        `}
      </style>

      <div className="failed-container max-w-2xl w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <svg
              className="error-circle w-32 h-32 mx-auto"
              viewBox="0 0 52 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
              />
              <path
                className="error-cross"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
                d="M16 16 L36 36 M36 16 L16 36"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center fade-in mb-8">
          <h1 className="failed-title text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Order Failed
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            We couldn't process your order
          </p>
          <p className="text-sm text-slate-500">
            Please try again or contact support if the issue persists
          </p>
        </div>

        {/* Error Details Card */}
        <div className="card bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="border-b border-slate-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              What went wrong?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Payment Processing Issue
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    There was an error processing your payment. Your account has not been charged.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Possible Reasons */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Common reasons for payment failure:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm text-slate-600">
                <svg
                  className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Insufficient funds in your account
              </li>
              <li className="flex items-start text-sm text-slate-600">
                <svg
                  className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Incorrect card details or expired card
              </li>
              <li className="flex items-start text-sm text-slate-600">
                <svg
                  className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Network or connection issues
              </li>
              <li className="flex items-start text-sm text-slate-600">
                <svg
                  className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Bank declined the transaction
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/checkout" className="block">
              <button className="button-primary w-full py-4 px-6 text-white font-semibold rounded-xl shadow-lg">
                Try Again
              </button>
            </Link>
            <Link to="/" className="block">
              <button className="w-full py-4 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all">
                Back to Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            Still having issues?{" "}
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