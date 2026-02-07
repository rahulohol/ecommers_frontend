// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchLoggedInUserOrderAsync,
//   selectUserInfo,
//   selectUserInfoStatus,
//   selectUserOrders,
// } from "../Usermanagementslice";
// import { Grid } from "react-loader-spinner";

// export default function UserOrders() {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectUserOrders);
//   const status = useSelector(selectUserInfoStatus);

//   useEffect(() => {
//     dispatch(fetchLoggedInUserOrderAsync());
//   }, [dispatch]);

//   let OrderStatusColor;

//   let checkStatusClolor = (order) => {
//     if (order?.status === "delivered") {
//       OrderStatusColor = "text-green-900 bg-green-200";
//     } else if (order?.status === "pending") {
//       OrderStatusColor = "bg-purple-200 text-purple-600";
//     } else if (order?.status === "dispatched") {
//       OrderStatusColor = "bg-yellow-200 text-yellow-600";
//     } else if (order?.status === "cancelled") {
//       OrderStatusColor = "bg-red-200 text-red-600";
//     } else {
//       OrderStatusColor = "bg-purple-200 text-purple-600";
//     }
//   };

//   return (
//     <div>
//       {orders &&
//         orders.map((order) => (
//           <div key={order.id}>
//             <div>
//               <div className="mx-auto md:mt-10 lg:mt-12 sm:mt-10 mt-8 bg-white max-w-7xl px-4 sm:px-4 lg:px-8">
//                 <div className="border-t border-gray-200 px-4 py-6 sm:px-4">
//                   <h2 className="text-2xl sm:text-xl my-5 font-bold tracking-tight text-gray-900">
//                     Order # {order.id}
//                   </h2>

//                   {checkStatusClolor(order)}

//                   <h3 className={`text-xl my-5 font-bold tracking-tight `}>
//                     Order Status :{" "}
//                     <span
//                       className={`text-xl my-5 p-1 px-5 rounded-lg font-bold tracking-tight ${OrderStatusColor}`}
//                     >
//                       {order.status}
//                     </span>
//                   </h3>
//                   <div className="flow-root">
//                     <ul className="-my-6 divide-y divide-gray-200">
//                       {order.items.map((item) => (
//                         <li key={item.id} className="flex py-6">
//                           <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                             <img
//                               src={item.product.thumbnail}
//                               alt={item.product.title}
//                               className="h-full w-full object-cover object-center"
//                             />
//                           </div>

//                           <div className="ml-4 flex flex-1 flex-col">
//                             <div>
//                               <div className="flex justify-between text-base font-medium text-gray-900">
//                                 <h3>
//                                   <a href={item.product.id}>
//                                     {item.product.title}
//                                   </a>
//                                 </h3>
//                                 <p className="ml-4">
//                                   ${item.product.discountPrice}
//                                 </p>
//                               </div>
//                               <p className="mt-1 text-sm text-gray-500">
//                                 {item.product.brand}
//                               </p>
//                             </div>
//                             <div className="flex flex-1 items-end justify-between text-sm">
//                               <div className="text-gray-500">
//                                 <label
//                                   htmlFor="quantity"
//                                   className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
//                                 >
//                                   Qty :{item.quantity}
//                                 </label>
//                               </div>

//                               <div className="flex"></div>
//                             </div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                   <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//                     <p>Subtotal</p>
//                     <p>$ {order.totalAmount}</p>
//                   </div>
//                   <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//                     <p>Total Items in Cart</p>
//                     <p>{order.totalItems} items</p>
//                   </div>
//                   <p className="mt-0.5 text-sm text-gray-500">
//                     Shipping Address :
//                   </p>
//                   <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
//                     <div className="flex gap-x-4">
//                       <div className="min-w-0 flex-auto">
//                         <p className="text-sm font-semibold leading-6 text-gray-900">
//                           {order.selectedAddress.name}
//                         </p>
//                         <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                           {order.selectedAddress.street}
//                         </p>
//                         <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                           {order.selectedAddress.pinCode}
//                         </p>
//                       </div>
//                     </div>
//                     <div className=" sm:flex sm:flex-col sm:items-end">
//                       <p className="text-sm leading-6 text-gray-900">
//                         Phone: {order.selectedAddress.phone}
//                       </p>
//                       <p className="text-sm leading-6 text-gray-500">
//                         {order.selectedAddress.city}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       {status === "loading" ? (
//         <Grid
//           height="80"
//           width="80"
//           color="rgb(79, 70, 229) "
//           ariaLabel="grid-loading"
//           radius="12.5"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//         />
//       ) : null}
//     </div>
//   );
// }




