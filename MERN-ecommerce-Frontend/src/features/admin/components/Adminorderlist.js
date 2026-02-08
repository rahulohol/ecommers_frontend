// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import AdminOrderTracking from "./Adminordertracking";
// // import { Grid } from "react-loader-spinner";
// // import { Axios } from "axios";
// // import API from "./axios";
// // // import axios, { Axios } from "axios";

// // // Import your Redux actions
// // // import { fetchAllOrdersAsync, updateOrderAsync } from "../orderSlice";

// // // Convert USD to INR
// // function formatINRR(usdPrice) {
// //   const inrPrice = Math.round(usdPrice * 83);
// //   return inrPrice.toLocaleString('en-IN');
// // }

// // export default function AdminOrderList() {
// //   const dispatch = useDispatch();
  
// //   // Replace with your actual Redux selectors
// //   // const orders = useSelector(selectAllOrders);
// //   // const status = useSelector(selectOrderStatus);
  
// //   // For demonstration - replace with actual Redux state
// //   const [orders, setOrders] = useState([]);
// //   const [status, setStatus] = useState('idle');
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [page, setPage] = useState(1);
// //   const [limit] = useState(10);
// //   const [totalOrders, setTotalOrders] = useState(0);

// //   useEffect(() => {
// //     // Replace with your actual Redux action
// //     // dispatch(fetchAllOrdersAsync({ _page: page, _limit: limit }));
    
// //     // Demo: Fetch orders from API
// //     fetchOrders();
// //   }, [page]);

// // //   const fetchOrders = async () => {
// // //     console.log('Fetching orders for page:', page);
// // //     try {
// // //       setStatus('loading');
// // //       const response = await Axios.get(
// // //         `http://localhost:8000/orders?_page=${page}&_limit=${limit}&_sort=createdAt&_order=desc`,
// // //         { withCredentials: true }
// // //       );
// // //       const data = response.data;
// // //       const total = response.headers['x-total-count'];
      
// // //       setOrders(data);
// // //       setTotalOrders(parseInt(total) || 0);
// // //       setStatus('idle');
// // //     } catch (error) {
// // //       console.error('Error fetching orders:', error);
// // //       setStatus('error');
// // //     }
// // //   };

// // const fetchOrders = async () => {
// //   try {
// //     setStatus("loading");

// //     const response = await API.get("/orders", {
// //       params: {
// //         _page: page,
// //         _limit: limit,
// //         _sort: "createdAt",
// //         _order: "desc",
// //       },
// //     });

// //     setOrders(response.data);
// //     setTotalOrders(Number(response.headers["x-total-count"]) || 0);
// //     setStatus("idle");
// //   } catch (error) {
// //     console.error("Error fetching orders:", error);
// //     setStatus("error");
// //   }
// // };


// //   const handleUpdateOrder = async (orderId, updateData) => {
// //     try {
// //       // Replace with your actual Redux action
// //       // await dispatch(updateOrderAsync({ id: orderId, update: updateData }));
      
// //       const response = await API.patch(`/orders/${orderId}`, updateData);

// //       if (response.ok) {
// //         const updatedOrder = await response.json();
        
// //         // Update local state
// //         setOrders(orders.map(order => 
// //           order.id === orderId ? updatedOrder : order
// //         ));
        
// //         if (selectedOrder?.id === orderId) {
// //           setSelectedOrder(updatedOrder);
// //         }
        
