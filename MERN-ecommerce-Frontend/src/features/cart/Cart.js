// import { Fragment, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   deleteItemFromCartAsync,
//   selectCartLoaded,
//   selectCartStatus,
//   selectItems,
//   updateCartAsync,
// } from "./cartSlice";
// import { Link } from "react-router-dom";
// import { Navigate } from "react-router-dom";
// import { Grid } from "react-loader-spinner";
// import Modal from "../common/Modal";

// export default function Cart() {
//   const dispatch = useDispatch();

//   const items = useSelector(selectItems);
//   const status = useSelector(selectCartStatus);
//   const cartLoaded = useSelector(selectCartLoaded);
//   const [openModal, setOpenModal] = useState(null);

//   const totalAmount = items.reduce(
//     (amount, item) =>
//       item.product?.discountPrice
//         ? item.product?.discountPrice
//         : Math.round(
//             item.product?.price * (1 - item.product?.discountPercentage / 100)
//           ) *
//             item.quantity +
//           amount,
//     0
//   );
//   const totalItems = items.reduce((total, item) => item.quantity + total, 0);

//   const handleQuantity = (e, item) => {
//     dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
//   };

//   const handleRemove = (e, id) => {
//     dispatch(deleteItemFromCartAsync(id));
//   };

//   return (
//     <>
//       {!items.length && cartLoaded && (
//         <Navigate to="/" replace={true}></Navigate>
//       )}

//       <div>
//         <div className="mx-auto mt-1 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//             <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
//               Cart
//             </h1>
//             <div className="flow-root">
//               {status === "loading" ? (
//                 <Grid
//                   height="80"
//                   width="80"
//                   color="rgb(79, 70, 229) "
//                   ariaLabel="grid-loading"
//                   radius="12.5"
//                   wrapperStyle={{}}
//                   wrapperClass=""
//                   visible={true}
//                 />
//               ) : null}
//               <ul className="-my-6 divide-y divide-gray-200">
//                 {items.map((item) => (
//                   <li key={item.id} className="flex py-6">
//                     {console.log("item", item, item.product)}
//                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                       <img
//                         src={item.product?.thumbnail}
//                         alt={item.product?.title}
//                         className="h-full w-full object-cover object-center"
//                       />
//                     </div>

//                     <div className="ml-4 flex flex-1 flex-col">
//                       <div>
//                         <div className="flex justify-between text-base font-medium text-gray-900">
//                           <h3>
//                             <a href={item.product?.id}>{item.product?.title}</a>
//                           </h3>

//                           <p className="ml-4">
//                             $
//                             {item?.product?.discountPrice
//                               ? item?.product?.discountPrice
//                               : Math.round(
//                                   item?.product?.price *
//                                     (1 -
//                                       item?.product?.discountPercentage / 100)
//                                 )}
//                           </p>
//                         </div>
//                         <p className="mt-1 text-sm text-gray-500">
//                           {item.product?.brand}
//                         </p>
//                       </div>
//                       <div className="flex flex-1 items-end justify-between text-sm">
//                         <div className="text-gray-500">
//                           <label
//                             htmlFor="quantity"
//                             className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
//                           >
//                             Qty
//                           </label>
//                           <select
//                             onChange={(e) => handleQuantity(e, item)}
//                             value={item.quantity}
//                           >
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                           </select>
//                         </div>

//                         <div className="flex">
//                           <Modal
//                             title={`Delete ${item.product?.title}`}
//                             message="Are you sure you want to delete this Cart item ?"
//                             dangerOption="Delete"
//                             cancelOption="Cancel"
//                             dangerAction={(e) => handleRemove(e, item.id)}
//                             cancelAction={() => setOpenModal(null)}
//                             showModal={openModal === item.id}
//                           ></Modal>
//                           <button
//                             onClick={(e) => {
//                               setOpenModal(item.id);
//                             }}
//                             type="button"
//                             className="font-medium text-indigo-600 hover:text-indigo-500"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//             <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//               <p>Subtotal</p>
//               <p>$ {totalAmount}</p>
//             </div>
//             <div className="flex justify-between my-2 text-base font-medium text-gray-900">
//               <p>Total Items in Cart</p>
//               <p>{totalItems} items</p>
//             </div>
//             <p className="mt-0.5 text-sm text-gray-500">
//               Shipping and taxes calculated at checkout.
//             </p>
//             <div className="mt-6">
//               <Link
//                 to="/checkout"
//                 className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//               >
//                 Checkout
//               </Link>
//             </div>
//             <div className="mt-6 flex justify-center text-center text-sm text-gray-500 font-medium">
//               <p>
//                 Or{" "}
//                 <Link to="/">
//                   <button
//                     type="button"
//                     className="font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     Continue Shopping
//                     <span aria-hidden="true"> &rarr;</span>
//                   </button>
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import Modal from "../common/Modal";