import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from "../Usermanagementslice";
import { Grid } from "react-loader-spinner";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchLoggedInUserOrdersAsync, selectOrders } from "../../order/orderSlice";

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  

  const navigate = useNavigate();


  const trackOrder = (id) => {
    // Implement order tracking logic here
    navigate(`/order-tracking/${id}`);
    // <Navigate to={`/order-tracking/${id}`} replace={true} />);
  }

  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "delivered":
        return {
          color: "text-green-700",
          bg: "bg-green-50",
          border: "border-green-200",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "pending":
        return {
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      case "dispatched":
        return {
          color: "text-blue-700",
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          ),
        };
      case "cancelled":
        return {
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
      default:
        return {
          color: "text-slate-700",
          bg: "bg-slate-50",
          border: "border-slate-200",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          ),
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
          
          .orders-container {
            font-family: 'Inter', sans-serif;
          }
          
          .order-title {
            font-family: 'Playfair Display', serif;
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .order-card {
            animation: slideUp 0.5s ease-out forwards;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .order-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .order-card:nth-child(1) { animation-delay: 0.1s; }
          .order-card:nth-child(2) { animation-delay: 0.15s; }
          .order-card:nth-child(3) { animation-delay: 0.2s; }
          .order-card:nth-child(4) { animation-delay: 0.25s; }
          .order-card:nth-child(5) { animation-delay: 0.3s; }
          
          .status-badge {
            transition: all 0.3s ease;
          }
          
          .status-badge:hover {
            transform: scale(1.05);
          }
          
          .product-item {
            transition: all 0.3s ease;
          }
          
          .product-item:hover {
            background: rgba(99, 102, 241, 0.02);
          }
          
          .product-image {
            transition: transform 0.3s ease;
          }
          
          .product-item:hover .product-image {
            transform: scale(1.05);
          }
          
          .timeline-dot {
            position: relative;
          }
          
          .timeline-dot::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            width: 2px;
            height: 100%;
            background: linear-gradient(to bottom, #e5e7eb, transparent);
            transform: translateX(-50%);
          }
          
          .empty-state {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>

      <div className="orders-container max-w-7xl mx-auto">
        {/* Header */}
        <div className="fade-in mb-8">
          <h1 className="order-title text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            My Orders
          </h1>
          <p className="text-slate-600 text-lg">
            Track and manage your orders
          </p>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <div className="flex justify-center items-center py-20">
            <Grid
              height="80"
              width="80"
              color="rgb(99, 102, 241)"
              ariaLabel="grid-loading"
              radius="12.5"
              visible={true}
            />
          </div>
        )}

        {/* Empty State */}
        {!status === "loading" && (!orders || orders.length === 0) && (
          <div className="empty-state text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">
              No orders yet
            </h3>
            <p className="text-slate-600 mb-6">
              Start shopping to see your orders here
            </p>
            <a
              href="/"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders?.map((order, orderIndex) => {
            const statusConfig = getStatusConfig(order.status);

            return (
              <div
                key={order.id}
                className="order-card bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-b border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-slate-900">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </h2>
                        <div
                          className={`status-badge flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}
                        >
                          <span className={statusConfig.color}>
                            {statusConfig.icon}
                          </span>
                          <span
                            className={`text-sm font-semibold ${statusConfig.color} capitalize`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-500">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-500 mb-1">
                          Order Total
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                          ₹{order.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-indigo-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path
                            fillRule="evenodd"
                            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Payment Method</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {order.paymentMethod === "COD" ? "Cash on Delivery" : order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Payment Status</p>
                        <p className="text-sm font-semibold text-slate-900 capitalize">
                          {order.paymentStatus || "Pending"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Items</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {order.totalItems} {order.totalItems === 1 ? "item" : "items"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={item.id}
                        className="product-item flex gap-4 p-4 rounded-xl border border-slate-200 hover:border-indigo-200 transition-all"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="product-image w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <h4 className="text-base font-semibold text-slate-900 mb-1 line-clamp-2">
                                {item.product.title}
                              </h4>
                              <p className="text-sm text-slate-500 mb-2">
                                {item.product.brand}
                              </p>
                              <div className="flex items-center gap-4">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                  </svg>
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-slate-900">
                                ₹
                                {
                                  item.product.discountPrice ||
                                    Math.round(
                                      item.product.price *
                                        (1 - item.product.discountPercentage / 100)
                                    )
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="px-6 pb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Shipping Address
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 mb-2">
                          {order.selectedAddress.name}
                        </p>
                        <p className="text-sm text-slate-600 mb-1">
                          {order.selectedAddress.street}
                        </p>
                        <p className="text-sm text-slate-600 mb-1">
                          {order.selectedAddress.city}, {order.selectedAddress.state}
                        </p>
                        <p className="text-sm text-slate-600">
                          PIN: {order.selectedAddress.pinCode}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500 mb-1">Phone</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {order.selectedAddress.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary Footer */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Order Total</p>
                      <p className="text-2xl font-bold text-slate-900">
                        ₹{order.totalAmount}
                      </p>
                    </div>
                    <button onClick={() => trackOrder(order.id)} className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}