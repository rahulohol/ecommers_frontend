// import React, { useState } from "react";

// // Convert USD to INR
// function formatINRR(usdPrice) {
//   const inrPrice = Math.round(usdPrice * 83);
//   return inrPrice.toLocaleString('en-IN');
// }

// export default function AdminOrderTracking({ order, onUpdate }) {
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const [updateData, setUpdateData] = useState({
//     status: order.status || "PENDING",
//     trackingMessage: "",
//     trackingLocation: "",
//     courierName: order.courierInfo?.name || "",
//     trackingNumber: order.courierInfo?.trackingNumber || "",
//     courierContact: order.courierInfo?.contactNumber || "",
//     estimatedDelivery: order.estimatedDelivery
//       ? new Date(order.estimatedDelivery).toISOString().split("T")[0]
//       : "",
//   });

//   const statusOptions = [
//     { value: "PENDING", label: "Pending", color: "amber" },
//     { value: "CONFIRMED", label: "Confirmed", color: "blue" },
//     { value: "SHIPPED", label: "Shipped", color: "purple" },
//     { value: "DELIVERED", label: "Delivered", color: "green" },
//     { value: "CANCELLED", label: "Cancelled", color: "red" },
//   ];

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setIsUpdating(true);

//     try {
//       const payload = {
//         status: updateData.status,
//         trackingMessage: updateData.trackingMessage,
//         trackingLocation: updateData.trackingLocation,
//         estimatedDelivery: updateData.estimatedDelivery,
//       };

//       // Include courier info if provided
//       if (updateData.courierName || updateData.trackingNumber) {
//         payload.courierInfo = {
//           name: updateData.courierName,
//           trackingNumber: updateData.trackingNumber,
//           contactNumber: updateData.courierContact,
//         };
//       }

//       // Call the update function passed from parent
//       await onUpdate(order.id, payload);

//       // Reset form
//       setUpdateData({
//         ...updateData,
//         trackingMessage: "",
//         trackingLocation: "",
//       });
//       setShowUpdateForm(false);
//     } catch (error) {
//       console.error("Error updating order:", error);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     const statusMap = {
//       PENDING: "bg-amber-100 text-amber-700 border-amber-300",
//       CONFIRMED: "bg-blue-100 text-blue-700 border-blue-300",
//       SHIPPED: "bg-purple-100 text-purple-700 border-purple-300",
//       DELIVERED: "bg-green-100 text-green-700 border-green-300",
//       CANCELLED: "bg-red-100 text-red-700 border-red-300",
//     };
//     return statusMap[status] || "bg-gray-100 text-gray-700 border-gray-300";
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
//           .admin-tracking {
//             font-family: 'Inter', sans-serif;
//           }
          
//           .slide-down {
//             animation: slideDown 0.3s ease-out;
//           }
          
//           @keyframes slideDown {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>

//       <div className="admin-tracking">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-slate-200">
//           <div className="flex justify-between items-start">
//             <div>
//               <h3 className="text-xl font-bold text-slate-900 mb-1">
//                 Order #{order.id.slice(-12).toUpperCase()}
//               </h3>
//               <p className="text-sm text-slate-600">
//                 Placed: {new Date(order.createdAt).toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-slate-600 mb-1">Order Total</p>
//               <p className="text-2xl font-bold text-indigo-600">
//                 ₹{formatINR(order.totalAmount)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Current Status */}
//         <div className="p-6 border-b border-slate-200">
//           <div className="flex items-center justify-between mb-4">
//             <h4 className="text-lg font-semibold text-slate-900">Current Status</h4>
//             <span
//               className={`px-4 py-2 rounded-full font-semibold text-sm border ${getStatusColor(
//                 order.status
//               )}`}
//             >
//               {order.status}
//             </span>
//           </div>

//           <div className="grid grid-cols-3 gap-4 text-sm">
//             <div>
//               <p className="text-slate-500 mb-1">Payment</p>
//               <p className="font-semibold text-slate-900">{order.paymentMethod}</p>
//             </div>
//             <div>
//               <p className="text-slate-500 mb-1">Payment Status</p>
//               <p
//                 className={`font-semibold ${
//                   order.paymentStatus === "PAID"
//                     ? "text-green-600"
//                     : order.paymentStatus === "FAILED"
//                     ? "text-red-600"
//                     : "text-amber-600"
//                 }`}
//               >
//                 {order.paymentStatus}
//               </p>
//             </div>
//             <div>
//               <p className="text-slate-500 mb-1">Items</p>
//               <p className="font-semibold text-slate-900">{order.totalItems}</p>
//             </div>
//           </div>
//         </div>

//         {/* Update Status Button */}
//         <div className="p-6 border-b border-slate-200">
//           <button
//             onClick={() => setShowUpdateForm(!showUpdateForm)}
//             className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//               />
//             </svg>
//             {showUpdateForm ? "Hide Update Form" : "Update Order Status"}
//           </button>
//         </div>

//         {/* Update Form */}
//         {showUpdateForm && (
//           <form onSubmit={handleUpdate} className="slide-down p-6 bg-slate-50">
//             <div className="space-y-4">
//               {/* Status Selection */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">
//                   Order Status *
//                 </label>
//                 <select
//                   value={updateData.status}
//                   onChange={(e) =>
//                     setUpdateData({ ...updateData, status: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   required
//                 >
//                   {statusOptions.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Tracking Message */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">
//                   Tracking Message *
//                 </label>
//                 <textarea
//                   value={updateData.trackingMessage}
//                   onChange={(e) =>
//                     setUpdateData({ ...updateData, trackingMessage: e.target.value })
//                   }
//                   rows="3"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="E.g., Your order is out for delivery"
//                   required
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   value={updateData.trackingLocation}
//                   onChange={(e) =>
//                     setUpdateData({ ...updateData, trackingLocation: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                   placeholder="E.g., Mumbai Distribution Center"
//                 />
//               </div>

//               {/* Courier Information */}
//               <div className="border-t border-slate-200 pt-4">
//                 <h5 className="text-sm font-semibold text-slate-900 mb-3">
//                   Courier Information (Optional)
//                 </h5>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-xs text-slate-600 mb-1">
//                       Courier Name
//                     </label>
//                     <input
//                       type="text"
//                       value={updateData.courierName}
//                       onChange={(e) =>
//                         setUpdateData({ ...updateData, courierName: e.target.value })
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       placeholder="E.g., BlueDart"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-slate-600 mb-1">
//                       Tracking Number
//                     </label>
//                     <input
//                       type="text"
//                       value={updateData.trackingNumber}
//                       onChange={(e) =>
//                         setUpdateData({
//                           ...updateData,
//                           trackingNumber: e.target.value,
//                         })
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       placeholder="BD123456789"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs text-slate-600 mb-1">
//                       Contact Number
//                     </label>
//                     <input
//                       type="tel"
//                       value={updateData.courierContact}
//                       onChange={(e) =>
//                         setUpdateData({
//                           ...updateData,
//                           courierContact: e.target.value,
//                         })
//                       }
//                       className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                       placeholder="1800-XXX-XXXX"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Estimated Delivery */}
//               <div>
//                 <label className="block text-sm font-semibold text-slate-900 mb-2">
//                   Estimated Delivery Date
//                 </label>
//                 <input
//                   type="date"
//                   value={updateData.estimatedDelivery}
//                   onChange={(e) =>
//                     setUpdateData({
//                       ...updateData,
//                       estimatedDelivery: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={isUpdating}
//                   className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
//                 >
//                   {isUpdating ? "Updating..." : "Update Order"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowUpdateForm(false)}
//                   className="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </form>
//         )}

//         {/* Tracking History */}
//         {order.trackingHistory && order.trackingHistory.length > 0 && (
//           <div className="p-6">
//             <h4 className="text-lg font-semibold text-slate-900 mb-4">
//               Tracking History
//             </h4>
//             <div className="space-y-3 max-h-64 overflow-y-auto">
//               {[...order.trackingHistory].reverse().map((track, index) => (
//                 <div
//                   key={track.id || index}
//                   className="bg-slate-50 rounded-lg p-3 border border-slate-200"
//                 >
//                   <div className="flex justify-between items-start mb-1">
//                     <span
//                       className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
//                         track.status
//                       )}`}
//                     >
//                       {track.status}
//                     </span>
//                     <span className="text-xs text-slate-500">
//                       {new Date(track.timestamp).toLocaleString("en-IN", {
//                         day: "numeric",
//                         month: "short",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </span>
//                   </div>
//                   <p className="text-sm text-slate-700 mt-2">{track.message}</p>
//                   {track.location && (
//                     <p className="text-xs text-slate-500 mt-1">
//                       📍 {track.location}
//                     </p>
//                   )}
//                   {track.updatedBy && (
//                     <p className="text-xs text-slate-400 mt-1">
//                       Updated by: {track.updatedBy}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Customer & Shipping Info */}
//         <div className="p-6 bg-slate-50 border-t border-slate-200">
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="text-sm font-semibold text-slate-900 mb-3">
//                 Customer Information
//               </h4>
//               <div className="space-y-2 text-sm">
//                 <p className="text-slate-700">
//                   <span className="font-medium">Name:</span>{" "}
//                   {order.selectedAddress.name}
//                 </p>
//                 <p className="text-slate-700">
//                   <span className="font-medium">Email:</span>{" "}
//                   {order.selectedAddress.email}
//                 </p>
//                 <p className="text-slate-700">
//                   <span className="font-medium">Phone:</span>{" "}
//                   {order.selectedAddress.phone}
//                 </p>
//               </div>
//             </div>
//             <div>
//               <h4 className="text-sm font-semibold text-slate-900 mb-3">
//                 Shipping Address
//               </h4>
//               <div className="text-sm text-slate-700">
//                 <p>{order.selectedAddress.street}</p>
//                 <p>
//                   {order.selectedAddress.city}, {order.selectedAddress.state}
//                 </p>
//                 <p>PIN: {order.selectedAddress.pinCode}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderAsync } from "../../order/orderSlice";

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

export default function AdminOrderTracking({ order, onUpdate }) {
  const dispatch = useDispatch();
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    status: order.status || "PENDING",
    trackingMessage: "",
    trackingLocation: "",
    courierName: order.courierInfo?.name || "",
    trackingNumber: order.courierInfo?.trackingNumber || "",
    courierContact: order.courierInfo?.contactNumber || "",
    estimatedDelivery: order.estimatedDelivery
      ? new Date(order.estimatedDelivery).toISOString().split("T")[0]
      : "",
  });

  const statusOptions = [
    { value: "PENDING", label: "Pending", color: "amber" },
    { value: "CONFIRMED", label: "Confirmed", color: "blue" },
    { value: "SHIPPED", label: "Shipped", color: "purple" },
    { value: "DELIVERED", label: "Delivered", color: "green" },
    { value: "CANCELLED", label: "Cancelled", color: "red" },
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const payload = {
        status: updateData.status,
        trackingMessage: updateData.trackingMessage,
        trackingLocation: updateData.trackingLocation,
        estimatedDelivery: updateData.estimatedDelivery,
      };

      // Include courier info if provided
      if (updateData.courierName || updateData.trackingNumber) {
        payload.courierInfo = {
          name: updateData.courierName,
          trackingNumber: updateData.trackingNumber,
          contactNumber: updateData.courierContact,
        };
      }

      // Use Redux thunk to update order
      await dispatch(updateOrderAsync({
        id: order.id,
        update: payload
      })).unwrap();

      // Call the parent callback if provided
      if (onUpdate) {
        onUpdate(order.id, payload);
      }

      // Reset form
      setUpdateData({
        ...updateData,
        trackingMessage: "",
        trackingLocation: "",
      });
      setShowUpdateForm(false);
      
      alert('Order updated successfully!');
    } catch (error) {
      console.error("Error updating order:", error);
      alert(`Failed to update order: ${error}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const statusMap = {
      PENDING: "bg-amber-100 text-amber-700 border-amber-300",
      CONFIRMED: "bg-blue-100 text-blue-700 border-blue-300",
      SHIPPED: "bg-purple-100 text-purple-700 border-purple-300",
      DELIVERED: "bg-green-100 text-green-700 border-green-300",
      CANCELLED: "bg-red-100 text-red-700 border-red-300",
    };
    return statusMap[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          .admin-tracking {
            font-family: 'Inter', sans-serif;
          }
          
          .slide-down {
            animation: slideDown 0.3s ease-out;
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div className="admin-tracking">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Order #{order.id.slice(-12).toUpperCase()}
              </h3>
              <p className="text-sm text-slate-600">
                Placed: {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600 mb-1">Order Total</p>
              <p className="text-2xl font-bold text-indigo-600">
                ₹{order.totalAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-900">Current Status</h4>
            <span
              className={`px-4 py-2 rounded-full font-semibold text-sm border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-500 mb-1">Payment</p>
              <p className="font-semibold text-slate-900">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Payment Status</p>
              <p
                className={`font-semibold ${
                  order.paymentStatus === "PAID"
                    ? "text-green-600"
                    : order.paymentStatus === "FAILED"
                    ? "text-red-600"
                    : "text-amber-600"
                }`}
              >
                {order.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-slate-500 mb-1">Items</p>
              <p className="font-semibold text-slate-900">{order.totalItems}</p>
            </div>
          </div>
        </div>

        {/* Update Status Button */}
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => setShowUpdateForm(!showUpdateForm)}
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            {showUpdateForm ? "Hide Update Form" : "Update Order Status"}
          </button>
        </div>

        {/* Update Form */}
        {showUpdateForm && (
          <form onSubmit={handleUpdate} className="slide-down p-6 bg-slate-50">
            <div className="space-y-4">
              {/* Status Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Order Status *
                </label>
                <select
                  value={updateData.status}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tracking Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Tracking Message *
                </label>
                <textarea
                  value={updateData.trackingMessage}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, trackingMessage: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="E.g., Your order is out for delivery"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={updateData.trackingLocation}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, trackingLocation: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="E.g., Mumbai Distribution Center"
                />
              </div>

              {/* Courier Information */}
              <div className="border-t border-slate-200 pt-4">
                <h5 className="text-sm font-semibold text-slate-900 mb-3">
                  Courier Information (Optional)
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Courier Name
                    </label>
                    <input
                      type="text"
                      value={updateData.courierName}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, courierName: e.target.value })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="E.g., BlueDart"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Tracking Number
                    </label>
                    <input
                      type="text"
                      value={updateData.trackingNumber}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          trackingNumber: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="BD123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={updateData.courierContact}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          courierContact: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="1800-XXX-XXXX"
                    />
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Estimated Delivery Date
                </label>
                <input
                  type="date"
                  value={updateData.estimatedDelivery}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      estimatedDelivery: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
                >
                  {isUpdating ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Order"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  disabled={isUpdating}
                  className="px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tracking History */}
        {order.trackingHistory && order.trackingHistory.length > 0 && (
          <div className="p-6 border-t border-slate-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">
              Tracking History
            </h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[...order.trackingHistory].reverse().map((track, index) => (
                <div
                  key={track.id || index}
                  className="bg-slate-50 rounded-lg p-3 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                        track.status
                      )}`}
                    >
                      {track.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(track.timestamp).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">{track.message}</p>
                  {track.location && (
                    <p className="text-xs text-slate-500 mt-1">
                      📍 {track.location}
                    </p>
                  )}
                  {track.updatedBy && (
                    <p className="text-xs text-slate-400 mt-1">
                      Updated by: {track.updatedBy}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty Tracking History State */}
        {(!order.trackingHistory || order.trackingHistory.length === 0) && (
          <div className="p-6 border-t border-slate-200">
            <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
              <svg
                className="w-16 h-16 mx-auto mb-3 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-slate-600 font-medium">No tracking history yet</p>
              <p className="text-sm text-slate-500 mt-1">
                Add a status update to start tracking this order
              </p>
            </div>
          </div>
        )}

        {/* Customer & Shipping Info */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Customer Information
              </h4>
              <div className="space-y-2 text-sm">
                <p className="text-slate-700">
                  <span className="font-medium">Name:</span>{" "}
                  {order.selectedAddress?.name || 'N/A'}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Email:</span>{" "}
                  {order.selectedAddress?.email || 'N/A'}
                </p>
                <p className="text-slate-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.selectedAddress?.phone || 'N/A'}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Shipping Address
              </h4>
              <div className="text-sm text-slate-700">
                <p>{order.selectedAddress?.street || 'N/A'}</p>
                <p>
                  {order.selectedAddress?.city || 'N/A'}, {order.selectedAddress?.state || 'N/A'}
                </p>
                <p>PIN: {order.selectedAddress?.pinCode || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items (if available) */}
        {order.items && order.items.length > 0 && (
          <div className="p-6 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Order Items
            </h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  {item.product?.thumbnail && (
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {item.product?.title || 'Product'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Qty: {item.quantity} × ₹{item.product?.price || 0}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    ₹{(item.product?.price || 0) * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}