// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchOrderByIdAsync, selectOrderById, selectOrderStatus } from "../../order/orderSlice";
// import { Grid } from "react-loader-spinner";

// // Convert USD to INR
// function formatINRR(usdPrice) {
//   const inrPrice = Math.round(usdPrice * 83);
//   return inrPrice.toLocaleString('en-IN');
// }

// export default function OrderTracking() {
//   const params = useParams();
//   const dispatch = useDispatch();
//   const order = useSelector(selectOrderById);
//   const status = useSelector(selectOrderStatus);

//   useEffect(() => {
//     dispatch(fetchOrderByIdAsync(params.id));
//   }, [dispatch, params.id]);

//   console.log("Order in Tracking Component:", order);

//   const getStatusConfig = (statusValue) => {
//     const statusUpper = statusValue?.toUpperCase();
//     switch (statusUpper) {
//       case "PENDING":
//         return {
//           color: "text-amber-600",
//           bg: "bg-amber-50",
//           border: "border-amber-300",
//           icon: "⏳",
//         };
//       case "CONFIRMED":
//         return {
//           color: "text-blue-600",
//           bg: "bg-blue-50",
//           border: "border-blue-300",
//           icon: "✓",
//         };
//       case "SHIPPED":
//         return {
//           color: "text-purple-600",
//           bg: "bg-purple-50",
//           border: "border-purple-300",
//           icon: "🚚",
//         };
//       case "DELIVERED":
//         return {
//           color: "text-green-600",
//           bg: "bg-green-50",
//           border: "border-green-300",
//           icon: "✓",
//         };
//       case "CANCELLED":
//         return {
//           color: "text-red-600",
//           bg: "bg-red-50",
//           border: "border-red-300",
//           icon: "✕",
//         };
//       default:
//         return {
//           color: "text-gray-600",
//           bg: "bg-gray-50",
//           border: "border-gray-300",
//           icon: "●",
//         };
//     }
//   };

//   const getProgressPercentage = (status) => {
//     const statusMap = {
//       PENDING: 20,
//       CONFIRMED: 40,
//       SHIPPED: 70,
//       DELIVERED: 100,
//       CANCELLED: 0,
//     };
//     return statusMap[status?.toUpperCase()] || 0;
//   };

//   if (status === "loading") {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Grid
//           height="80"
//           width="80"
//           color="rgb(99, 102, 241)"
//           ariaLabel="grid-loading"
//           radius="12.5"
//           visible={true}
//         />
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-slate-900 mb-4">Order Not Found</h1>
//           <Link
//             to="/my-orders"
//             className="text-indigo-600 hover:text-indigo-700 font-medium"
//           >
//             ← Back to My Orders
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const statusConfig = getStatusConfig(order.status);
//   const progress = getProgressPercentage(order.status);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
          
//           .tracking-container {
//             font-family: 'Inter', sans-serif;
//           }
          
//           .tracking-title {
//             font-family: 'Playfair Display', serif;
//           }
          
//           .fade-in {
//             animation: fadeIn 0.6s ease-out forwards;
//           }
          
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
          
//           .slide-up {
//             animation: slideUp 0.5s ease-out forwards;
//             opacity: 0;
//           }
          
//           @keyframes slideUp {
//             from { opacity: 0; transform: translateY(30px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
          
//           .slide-up:nth-child(1) { animation-delay: 0.1s; }
//           .slide-up:nth-child(2) { animation-delay: 0.2s; }
//           .slide-up:nth-child(3) { animation-delay: 0.3s; }
          
//           .progress-bar {
//             transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
//           }
          
//           .timeline-item {
//             transition: all 0.3s ease;
//           }
          
//           .timeline-item:hover {
//             transform: translateX(8px);
//           }
          
//           .pulse-dot {
//             animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//           }
          
//           @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.5; }
//           }
          
//           .tracking-card {
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           }
          
//           .tracking-card:hover {
//             transform: translateY(-4px);
//             box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
//           }
//         `}
//       </style>