// //         alert('Order updated successfully!');
// //       } else {
// //         alert('Failed to update order');
// //       }
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //       alert('Error updating order');
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     const statusMap = {
// //       PENDING: "bg-amber-100 text-amber-700 border-amber-300",
// //       CONFIRMED: "bg-blue-100 text-blue-700 border-blue-300",
// //       SHIPPED: "bg-purple-100 text-purple-700 border-purple-300",
// //       DELIVERED: "bg-green-100 text-green-700 border-green-300",
// //       CANCELLED: "bg-red-100 text-red-700 border-red-300",
// //     };
// //     return statusMap[status] || "bg-gray-100 text-gray-700 border-gray-300";
// //   };

// //   const totalPages = Math.ceil(totalOrders / limit);

// //   if (status === 'loading' && orders.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <Grid
// //           height="80"
// //           width="80"
// //           color="rgb(99, 102, 241)"
// //           ariaLabel="grid-loading"
// //           radius="12.5"
// //           visible={true}
// //         />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <style>
// //         {`
// //           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
// //           .admin-orders {
// //             font-family: 'Inter', sans-serif;
// //           }
          
// //           .fade-in {
// //             animation: fadeIn 0.5s ease-out;
// //           }
          
// //           @keyframes fadeIn {
// //             from { opacity: 0; transform: translateY(20px); }
// //             to { opacity: 1; transform: translateY(0); }
// //           }
// //         `}
// //       </style>

// //       <div className="admin-orders max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="fade-in mb-8">
// //           <h1 className="text-4xl font-bold text-slate-900 mb-2">
// //             Order Management
// //           </h1>
// //           <p className="text-slate-600">
// //             Manage and track all customer orders
// //           </p>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //           <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
// //             <p className="text-sm text-slate-600 mb-1">Total Orders</p>
// //             <p className="text-3xl font-bold text-slate-900">{totalOrders}</p>
// //           </div>
// //           <div className="bg-amber-50 rounded-xl shadow-md p-6 border border-amber-200">
// //             <p className="text-sm text-amber-600 mb-1">Pending</p>
// //             <p className="text-3xl font-bold text-amber-700">
// //               {orders.filter(o => o.status === 'PENDING').length}
// //             </p>
// //           </div>
// //           <div className="bg-purple-50 rounded-xl shadow-md p-6 border border-purple-200">
// //             <p className="text-sm text-purple-600 mb-1">Shipped</p>
// //             <p className="text-3xl font-bold text-purple-700">
// //               {orders.filter(o => o.status === 'SHIPPED').length}
// //             </p>
// //           </div>
// //           <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
// //             <p className="text-sm text-green-600 mb-1">Delivered</p>
// //             <p className="text-3xl font-bold text-green-700">
// //               {orders.filter(o => o.status === 'DELIVERED').length}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Orders List */}
// //         {selectedOrder ? (
// //           <div className="fade-in">
// //             <button
// //               onClick={() => setSelectedOrder(null)}
// //               className="mb-4 px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all flex items-center gap-2"
// //             >
// //               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //               </svg>
// //               Back to Orders
// //             </button>
// //             <AdminOrderTracking order={selectedOrder} onUpdate={handleUpdateOrder} />
// //           </div>
// //         ) : (
// //           <>
// //             <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead className="bg-slate-50 border-b border-slate-200">
// //                     <tr>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Order ID
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Customer
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Date
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Amount
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Status
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Payment
// //                       </th>
// //                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
// //                         Actions
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="divide-y divide-slate-200">
// //                     {orders.map((order) => (
// //                       <tr key={order.id} className="hover:bg-slate-50 transition-colors">
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <p className="text-sm font-mono font-semibold text-slate-900">
// //                             #{order.id.slice(-8).toUpperCase()}
// //                           </p>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div>
// //                             <p className="text-sm font-medium text-slate-900">
// //                               {order.selectedAddress?.name || 'N/A'}
// //                             </p>
// //                             <p className="text-xs text-slate-500">
// //                               {order.selectedAddress?.email || ''}
// //                             </p>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <p className="text-sm text-slate-700">
// //                             {new Date(order.createdAt).toLocaleDateString('en-IN', {
// //                               day: 'numeric',
// //                               month: 'short',
// //                               year: 'numeric'
// //                             })}
// //                           </p>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <p className="text-sm font-semibold text-slate-900">
// //                             ₹{formatINR(order.totalAmount)}
// //                           </p>
// //                           <p className="text-xs text-slate-500">
// //                             {order.totalItems} items
// //                           </p>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
// //                             {order.status}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <div>
// //                             <p className="text-sm font-medium text-slate-900">
// //                               {order.paymentMethod}
// //                             </p>
// //                             <p className={`text-xs ${
// //                               order.paymentStatus === 'PAID' 
// //                                 ? 'text-green-600' 
// //                                 : order.paymentStatus === 'FAILED'
// //                                 ? 'text-red-600'
// //                                 : 'text-amber-600'
// //                             }`}>
// //                               {order.paymentStatus}
// //                             </p>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 whitespace-nowrap">
// //                           <button
// //                             onClick={() => setSelectedOrder(order)}
// //                             className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all"
// //                           >
// //                             Manage
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>

// //             {/* Pagination */}
// //             {totalPages > 1 && (
// //               <div className="mt-6 flex items-center justify-between">
// //                 <p className="text-sm text-slate-600">
// //                   Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalOrders)} of {totalOrders} orders
// //                 </p>
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => setPage(p => Math.max(1, p - 1))}
// //                     disabled={page === 1}
// //                     className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
// //                   >
// //                     Previous
// //                   </button>
// //                   <span className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg">
// //                     {page}
// //                   </span>
// //                   <button
// //                     onClick={() => setPage(p => Math.min(totalPages, p + 1))}
// //                     disabled={page === totalPages}
// //                     className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
// //                   >
// //                     Next
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Empty State */}
// //             {orders.length === 0 && status !== 'loading' && (
// //               <div className="text-center py-16">
// //                 <svg
// //                   className="w-24 h-24 mx-auto mb-4 text-slate-300"
// //                   fill="none"
// //                   viewBox="0 0 24 24"
// //                   stroke="currentColor"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={1}
// //                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
// //                   />
// //                 </svg>
// //                 <h3 className="text-xl font-semibold text-slate-900 mb-2">
// //                   No Orders Found
// //                 </h3>
// //                 <p className="text-slate-600">
// //                   There are no orders to display at this time.
// //                 </p>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AdminOrderTracking from "./Adminordertracking";
// import { Grid } from "react-loader-spinner";

