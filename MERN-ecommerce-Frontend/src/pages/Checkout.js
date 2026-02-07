// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   deleteItemFromCartAsync,
//   selectItems,
//   updateCartAsync,
// } from "../features/cart/cartSlice";
// import { Navigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { updateUserAsync } from "../features/user/Usermanagementslice";
// import { useState } from "react";
// import {
//   createOrderAsync,
//   selectCurrentOrder,
//   selectStatus,
// } from "../features/order/orderSlice";
// import { selectUserInfo } from "../features/user/Usermanagementslice";
// import { Grid } from "react-loader-spinner";
// // import { loadRazorpay } from "../../utils/constants";

// function Checkout() {
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const user = useSelector(selectUserInfo);
//   const items = useSelector(selectItems);
//   const status = useSelector(selectStatus);
//   const currentOrder = useSelector(selectCurrentOrder);

//   // const totalAmount = items.reduce(
//   //   (amount, item) => item.product.discountPrice * item.quantity + amount,
//   //   0
//   // );

//   const totalAmount = items.reduce(
//     (amount, item) =>
//       item.product.discountPrice
//         ? item.product.discountPrice
//         : Math.round(
//             item.product?.price * (1 - item.product?.discountPercentage / 100)
//           ) *
//             item.quantity +
//           amount,
//     0
//   );
//   const totalItems = items.reduce((total, item) => item.quantity + total, 0);

//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState(null);

//   const handleQuantity = (e, item) => {
//     dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
//   };

//   const handleRemove = (e, id) => {
//     dispatch(deleteItemFromCartAsync(id));
//   };

//   const handleAddress = (e) => {
//     setSelectedAddress(user.addresses[e.target.value]);
//   };

//   const handlePayment = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   // const handleOrder = (e) => {
//   //   if (selectedAddress && paymentMethod) {
//   //     const order = {
//   //       items,
//   //       totalAmount,
//   //       totalItems,
//   //       user: user.id,
//   //       paymentMethod,
//   //       selectedAddress,
//   //       status: "pending", // other status can be delivered, received.
//   //     };
//   //     dispatch(createOrderAsync(order));
//   //     // need to redirect from here to a new page of order success.
//   //   } else {
//   //     alert("Enter Address and Payment method");
//   //   }
//   // };

// const loadRazorpay = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const handleOrder = async () => {
//   if (!selectedAddress || !paymentMethod) {
//     alert("Select address and payment method");
//     return;
//   }

//   // 🟢 CASH ON DELIVERY
//   if (paymentMethod === "cash") {
//     dispatch(
//       createOrderAsync({
//         items,
//         totalAmount,
//         totalItems,
//         user: user.id,
//         paymentMethod: "COD",
//         selectedAddress,
//       })
//     );
//     return;
//   }

//   // 🔵 CARD → RAZORPAY
//   const res = await loadRazorpay();
//   if (!res) {
//     alert("Razorpay SDK failed to load");
//     return;
//   }

//   // 1️⃣ Create Razorpay Order
//   const razorpayOrderRes = await fetch("http://localhost:8000/payment/create-order", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ totalAmount }),
//   });

//   const razorpayOrder = await razorpayOrderRes.json();

//   console.log("razorpayOrder",razorpayOrder);
//   // 2️⃣ Open Razorpay Checkout
//   const options = {
//     key: "rzp_test_S9oj75nxr45fDb", // 🔴 put test key
//     amount: razorpayOrder.order.amount,
//     currency: "INR",
//     name: "StyleVista",
//     order_id: razorpayOrder.order.id,

//     handler: async function (response) {
//       // 3️⃣ Verify payment
//       const verifyRes = await fetch("http://localhost:8000/payment/verify", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(response),
//       });

//       const verifyData = await verifyRes.json();
//       if (!verifyData.success) {
//         alert("Payment verification failed");
//         return;
//       }

//       // 4️⃣ Create order in DB
//       dispatch(
//         createOrderAsync({
//           items,
//           totalAmount,
//           totalItems,
//           user: user.id,
//           paymentMethod: "RAZORPAY",
//           selectedAddress,
//           razorpayOrderId: response.razorpay_order_id,
//           razorpayPaymentId: response.razorpay_payment_id,
//           razorpaySignature: response.razorpay_signature,
//         })
//       );
//     },