//       <div className="tracking-container max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="fade-in mb-8">
//           <Link
//             to="/my-orders"
//             className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4"
//           >
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             Back to Orders
//           </Link>
//           <h1 className="tracking-title text-4xl md:text-5xl font-bold text-slate-900 mb-2">
//             Track Your Order
//           </h1>
//           <p className="text-slate-600 text-lg">
//             Order ID: <span className="font-mono font-semibold">#{order.id.slice(-12).toUpperCase()}</span>
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Main Tracking Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Current Status Card */}
//             <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <p className="text-sm text-slate-500 mb-1">Current Status</p>
//                   <div className="flex items-center gap-3">
//                     <span className="text-4xl">{statusConfig.icon}</span>
//                     <h2 className={`text-3xl font-bold ${statusConfig.color} capitalize`}>
//                       {order.status}
//                     </h2>
//                   </div>
//                 </div>
//                 {order.estimatedDelivery && order.status !== "DELIVERED" && (
//                   <div className="text-right">
//                     <p className="text-sm text-slate-500 mb-1">Estimated Delivery</p>
//                     <p className="text-lg font-semibold text-slate-900">
//                       {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Progress Bar */}
//               {order.status !== "CANCELLED" && (
//                 <div className="mb-6">
//                   <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
//                     <div
//                       className={`progress-bar h-full ${statusConfig.bg} ${statusConfig.border} border-2 rounded-full transition-all duration-1000`}
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>
//                   <div className="flex justify-between mt-2 text-xs text-slate-500">
//                     <span>Pending</span>
//                     <span>Confirmed</span>
//                     <span>Shipped</span>
//                     <span>Delivered</span>
//                   </div>
//                 </div>
//               )}

//               {/* Courier Info */}
//               {order.courierInfo && (
//                 <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
//                   <h3 className="text-sm font-semibold text-slate-900 mb-3">
//                     Courier Information
//                   </h3>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-slate-500">Courier Name</p>
//                       <p className="text-sm font-semibold text-slate-900">
//                         {order.courierInfo.name}
//                       </p>
//                     </div>
//                     {order.courierInfo.trackingNumber && (
//                       <div>
//                         <p className="text-xs text-slate-500">Tracking Number</p>
//                         <p className="text-sm font-mono font-semibold text-indigo-600">
//                           {order.courierInfo.trackingNumber}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Tracking Timeline */}
//             <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
//               <h3 className="text-2xl font-bold text-slate-900 mb-6">
//                 Tracking Timeline
//               </h3>
              
//               {order.trackingHistory && order.trackingHistory.length > 0 ? (
//                 <div className="space-y-6">
//                   {[...order.trackingHistory].reverse().map((track, index) => {
//                     const trackConfig = getStatusConfig(track.status);
//                     const isLatest = index === 0;

//                     return (
//                       <div
//                         key={track.id || index}
//                         className="timeline-item flex gap-4"
//                       >
//                         <div className="flex flex-col items-center">
//                           <div
//                             className={`w-12 h-12 rounded-full flex items-center justify-center ${trackConfig.bg} ${trackConfig.border} border-2 ${
//                               isLatest ? "pulse-dot" : ""
//                             }`}
//                           >
//                             <span className="text-xl">{trackConfig.icon}</span>
//                           </div>
//                           {index !== order.trackingHistory.length - 1 && (
//                             <div className="w-0.5 h-full bg-slate-200 my-2" />
//                           )}
//                         </div>

//                         <div className="flex-1 pb-6">
//                           <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
//                             <div className="flex justify-between items-start mb-2">
//                               <h4
//                                 className={`font-semibold ${trackConfig.color} capitalize`}
//                               >
//                                 {track.status}
//                               </h4>
//                               <span className="text-xs text-slate-500">
//                                 {new Date(track.timestamp).toLocaleString("en-IN", {
//                                   day: "numeric",
//                                   month: "short",
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })}
//                               </span>
//                             </div>
//                             <p className="text-sm text-slate-700 mb-1">
//                               {track.message}
//                             </p>
//                             {track.location && (
//                               <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
//                                 <svg
//                                   className="w-4 h-4"
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                 >
//                                   <path
//                                     fillRule="evenodd"
//                                     d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                                     clipRule="evenodd"
//                                   />
//                                 </svg>
//                                 {track.location}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-slate-500">
//                   <svg
//                     className="w-16 h-16 mx-auto mb-4 text-slate-300"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   <p>No tracking updates available yet</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Order Summary */}
//             <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">
//                 Order Summary
//               </h3>
              
//               <div className="space-y-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Order Date</span>
//                   <span className="font-semibold text-slate-900">
//                     {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Total Items</span>
//                   <span className="font-semibold text-slate-900">
//                     {order.totalItems}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Payment Method</span>
//                   <span className="font-semibold text-slate-900">
//                     {order.paymentMethod}
//                   </span>
//                 </div>