// // Import Redux actions and selectors
// import {
//   fetchAllOrdersAsync,
//   updateOrderAsync,
//   selectOrders,
//   selectOrderStatus,
//   selectTotalOrders,
//   selectOrderError,
//   setFilters,
// } from "../../order/orderSlice";

// // Convert USD to INR
// function formatINRR(usdPrice) {
//   const inrPrice = Math.round(usdPrice * 83);
//   return inrPrice.toLocaleString('en-IN');
// }

// export default function AdminOrderList() {
//   const dispatch = useDispatch();
  
//   // Redux selectors
//   const orders = useSelector(selectOrders);
//   const status = useSelector(selectOrderStatus);
//   const totalOrders = useSelector(selectTotalOrders);
//   const error = useSelector(selectOrderError);
  
//   // Local state
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);

//   // Fetch orders when component mounts or page changes
//   useEffect(() => {
//     fetchOrders();
//   }, [page]);

//   const fetchOrders = () => {
//     dispatch(fetchAllOrdersAsync({
//       page: page,
//       limit: limit,
//       sort: "createdAt",
//       order: "desc",
//     }));
//   };

//   const handleUpdateOrder = async (orderId, updateData) => {
//     try {
//       await dispatch(updateOrderAsync({ 
//         id: orderId, 
//         update: updateData 
//       })).unwrap();
      
//       // Update selected order if it's the one being updated
//       if (selectedOrder?.id === orderId) {
//         const updatedOrder = orders.find(o => o.id === orderId);
//         if (updatedOrder) {
//           setSelectedOrder(updatedOrder);
//         }
//       }
      
//       alert('Order updated successfully!');
//     } catch (error) {
//       console.error('Error updating order:', error);
//       alert(`Error updating order: ${error}`);
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

//   const totalPages = Math.ceil(totalOrders / limit);

//   // Loading state
//   if (status === 'loading' && orders.length === 0) {
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

//   // Error state
//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
//           <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Orders</h3>
//           <p className="text-red-700 mb-4">{error}</p>
//           <button
//             onClick={fetchOrders}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
//           .admin-orders {
//             font-family: 'Inter', sans-serif;
//           }
          
//           .fade-in {
//             animation: fadeIn 0.5s ease-out;
//           }
          
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>