export default function Cart() {
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded);
  const [openModal, setOpenModal] = useState(null);

  const totalAmount = items.reduce(
    (amount, item) =>
      item.product?.discountPrice
        ? item.product?.discountPrice * item.quantity
        : Math.round(
            item.product?.price * (1 - item.product?.discountPercentage / 100)
          ) *
            item.quantity +
          amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center">
              <svg className="w-10 h-10 mr-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping Cart
              {totalItems > 0 && (
                <span className="ml-4 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              )}
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {status === "loading" ? (
                  <div className="flex justify-center items-center py-20">
                    <Grid
                      height="80"
                      width="80"
                      color="rgb(79, 70, 229)"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-6 text-2xl font-semibold text-gray-900">Your cart is empty</h3>
                    <p className="mt-2 text-gray-500">Start adding some items to your cart!</p>
                    <Link
                      to="/"
                      className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {items.map((item, index) => (
                      <div
                        key={item.id}
                        className="p-6 hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex gap-6">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="h-32 w-32 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-indigo-300 transition-all duration-200">
                              <img
                                src={item.product?.thumbnail}
                                alt={item.product?.title}
                                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 flex flex-col">
                            <div className="flex justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                                  <Link to={`/product/${item.product?.id}`}>
                                    {item.product?.title}
                                  </Link>
                                </h3>
                                {item.product?.brand && (
                                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                    {item.product?.brand}
                                  </p>
                                )}
                              </div>

                              {/* Price */}
                              <div className="text-right ml-4">
                                <p className="text-2xl font-bold text-gray-900">
                                  ₹
                                  {item?.product?.discountPrice
                                    ? item?.product?.discountPrice
                                    : Math.round(
                                        item?.product?.price *
                                          (1 -
                                            item?.product?.discountPercentage / 100)
                                      )}
                                </p>
                                {item?.product?.discountPercentage > 0 && (
                                  <p className="mt-1 text-sm text-gray-500 line-through">
                                    ₹{item?.product?.price}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Quantity and Remove */}
                            <div className="mt-auto flex items-center justify-between pt-4">
                              <div className="flex items-center space-x-3">
                                <label
                                  htmlFor={`quantity-${item.id}`}
                                  className="text-sm font-medium text-gray-700"
                                >
                                  Quantity:
                                </label>
                                <select
                                  id={`quantity-${item.id}`}
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                  className="rounded-lg border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                                </select>
                              </div>

                              <div className="flex items-center space-x-4">
                                <p className="text-lg font-semibold text-gray-900">
                              Subtotal: 
                                  ₹{(item?.product?.discountPrice
                                    ? item?.product?.discountPrice
                                    : Math.round(
                                        item?.product?.price *
                                          (1 -
                                            item?.product?.discountPercentage / 100)
                                      )) * item.quantity}
                                </p>
                                <Modal
                                  title={`Remove ${item.product?.title}`}
                                  message="Are you sure you want to remove this item from your cart?"
                                  dangerOption="Remove"
                                  cancelOption="Cancel"
                                  dangerAction={(e) => handleRemove(e, item.id)}
                                  cancelAction={() => setOpenModal(null)}
                                  showModal={openModal === item.id}
                                />
                                <button
                                  onClick={(e) => {
                                    setOpenModal(item.id);
                                  }}
                                  type="button"
                                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Total Items */}
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Total Items</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Shipping Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 flex items-start">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    to="/checkout"
                    className="w-full mt-6 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Proceed to Checkout
                  </Link>

                  {/* Continue Shopping */}
                  <Link
                    to="/"
                    className="w-full mt-3 flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure Checkout
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Why Shop With Us?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                      <p className="text-xs text-gray-500">On orders over ₹499</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                      <p className="text-xs text-gray-500">30-day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                      <p className="text-xs text-gray-500">100% secure transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          animation: fadeIn 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}