//     theme: { color: "#4f46e5" },
//   };

//   new window.Razorpay(options).open();
// };


//   return (
//     <>
//       {!items.length && <Navigate to="/" replace={true}></Navigate>}
//       {currentOrder && currentOrder.paymentMethod === "cash" && (
//         <Navigate
//           to={`/order-success/${currentOrder.id}`}
//           replace={true}
//         ></Navigate>
//       )}
//       {currentOrder && currentOrder.paymentMethod === "card" && (
//         <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
//       )}

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
//       ) : (
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
//             <div className="lg:col-span-3">
//               {/* This form is for address */}
//               <form
//                 style={{ width: "100%" }}
//                 className="bg-white px-5 py-12 mt-12"
//                 noValidate
//                 onSubmit={handleSubmit((data) => {
//                   dispatch(
//                     updateUserAsync({
//                       ...user,
//                       addresses: [...user.addresses, data],
//                     })
//                   );
//                   reset();
//                 })}
//               >
//                 <div className="space-y-12">
//                   <div className="border-b border-gray-900/10 pb-12">
//                     <h2 className="text-2xl font-semibold leading-7 text-gray-900">
//                       Personal Information
//                     </h2>
//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       Use a permanent address where you can receive mail.
//                     </p>

//                     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                       <div className="sm:col-span-4">
//                         <label
//                           htmlFor="name"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Full name
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("name", {
//                               required: "name is required",
//                             })}
//                             id="name"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.name && (
//                             <p className="text-red-500">
//                               {errors.name.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-4">
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Email address
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             id="email"
//                             {...register("email", {
//                               required: "email is required",
//                             })}
//                             type="email"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.email && (
//                             <p className="text-red-500">
//                               {errors.email.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Phone
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             id="phone"
//                             {...register("phone", {
//                               required: "phone is required",
//                             })}
//                             type="tel"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.phone && (
//                             <p className="text-red-500">
//                               {errors.phone.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="col-span-full">
//                         <label
//                           htmlFor="street-address"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Street address
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("street", {
//                               required: "street is required",
//                             })}
//                             id="street"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.street && (
//                             <p className="text-red-500">
//                               {errors.street.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2 sm:col-start-1">
//                         <label
//                           htmlFor="city"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           City
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("city", {
//                               required: "city is required",
//                             })}
//                             id="city"
//                             autoComplete="address-level2"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.city && (
//                             <p className="text-red-500">
//                               {errors.city.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2">
//                         <label
//                           htmlFor="state"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           State / Province
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("state", {
//                               required: "state is required",
//                             })}
//                             id="state"
//                             autoComplete="address-level1"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.state && (
//                             <p className="text-red-500">
//                               {errors.state.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2">
//                         <label
//                           htmlFor="pinCode"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           ZIP / Postal code
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("pinCode", {
//                               required: "pinCode is required",
//                             })}
//                             id="pinCode"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.pinCode && (
//                             <p className="text-red-500">
//                               {errors.pinCode.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex items-center justify-end gap-x-6">
//                     <button
//                       // onClick={e=>reset()}
//                       type="button"
//                       className="text-sm font-semibold leading-6 text-gray-900"
//                     >
//                       Reset
//                     </button>
//                     <button
//                       type="submit"
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Add Address
//                     </button>
//                   </div>
//                 </div>
//               </form>
//               <div className="border-b border-gray-900/10 pb-12 bg-white py-7 mt-7 mb-4 px-5">
//                 <h2 className="text-base font-semibold leading-7 text-gray-900">
//                   Addresses
//                 </h2>
//                 <p className="mt-1 text-sm leading-6 text-gray-600">
//                   Choose from Existing addresses
//                 </p>
//                 <ul>
//                   {user.addresses.map((address, index) => (
//                     <li
//                       key={index}
//                       className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
//                     >
//                       <div className="flex gap-x-4">
//                         <input
//                           onChange={handleAddress}
//                           name="address"
//                           type="radio"
//                           value={index}
//                           className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                         />
//                         <div className="min-w-0 flex-auto">
//                           <p className="text-sm font-semibold leading-6 text-gray-900">
//                             {address.name}
//                           </p>
//                           <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                             {address.street}
//                           </p>
//                           <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                             {address.pinCode}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="hidden sm:flex sm:flex-col sm:items-end">
//                         <p className="text-sm leading-6 text-gray-900">
//                           Phone: {address.phone}
//                         </p>
//                         <p className="text-sm leading-6 text-gray-500">
//                           {address.city}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="mt-10 space-y-10">
//                   <fieldset>
//                     <legend className="text-sm font-semibold leading-6 text-gray-900">
//                       Payment Methods
//                     </legend>
//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       Choose One
//                     </p>
//                     <div className="mt-6 space-y-6">
//                       <div className="flex items-center gap-x-3">
//                         <input
//                           id="cash"
//                           name="payments"
//                           onChange={handlePayment}
//                           value="cash"
//                           type="radio"
//                           checked={paymentMethod === "cash"}
//                           className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                         />
//                         <label
//                           htmlFor="cash"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Cash
//                         </label>
//                       </div>
//                       <div className="flex items-center gap-x-3">
//                         <input
//                           id="card"
//                           onChange={handlePayment}
//                           name="payments"
//                           checked={paymentMethod === "card"}
//                           value="card"
//                           type="radio"
//                           className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                         />
//                         <label
//                           htmlFor="card"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Card Payment
//                         </label>
//                       </div>
//                     </div>
//                   </fieldset>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:col-span-2">
//               <div className="mx-auto mt-0 lg:mt-12  bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
//                 <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
//                   <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
//                     Cart
//                   </h1>
//                   <div className="flow-root">
//                     <ul role="list" className="-my-6 divide-y divide-gray-200">
//                       {items.map((item) => (
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
//                                   $
//                                   {item?.product?.discountPrice
//                                     ? item?.product?.discountPrice
//                                     : Math.round(
//                                         item?.product?.price *
//                                           (1 -
//                                             item?.product?.discountPercentage /
//                                               100)
//                                       )}
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
//                                   Qty
//                                 </label>
//                                 <select
//                                   onChange={(e) => handleQuantity(e, item)}
//                                   value={item.quantity}
//                                 >
//                                   <option value="1">1</option>
//                                   <option value="2">2</option>
//                                   <option value="3">3</option>
//                                   <option value="4">4</option>
//                                   <option value="5">5</option>
//                                 </select>
//                               </div>

//                               <div className="flex">
//                                 <button
//                                   onClick={(e) => handleRemove(e, item.id)}
//                                   type="button"
//                                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                                 >
//                                   Remove
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
//                   <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//                     <p>Subtotal</p>
//                     <p>$ {totalAmount}</p>
//                   </div>
//                   <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//                     <p>Total Items in Cart</p>
//                     <p>{totalItems} items</p>
//                   </div>
//                   <p className="mt-0.5 text-sm text-gray-500">
//                     Shipping and taxes calculated at checkout.
//                   </p>
//                   <div className="mt-6">
//                     <div
//                       onClick={handleOrder}
//                       className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//                     >
//                       Order Now
//                     </div>
//                   </div>
//                   <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                     <p>
//                       or
//                       <Link to="/">
//                         <button
//                           type="button"
//                           className="font-medium text-indigo-600 hover:text-indigo-500"
//                         >
//                           Continue Shopping
//                           <span aria-hidden="true"> &rarr;</span>
//                         </button>
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Checkout;



// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   deleteItemFromCartAsync,
//   selectItems,
//   updateCartAsync,
// } from "../features/cart/cartSlice";
// import { Navigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { updateUserAsync } from "../features/user/Usermanagementslice";
// import { useState } from "react";
// import {
//   createOrderAsync,
//   selectCurrentOrder,
//   // selectOrderStatus,
//   selectOrderStatus 
// } from "../features/order/OrderSlice";
// import { selectUserInfo } from "../features/user/Usermanagementslice";
// import { Grid } from "react-loader-spinner";

// // Convert USD to INR
// function formatINRR(usdPrice) {
//   const inrPrice = Math.round(usdPrice * 83);
//   return inrPrice.toLocaleString('en-IN');
// }

// function Checkout() {
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const user = useSelector(selectUserInfo);
//   const items = useSelector(selectItems);
//   const status = useSelector(selectOrderStatus);
//   const currentOrder = useSelector(selectCurrentOrder);

//   const totalAmount = items.reduce(
//     (amount, item) =>
//       (item.product.discountPrice
//         ? item.product.discountPrice
//         : Math.round(
//             item.product?.price * (1 - item.product?.discountPercentage / 100)
//           )) *
//         item.quantity +
//       amount,
//     0
//   );
//   const totalItems = items.reduce((total, item) => item.quantity + total, 0);

//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [orderError, setOrderError] = useState(false);

//   const handleQuantity = (e, item) => {
//     dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
//   };

//   const handleRemove = (e, id) => {
//     dispatch(deleteItemFromCartAsync(id));
//   };

//   const handleAddress = (e) => {
//     setSelectedAddress(user.addresses[e.target.value]);
//   };

//   const handlePayment = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleOrder = async () => {
//     if (!selectedAddress || !paymentMethod) {
//       alert("Please select address and payment method");
//       return;
//     }

//     try {
//       setOrderError(false);

//       // 🟢 CASH ON DELIVERY
//       if (paymentMethod === "cash") {
//         const resultAction = await dispatch(
//           createOrderAsync({
//             items,
//             totalAmount,
//             totalItems,
//             user: user.id,
//             paymentMethod: "COD",
//             selectedAddress,
//           })
//         );

//         // Check if order creation was successful
//         if (createOrderAsync.fulfilled.match(resultAction)) {
//           // Success - will redirect via Navigate component
//           console.log("Order created successfully");
//         } else {
//           // Failed
//           setOrderError(true);
//         }
//         return;
//       }

//       // 🔵 CARD → RAZORPAY
//       const res = await loadRazorpay();
//       if (!res) {
//         alert("Razorpay SDK failed to load. Please try again.");
//         setOrderError(true);
//         return;
//       }

//       // 1️⃣ Create Razorpay Order
//       const razorpayOrderRes = await fetch(
//         `${process.env.REACT_APP_BACKEND_URL}/payment/create-order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ totalAmount }),
//         }
//       );

//       if (!razorpayOrderRes.ok) {
//         throw new Error("Failed to create Razorpay order");
//       }

//       const razorpayOrder = await razorpayOrderRes.json();
//       console.log("razorpayOrder", razorpayOrder);

//       // 2️⃣ Open Razorpay Checkout
//       const options = {
//         key: "rzp_test_S9oj75nxr45fDb", // 🔴 Replace with your test key
//         amount: razorpayOrder.order.amount,
//         currency: "INR",
//         name: "StyleVista",
//         description: "Purchase from StyleVista",
//         order_id: razorpayOrder.order.id,

//         handler: async function (response) {
//           try {
//             // 3️⃣ Verify payment
//             const verifyRes = await fetch(
//               `${process.env.REACT_APP_BACKEND_URL}/payment/verify`,
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(response),
//               }
//             );

//             const verifyData = await verifyRes.json();
//             if (!verifyData.success) {
//               alert("Payment verification failed");
//               setOrderError(true);
//               return;
//             }

//             // 4️⃣ Create order in DB
//             const resultAction = await dispatch(
//               createOrderAsync({
//                 items,
//                 totalAmount,
//                 totalItems,
//                 user: user.id,
//                 paymentMethod: "RAZORPAY",
//                 selectedAddress,
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id,
//                 razorpaySignature: response.razorpay_signature,
//               })
//             );

//             // Check if order creation was successful
//             if (!createOrderAsync.fulfilled.match(resultAction)) {
//               setOrderError(true);
//             }
//           } catch (error) {
//             console.error("Error in payment handler:", error);
//             setOrderError(true);
//           }
//         },

//         modal: {
//           ondismiss: function () {
//             console.log("Payment cancelled by user");
//             // User closed the payment modal
//           },
//         },

//         theme: { color: "#667eea" },
//       };

//       const razorpayInstance = new window.Razorpay(options);
      
//       razorpayInstance.on('payment.failed', function (response) {
//         console.error("Payment failed:", response.error);
//         setOrderError(true);
//         // alert("Payment failed. Please try again.");
//       });

//       razorpayInstance.open();
//     } catch (error) {
//       console.error("Error in handleOrder:", error);
//       setOrderError(true);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <>
//       {!items.length && <Navigate to="/" replace={true}></Navigate>}
      
//       {/* Redirect to success page for COD */}
//       {currentOrder && currentOrder.paymentMethod === "COD" && (
//         <Navigate
//           to={`/order-success/${currentOrder.id}`}
//           replace={true}
//         ></Navigate>
//       )}
      
//       {/* Redirect to success page for Razorpay */}
//       {currentOrder && currentOrder.paymentMethod === "RAZORPAY" && (
//         <Navigate
//           to={`/order-success/${currentOrder.id}`}
//           replace={true}
//         ></Navigate>
//       )}
      
//       {/* Redirect to failure page if order creation failed */}
//       {orderError && (
//         <Navigate to="/order-failed" replace={true}></Navigate>
//       )}

//       {status === "loading" ? (
//         <div className="flex justify-center items-center min-h-screen">
//           <Grid
//             height="80"
//             width="80"
//             color="rgb(102, 126, 234)"
//             ariaLabel="grid-loading"
//             radius="12.5"
//             visible={true}
//           />
//         </div>
//       ) : (
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
//             <div className="lg:col-span-3">
//               {/* This form is for address */}
//               <form
//                 style={{ width: "100%" }}
//                 className="bg-white px-5 py-12 mt-12 rounded-xl shadow-sm"
//                 noValidate
//                 onSubmit={handleSubmit((data) => {
//                   dispatch(
//                     updateUserAsync({
//                       ...user,
//                       addresses: [...user.addresses, data],
//                     })
//                   );
//                   reset();
//                 })}
//               >
//                 <div className="space-y-12">
//                   <div className="border-b border-gray-900/10 pb-12">
//                     <h2 className="text-2xl font-semibold leading-7 text-gray-900">
//                       Personal Information
//                     </h2>
//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       Use a permanent address where you can receive mail.
//                     </p>

//                     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                       <div className="sm:col-span-4">
//                         <label
//                           htmlFor="name"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Full name
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("name", {
//                               required: "name is required",
//                             })}
//                             id="name"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.name && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.name.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-4">
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Email address
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             id="email"
//                             {...register("email", {
//                               required: "email is required",
//                             })}
//                             type="email"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.email && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.email.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-3">
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Phone
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             id="phone"
//                             {...register("phone", {
//                               required: "phone is required",
//                             })}
//                             type="tel"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.phone && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.phone.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="col-span-full">
//                         <label
//                           htmlFor="street-address"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Street address
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("street", {
//                               required: "street is required",
//                             })}
//                             id="street"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.street && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.street.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2 sm:col-start-1">
//                         <label
//                           htmlFor="city"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           City
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("city", {
//                               required: "city is required",
//                             })}
//                             id="city"
//                             autoComplete="address-level2"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.city && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.city.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2">
//                         <label
//                           htmlFor="state"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           State / Province
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("state", {
//                               required: "state is required",
//                             })}
//                             id="state"
//                             autoComplete="address-level1"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.state && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.state.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       <div className="sm:col-span-2">
//                         <label
//                           htmlFor="pinCode"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           ZIP / Postal code
//                         </label>
//                         <div className="mt-2">
//                           <input
//                             type="text"
//                             {...register("pinCode", {
//                               required: "pinCode is required",
//                             })}
//                             id="pinCode"
//                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                           />
//                           {errors.pinCode && (
//                             <p className="text-red-500 text-sm mt-1">
//                               {errors.pinCode.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex items-center justify-end gap-x-6">
//                     <button
//                       onClick={() => reset()}
//                       type="button"
//                       className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
//                     >
//                       Reset
//                     </button>
//                     <button
//                       type="submit"
//                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                     >
//                       Add Address
//                     </button>
//                   </div>
//                 </div>
//               </form>
              
//               <div className="border-b border-gray-900/10 pb-12 bg-white py-7 mt-7 mb-4 px-5 rounded-xl shadow-sm">
//                 <h2 className="text-base font-semibold leading-7 text-gray-900">
//                   Addresses
//                 </h2>
//                 <p className="mt-1 text-sm leading-6 text-gray-600">
//                   Choose from Existing addresses
//                 </p>
//                 <ul className="mt-6 space-y-4">
//                   {user?.addresses?.map((address, index) => (
//                     <li
//                       key={index}
//                       className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
//                     >
//                       <div className="flex gap-x-4">
//                         <input
//                           onChange={handleAddress}
//                           name="address"
//                           type="radio"
//                           value={index}
//                           className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-1"
//                         />
//                         <div className="min-w-0 flex-auto">
//                           <p className="text-sm font-semibold leading-6 text-gray-900">
//                             {address.name}
//                           </p>
//                           <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                             {address.street}
//                           </p>
//                           <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                             {address.pinCode}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="hidden sm:flex sm:flex-col sm:items-end">
//                         <p className="text-sm leading-6 text-gray-900">
//                           Phone: {address.phone}
//                         </p>
//                         <p className="text-sm leading-6 text-gray-500">
//                           {address.city}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>

//                 <div className="mt-10 space-y-10">
//                   <fieldset>
//                     <legend className="text-sm font-semibold leading-6 text-gray-900">
//                       Payment Methods
//                     </legend>
//                     <p className="mt-1 text-sm leading-6 text-gray-600">
//                       Choose One
//                     </p>
//                     <div className="mt-6 space-y-6">
//                       <div className="flex items-center gap-x-3">
//                         <input
//                           id="cash"
//                           name="payments"
//                           onChange={handlePayment}
//                           value="cash"
//                           type="radio"
//                           checked={paymentMethod === "cash"}
//                           className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                         />
//                         <label
//                           htmlFor="cash"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Cash on Delivery
//                         </label>
//                       </div>
//                       <div className="flex items-center gap-x-3">
//                         <input
//                           id="card"
//                           onChange={handlePayment}
//                           name="payments"
//                           checked={paymentMethod === "card"}
//                           value="card"
//                           type="radio"
//                           className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
//                         />
//                         <label
//                           htmlFor="card"
//                           className="block text-sm font-medium leading-6 text-gray-900"
//                         >
//                           Card Payment (Razorpay)
//                         </label>
//                       </div>
//                     </div>
//                   </fieldset>
//                 </div>
//               </div>
//             </div>
            
//             <div className="lg:col-span-2">
//               <div className="mx-auto mt-0 lg:mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4 rounded-xl shadow-sm">
//                 <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
//                   <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
//                     Cart
//                   </h1>
//                   <div className="flow-root">
//                     <ul role="list" className="-my-6 divide-y divide-gray-200">
//                       {items.map((item) => (
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
//                                   ₹
//                                   {
//                                     item?.product?.discountPrice
//                                       ? item?.product?.discountPrice
//                                       : Math.round(
//                                           item?.product?.price *
//                                             (1 -
//                                               item?.product?.discountPercentage /
//                                                 100)
//                                         )
//                                   }
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
//                                   Qty
//                                 </label>
//                                 <select
//                                   onChange={(e) => handleQuantity(e, item)}
//                                   value={item.quantity}
//                                   className="rounded-md border-gray-300 text-sm"
//                                 >
//                                   <option value="1">1</option>
//                                   <option value="2">2</option>
//                                   <option value="3">3</option>
//                                   <option value="4">4</option>
//                                   <option value="5">5</option>
//                                 </select>
//                               </div>

//                               <div className="flex">
//                                 <button
//                                   onClick={(e) => handleRemove(e, item.id)}
//                                   type="button"
//                                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                                 >
//                                   Remove
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
//                   <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//                     <p>Subtotal</p>
//                     <p>₹ {totalAmount}</p>
//                   </div>
//                   <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//                     <p>Total Items in Cart</p>
//                     <p>{totalItems} items</p>
//                   </div>
//                   <p className="mt-0.5 text-sm text-gray-500">
//                     Shipping and taxes calculated at checkout.
//                   </p>
//                   <div className="mt-6">
//                     <button
//                       onClick={handleOrder}
//                       disabled={status === "loading"}
//                       className="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//                     >
//                       {status === "loading" ? "Processing..." : "Order Now"}
//                     </button>
//                   </div>
//                   <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                     <p>
//                       or{" "}
//                       <Link to="/">
//                         <button
//                           type="button"
//                           className="font-medium text-indigo-600 hover:text-indigo-500"
//                         >
//                           Continue Shopping
//                           <span aria-hidden="true"> &rarr;</span>
//                         </button>
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Checkout;










import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/Usermanagementslice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectOrderStatus 
} from "../features/order/OrderSlice";
import { selectUserInfo } from "../features/user/Usermanagementslice";
import { Grid } from "react-loader-spinner";

// Convert USD to INR
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString('en-IN');
}

function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const status = useSelector(selectOrderStatus);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) =>
      (item.product.discountPrice
        ? item.product.discountPrice
        : Math.round(
            item.product?.price * (1 - item.product?.discountPercentage / 100)
          )) *
        item.quantity +
      amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderError, setOrderError] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOrder = async () => {
    if (!selectedAddress || !paymentMethod) {
      alert("Please select address and payment method");
      return;
    }

    try {
      setOrderError(false);

      // 🟢 CASH ON DELIVERY
      if (paymentMethod === "cash") {
        const resultAction = await dispatch(
          createOrderAsync({
            items,
            totalAmount,
            totalItems,
            user: user.id,
            paymentMethod: "COD",
            selectedAddress,
          })
        );

        if (createOrderAsync.fulfilled.match(resultAction)) {
          console.log("Order created successfully");
        } else {
          setOrderError(true);
        }
        return;
      }

      // 🔵 CARD → RAZORPAY
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load. Please try again.");
        setOrderError(true);
        return;
      }

      // 1️⃣ Create Razorpay Order
      const razorpayOrderRes = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ totalAmount }),
        }
      );

      if (!razorpayOrderRes.ok) {
        throw new Error("Failed to create Razorpay order");
      }

      const razorpayOrder = await razorpayOrderRes.json();

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: "rzp_test_S9oj75nxr45fDb",
        amount: razorpayOrder.order.amount,
        currency: "INR",
        name: "StyleVista",
        description: "Purchase from StyleVista",
        order_id: razorpayOrder.order.id,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/payment/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
              alert("Payment verification failed");
              setOrderError(true);
              return;
            }

            // 4️⃣ Create order in DB
            const resultAction = await dispatch(
              createOrderAsync({
                items,
                totalAmount,
                totalItems,
                user: user.id,
                paymentMethod: "RAZORPAY",
                selectedAddress,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              })
            );

            if (!createOrderAsync.fulfilled.match(resultAction)) {
              setOrderError(true);
            }
          } catch (error) {
            console.error("Error in payment handler:", error);
            setOrderError(true);
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment cancelled by user");
          },
        },

        theme: { color: "#667eea" },
      };

      const razorpayInstance = new window.Razorpay(options);
      
      razorpayInstance.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        setOrderError(true);
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Error in handleOrder:", error);
      setOrderError(true);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      
      {currentOrder && currentOrder.paymentMethod === "COD" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      
      {currentOrder && currentOrder.paymentMethod === "RAZORPAY" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      
      {orderError && (
        <Navigate to="/order-failed" replace={true}></Navigate>
      )}

      {status === "loading" ? (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center">
            <Grid
              height="80"
              width="80"
              color="rgb(102, 126, 234)"
              ariaLabel="grid-loading"
              radius="12.5"
              visible={true}
            />
            <p className="mt-4 text-lg font-semibold text-gray-700">Processing your order...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                <svg className="w-10 h-10 mr-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Checkout
              </h1>
              <p className="mt-2 text-gray-600">Complete your purchase</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedAddress ? 'bg-green-500' : 'bg-indigo-600'} text-white font-semibold`}>
                    {selectedAddress ? '✓' : '1'}
                  </div>
                  <span className="ml-3 font-semibold text-gray-900">Address</span>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${selectedAddress ? 'bg-green-500' : 'bg-gray-300'} transition-all duration-300`} style={{width: selectedAddress ? '100%' : '0%'}}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod ? 'bg-green-500' : selectedAddress ? 'bg-indigo-600' : 'bg-gray-300'} text-white font-semibold`}>
                    {paymentMethod ? '✓' : '2'}
                  </div>
                  <span className="ml-3 font-semibold text-gray-900">Payment</span>
                </div>
                <div className="flex-1 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${selectedAddress && paymentMethod ? 'bg-green-500' : 'bg-gray-300'} transition-all duration-300`} style={{width: selectedAddress && paymentMethod ? '100%' : '0%'}}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedAddress && paymentMethod ? 'bg-indigo-600' : 'bg-gray-300'} text-white font-semibold`}>
                    3
                  </div>
                  <span className="ml-3 font-semibold text-gray-900">Review</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Address & Payment */}
              <div className="lg:col-span-2 space-y-6">
                {/* Existing Addresses */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Delivery Address
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    {user?.addresses?.length > 0 ? (
                      <div className="space-y-3">
                        {user.addresses.map((address, index) => (
                          <label
                            key={index}
                            className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                              selectedAddress === address
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                            }`}
                          >
                            <input
                              onChange={handleAddress}
                              name="address"
                              type="radio"
                              value={index}
                              className="mt-1 h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-semibold text-gray-900">{address.name}</p>
                                  <p className="mt-1 text-sm text-gray-600">{address.street}</p>
                                  <p className="text-sm text-gray-600">
                                    {address.city}, {address.state} {address.pinCode}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {address.phone}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        <p className="mt-4 text-gray-600">No saved addresses</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {showAddressForm ? 'Cancel' : 'Add New Address'}
                    </button>
                  </div>
                </div>

                {/* Add Address Form */}
                {showAddressForm && (
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fadeIn">
                    <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4">
                      <h3 className="text-xl font-bold text-white">Add New Address</h3>
                    </div>
                    <form
                      className="p-6"
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        dispatch(
                          updateUserAsync({
                            ...user,
                            addresses: [...user.addresses, data],
                          })
                        );
                        reset();
                        setShowAddressForm(false);
                      })}
                    >
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            id="name"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="John Doe"
                          />
                          {errors.name && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            {...register("phone", { required: "Phone is required" })}
                            type="tel"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="+91 98765 43210"
                          />
                          {errors.phone && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="john@example.com"
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            {...register("street", { required: "Street is required" })}
                            id="street"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="123 Main Street"
                          />
                          {errors.street && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.street.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            {...register("city", { required: "City is required" })}
                            id="city"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="Mumbai"
                          />
                          {errors.city && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.city.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                            State
                          </label>
                          <input
                            type="text"
                            {...register("state", { required: "State is required" })}
                            id="state"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="Maharashtra"
                          />
                          {errors.state && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.state.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="pinCode" className="block text-sm font-semibold text-gray-700 mb-2">
                            PIN Code
                          </label>
                          <input
                            type="text"
                            {...register("pinCode", { required: "PIN code is required" })}
                            id="pinCode"
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2.5"
                            placeholder="400001"
                          />
                          {errors.pinCode && (
                            <p className="mt-1.5 text-sm text-red-600 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            reset();
                            setShowAddressForm(false);
                          }}
                          className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Method
                    </h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      paymentMethod === "cash"
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}>
                      <input
                        id="cash"
                        name="payments"
                        onChange={handlePayment}
                        value="cash"
                        type="radio"
                        checked={paymentMethod === "cash"}
                        className="mt-1 h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="font-semibold text-gray-900">Cash on Delivery</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      paymentMethod === "card"
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}>
                      <input
                        id="card"
                        onChange={handlePayment}
                        name="payments"
                        checked={paymentMethod === "card"}
                        value="card"
                        type="radio"
                        className="mt-1 h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="font-semibold text-gray-900">Card Payment (Razorpay)</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Secure payment via Razorpay</p>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">💳 Credit Card</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">💳 Debit Card</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">🏦 UPI</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Order Summary</h2>
                  </div>

                  <div className="p-6">
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                              {item.product.title}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">{item.product.brand}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <select
                                onChange={(e) => handleQuantity(e, item)}
                                value={item.quantity}
                                className="text-xs rounded border-gray-300 py-1 px-2"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                  <option key={num} value={num}>{num}</option>
                                ))}
                              </select>
                              <p className="text-sm font-bold text-gray-900">
                                ₹{(item?.product?.discountPrice
                                  ? item?.product?.discountPrice
                                  : Math.round(
                                      item?.product?.price *
                                        (1 - item?.product?.discountPercentage / 100)
                                    )) * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 pb-4 border-b border-gray-200">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                        <span className="font-semibold text-gray-900">₹{totalAmount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold text-green-600">FREE</span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 mb-6">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-indigo-600">₹{totalAmount}</span>
                    </div>

                    {/* Order Button */}
                    <button
                      onClick={handleOrder}
                      disabled={!selectedAddress || !paymentMethod || status === "loading"}
                      className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Place Order
                        </>
                      )}
                    </button>

                    {/* Security Badge */}
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center text-sm text-green-800">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Secure & encrypted payment
                      </div>
                    </div>

                    {/* Continue Shopping */}
                    <Link
                      to="/"
                      className="mt-4 w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default Checkout;