//       <div className="admin-orders max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="fade-in mb-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-4xl font-bold text-slate-900 mb-2">
//                 Order Management
//               </h1>
//               <p className="text-slate-600">
//                 Manage and track all customer orders
//               </p>
//             </div>
//             <button
//               onClick={fetchOrders}
//               disabled={status === 'loading'}
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//               </svg>
//               Refresh
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
//             <p className="text-sm text-slate-600 mb-1">Total Orders</p>
//             <p className="text-3xl font-bold text-slate-900">{totalOrders}</p>
//           </div>
//           <div className="bg-amber-50 rounded-xl shadow-md p-6 border border-amber-200">
//             <p className="text-sm text-amber-600 mb-1">Pending</p>
//             <p className="text-3xl font-bold text-amber-700">
//               {orders.filter(o => o.status === 'PENDING').length}
//             </p>
//           </div>
//           <div className="bg-purple-50 rounded-xl shadow-md p-6 border border-purple-200">
//             <p className="text-sm text-purple-600 mb-1">Shipped</p>
//             <p className="text-3xl font-bold text-purple-700">
//               {orders.filter(o => o.status === 'SHIPPED').length}
//             </p>
//           </div>
//           <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
//             <p className="text-sm text-green-600 mb-1">Delivered</p>
//             <p className="text-3xl font-bold text-green-700">
//               {orders.filter(o => o.status === 'DELIVERED').length}
//             </p>
//           </div>
//         </div>

//         {/* Orders List */}
//         {selectedOrder ? (
//           <div className="fade-in">
//             <button
//               onClick={() => setSelectedOrder(null)}
//               className="mb-4 px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all flex items-center gap-2"
//             >
//               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//               Back to Orders
//             </button>
//             <AdminOrderTracking order={selectedOrder} onUpdate={handleUpdateOrder} />
//           </div>
//         ) : (
//           <>
//             <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-slate-50 border-b border-slate-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Order ID
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Customer
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Date
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Amount
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Payment
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-200">
//                     {orders.map((order) => (
//                       <tr key={order.id} className="hover:bg-slate-50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <p className="text-sm font-mono font-semibold text-slate-900">
//                             #{order.id.slice(-8).toUpperCase()}
//                           </p>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div>
//                             <p className="text-sm font-medium text-slate-900">
//                               {order.selectedAddress?.name || 'N/A'}
//                             </p>
//                             <p className="text-xs text-slate-500">
//                               {order.selectedAddress?.email || ''}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <p className="text-sm text-slate-700">
//                             {new Date(order.createdAt).toLocaleDateString('en-IN', {
//                               day: 'numeric',
//                               month: 'short',
//                               year: 'numeric'
//                             })}
//                           </p>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <p className="text-sm font-semibold text-slate-900">
//                             ₹{formatINR(order.totalAmount)}
//                           </p>
//                           <p className="text-xs text-slate-500">
//                             {order.totalItems} items
//                           </p>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
//                             {order.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div>
//                             <p className="text-sm font-medium text-slate-900">
//                               {order.paymentMethod}
//                             </p>
//                             <p className={`text-xs ${
//                               order.paymentStatus === 'PAID' 
//                                 ? 'text-green-600' 
//                                 : order.paymentStatus === 'FAILED'
//                                 ? 'text-red-600'
//                                 : 'text-amber-600'
//                             }`}>
//                               {order.paymentStatus}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <button
//                             onClick={() => setSelectedOrder(order)}
//                             className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all"
//                           >
//                             Manage
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-6 flex items-center justify-between">
//                 <p className="text-sm text-slate-600">
//                   Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalOrders)} of {totalOrders} orders
//                 </p>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setPage(p => Math.max(1, p - 1))}
//                     disabled={page === 1 || status === 'loading'}
//                     className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     Previous
//                   </button>
//                   <span className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg">
//                     {page} / {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//                     disabled={page === totalPages || status === 'loading'}
//                     className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Loading indicator for pagination */}
//             {status === 'loading' && orders.length > 0 && (
//               <div className="mt-4 flex justify-center">
//                 <div className="flex items-center gap-2 text-indigo-600">
//                   <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span className="text-sm font-medium">Loading...</span>
//                 </div>
//               </div>
//             )}

//             {/* Empty State */}
//             {orders.length === 0 && status !== 'loading' && (
//               <div className="text-center py-16">
//                 <svg
//                   className="w-24 h-24 mx-auto mb-4 text-slate-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1}
//                     d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                   />
//                 </svg>
//                 <h3 className="text-xl font-semibold text-slate-900 mb-2">
//                   No Orders Found
//                 </h3>
//                 <p className="text-slate-600">
//                   There are no orders to display at this time.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminOrderTracking from "./Adminordertracking";
import { Grid } from "react-loader-spinner";