//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-600">Payment Status</span>
//                   <span
//                     className={`font-semibold ${
//                       order.paymentStatus === "PAID"
//                         ? "text-green-600"
//                         : order.paymentStatus === "FAILED"
//                         ? "text-red-600"
//                         : "text-amber-600"
//                     }`}
//                   >
//                     {order.paymentStatus}
//                   </span>
//                 </div>

//                 <div className="pt-4 border-t border-slate-200">
//                   <div className="flex justify-between">
//                     <span className="text-slate-900 font-semibold">Total Amount</span>
//                     <span className="text-2xl font-bold text-indigo-600">
//                       ₹{formatINR(order.totalAmount)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Delivery Address */}
//             <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">
//                 Delivery Address
//               </h3>
              
//               <div className="space-y-2 text-sm">
//                 <p className="font-semibold text-slate-900">
//                   {order.selectedAddress.name}
//                 </p>
//                 <p className="text-slate-600">{order.selectedAddress.street}</p>
//                 <p className="text-slate-600">
//                   {order.selectedAddress.city}, {order.selectedAddress.state}
//                 </p>
//                 <p className="text-slate-600">
//                   PIN: {order.selectedAddress.pinCode}
//                 </p>
//                 <p className="text-slate-600 pt-2 border-t border-slate-200 mt-2">
//                   Phone: {order.selectedAddress.phone}
//                 </p>
//               </div>
//             </div>

//             {/* Items */}
//             <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">
//                 Items ({order.items.length})
//               </h3>
              
//               <div className="space-y-3">
//                 {order.items.slice(0, 3).map((item, index) => (
//                   <div key={index} className="flex gap-3">
//                     <img
//                       src={item.product.thumbnail}
//                       alt={item.product.title}
//                       className="w-16 h-16 rounded-lg object-cover border border-slate-200"
//                     />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-semibold text-slate-900 truncate">
//                         {item.product.title}
//                       </p>
//                       <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//                 {order.items.length > 3 && (
//                   <p className="text-sm text-slate-500 text-center pt-2">
//                     +{order.items.length - 3} more items
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  fetchOrderByIdAsync, 
  selectCurrentOrder,  // ← Changed from selectOrderById
  selectOrderStatus 
} from "../../order/orderSlice";
import { Grid } from "react-loader-spinner";

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

export default function OrderTracking() {
  const params = useParams();
  const dispatch = useDispatch();
  
  // ✅ Use selectCurrentOrder instead of selectOrderById
  const order = useSelector(selectCurrentOrder);
  const status = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchOrderByIdAsync(params.id));
  }, [dispatch, params.id]);

  console.log("Order in Tracking Component:", order);

  const getStatusConfig = (statusValue) => {
    const statusUpper = statusValue?.toUpperCase();
    switch (statusUpper) {
      case "PENDING":
        return {
          color: "text-amber-600",
          bg: "bg-amber-50",
          border: "border-amber-300",
          icon: "⏳",
        };
      case "CONFIRMED":
        return {
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-300",
          icon: "✓",
        };
      case "SHIPPED":
        return {
          color: "text-purple-600",
          bg: "bg-purple-50",
          border: "border-purple-300",
          icon: "🚚",
        };
      case "DELIVERED":
        return {
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-300",
          icon: "✓",
        };
      case "CANCELLED":
        return {
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-300",
          icon: "✕",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-300",
          icon: "●",
        };
    }
  };

  const getProgressPercentage = (status) => {
    const statusMap = {
      PENDING: 20,
      CONFIRMED: 40,
      SHIPPED: 70,
      DELIVERED: 100,
      CANCELLED: 0,
    };
    return statusMap[status?.toUpperCase()] || 0;
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Grid
          height="80"
          width="80"
          color="rgb(99, 102, 241)"
          ariaLabel="grid-loading"
          radius="12.5"
          visible={true}
        />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Order Not Found</h1>
          <Link
            to="/my-orders"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const progress = getProgressPercentage(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
          
          .tracking-container {
            font-family: 'Inter', sans-serif;
          }
          
          .tracking-title {
            font-family: 'Playfair Display', serif;
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .slide-up {
            animation: slideUp 0.5s ease-out forwards;
            opacity: 0;
          }
          
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .slide-up:nth-child(1) { animation-delay: 0.1s; }
          .slide-up:nth-child(2) { animation-delay: 0.2s; }
          .slide-up:nth-child(3) { animation-delay: 0.3s; }
          
          .progress-bar {
            transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .timeline-item {
            transition: all 0.3s ease;
          }
          
          .timeline-item:hover {
            transform: translateX(8px);
          }
          
          .pulse-dot {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .tracking-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .tracking-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

      <div className="tracking-container max-w-6xl mx-auto">
        {/* Header */}
        <div className="fade-in mb-8">
          <Link
            to="/my-orders"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Orders
          </Link>
          <h1 className="tracking-title text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Track Your Order
          </h1>
          <p className="text-slate-600 text-lg">
            Order ID: <span className="font-mono font-semibold">#{order.id?.slice(-12).toUpperCase()}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Tracking Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Current Status</p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{statusConfig.icon}</span>
                    <h2 className={`text-3xl font-bold ${statusConfig.color} capitalize`}>
                      {order.status}
                    </h2>
                  </div>
                </div>
                {order.estimatedDelivery && order.status !== "DELIVERED" && (
                  <div className="text-right">
                    <p className="text-sm text-slate-500 mb-1">Estimated Delivery</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {order.status !== "CANCELLED" && (
                <div className="mb-6">
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`progress-bar h-full ${statusConfig.bg} ${statusConfig.border} border-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Pending</span>
                    <span>Confirmed</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div>
              )}

              {/* Courier Info */}
              {order.courierInfo && (
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Courier Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-500">Courier Name</p>
                      <p className="text-sm font-semibold text-slate-900">
                        {order.courierInfo.name}
                      </p>
                    </div>
                    {order.courierInfo.trackingNumber && (
                      <div>
                        <p className="text-xs text-slate-500">Tracking Number</p>
                        <p className="text-sm font-mono font-semibold text-indigo-600">
                          {order.courierInfo.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Tracking Timeline */}
            <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Tracking Timeline
              </h3>
              
              {order.trackingHistory && order.trackingHistory.length > 0 ? (
                <div className="space-y-6">
                  {[...order.trackingHistory].reverse().map((track, index) => {
                    const trackConfig = getStatusConfig(track.status);
                    const isLatest = index === 0;

                    return (
                      <div
                        key={track.id || index}
                        className="timeline-item flex gap-4"
                      >
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${trackConfig.bg} ${trackConfig.border} border-2 ${
                              isLatest ? "pulse-dot" : ""
                            }`}
                          >
                            <span className="text-xl">{trackConfig.icon}</span>
                          </div>
                          {index !== order.trackingHistory.length - 1 && (
                            <div className="w-0.5 h-full bg-slate-200 my-2" />
                          )}
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4
                                className={`font-semibold ${trackConfig.color} capitalize`}
                              >
                                {track.status}
                              </h4>
                              <span className="text-xs text-slate-500">
                                {new Date(track.timestamp).toLocaleString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 mb-1">
                              {track.message}
                            </p>
                            {track.location && (
                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {track.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>No tracking updates available yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Order Date</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Items</span>
                  <span className="font-semibold text-slate-900">
                    {order.totalItems}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Payment Method</span>
                  <span className="font-semibold text-slate-900">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Payment Status</span>
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "PAID"
                        ? "text-green-600"
                        : order.paymentStatus === "FAILED"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-900 font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Delivery Address
              </h3>
              
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-slate-900">
                  {order.selectedAddress?.name}
                </p>
                <p className="text-slate-600">{order.selectedAddress?.street}</p>
                <p className="text-slate-600">
                  {order.selectedAddress?.city}, {order.selectedAddress?.state}
                </p>
                <p className="text-slate-600">
                  PIN: {order.selectedAddress?.pinCode}
                </p>
                <p className="text-slate-600 pt-2 border-t border-slate-200 mt-2">
                  Phone: {order.selectedAddress?.phone}
                </p>
              </div>
            </div>

            {/* Items */}
            {order.items && order.items.length > 0 && (
              <div className="slide-up tracking-card bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Items ({order.items.length})
                </h3>
                
                <div className="space-y-3">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src={item.product?.thumbnail}
                        alt={item.product?.title}
                        className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {item.product?.title}
                        </p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-sm text-slate-500 text-center pt-2">
                      +{order.items.length - 3} more items
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}