// Import Redux actions and selectors
import {
  fetchAllOrdersAsync,
  updateOrderAsync,
  selectOrders,
  selectOrderStatus,
  selectTotalOrders,
  selectOrderError,
  setFilters,
} from "../../order/orderSlice";
// import { toast } from "react-toastify";
// import {toast}Alert from "../../auth/components/ToastAlert";
import { toast } from "sonner";

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

export default function AdminOrderList() {
  const dispatch = useDispatch();
  
  // Redux selectors
  const orders = useSelector(selectOrders);
  const status = useSelector(selectOrderStatus);
  const totalOrders = useSelector(selectTotalOrders);
  const error = useSelector(selectOrderError);
  
  console.log('Orders from Redux:', orders);
  // Local state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  

  const fetchOrders = () => {
  dispatch(fetchAllOrdersAsync({
      page: page,
      limit: limit,
      sort: "createdAt",
      order: "desc",
    }));

    // console.log('Fetched orders:', result);
  };

  // Fetch orders when component mounts or page changes
  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleUpdateOrder = async (orderId, updateData) => {
    try {
      await dispatch(updateOrderAsync({ 
        id: orderId, 
        update: updateData 
      })).unwrap();
      
      // Update selected order if it's the one being updated
      if (selectedOrder?.id === orderId) {
        const updatedOrder = orders.find(o => o.id === orderId);
        if (updatedOrder) {
          setSelectedOrder(updatedOrder);
        }
      }

      toast.success('Order updated successfully!');
      
      // alert('Order updated successfully!');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order');
      // alert(`Error updating order: ${error}`);
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

  const totalPages = Math.ceil(totalOrders / limit);

  // Loading state
  if (status === 'loading' && orders.length === 0) {
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

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Orders</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .admin-orders {
            font-family: 'Inter', sans-serif;
          }
          
          .fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="admin-orders max-w-7xl mx-auto">
        {/* Header */}
        <div className="fade-in mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Order Management
              </h1>
              <p className="text-slate-600">
                Manage and track all customer orders
              </p>
            </div>
            <button
              onClick={fetchOrders}
              disabled={status === 'loading'}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-slate-900">{totalOrders}</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow-md p-6 border border-amber-200">
            <p className="text-sm text-amber-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-amber-700">
              {orders.filter(o => o.status === 'PENDING').length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl shadow-md p-6 border border-purple-200">
            <p className="text-sm text-purple-600 mb-1">Shipped</p>
            <p className="text-3xl font-bold text-purple-700">
              {orders.filter(o => o.status === 'SHIPPED').length}
            </p>
          </div>
          <div className="bg-green-50 rounded-xl shadow-md p-6 border border-green-200">
            <p className="text-sm text-green-600 mb-1">Delivered</p>
            <p className="text-3xl font-bold text-green-700">
              {orders.filter(o => o.status === 'DELIVERED').length}
            </p>
          </div>
        </div>

        {/* Orders List */}
        {selectedOrder ? (
          <div className="fade-in">
            <button
              onClick={() => setSelectedOrder(null)}
              className="mb-4 px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Orders
            </button>
            <AdminOrderTracking order={selectedOrder} onUpdate={handleUpdateOrder} />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-mono font-semibold text-slate-900">
                            #{order.id.slice(-8).toUpperCase()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {order.selectedAddress?.name || 'N/A'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {order.selectedAddress?.email || ''}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-slate-700">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-semibold text-slate-900">
                            ₹{order.totalAmount}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.totalItems} items
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {order.paymentMethod}
                            </p>
                            <p className={`text-xs ${
                              order.paymentStatus === 'PAID' 
                                ? 'text-green-600' 
                                : order.paymentStatus === 'FAILED'
                                ? 'text-red-600'
                                : 'text-amber-600'
                            }`}>
                              {order.paymentStatus}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-all"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, totalOrders)} of {totalOrders} orders
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1 || status === 'loading'}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages || status === 'loading'}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Loading indicator for pagination */}
            {status === 'loading' && orders.length > 0 && (
              <div className="mt-4 flex justify-center">
                <div className="flex items-center gap-2 text-indigo-600">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm font-medium">Loading...</span>
                </div>
              </div>
            )}

            {/* Empty State */}
            {orders.length === 0 && status !== 'loading' && (
              <div className="text-center py-16">
                <svg
                  className="w-24 h-24 mx-auto mb-4 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Orders Found
                </h3>
                <p className="text-slate-600">
                  There are no orders to display at this time.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}