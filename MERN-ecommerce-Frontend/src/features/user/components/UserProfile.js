// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectUserInfo, updateUserAsync } from "../Usermanagementslice";
// import { useForm } from "react-hook-form";

// export default function UserProfile() {
//   const dispatch = useDispatch();
//   const userInfo = useSelector(selectUserInfo);
//   const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
//   const [showAddAddressForm, setShowAddAddressForm] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const handleEdit = (addressUpdate, index) => {
//     const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
//     newUser.addresses.splice(index, 1, addressUpdate);
//     dispatch(updateUserAsync(newUser));
//     setSelectedEditIndex(-1);
//   };
//   const handleRemove = (e, index) => {
//     const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue
//     newUser.addresses.splice(index, 1);
//     dispatch(updateUserAsync(newUser));
//   };

//   const handleEditForm = (index) => {
//     setSelectedEditIndex(index);
//     const address = userInfo.addresses[index];
//     setValue("name", address.name);
//     setValue("email", address.email);
//     setValue("city", address.city);
//     setValue("state", address.state);
//     setValue("pinCode", address.pinCode);
//     setValue("phone", address.phone);
//     setValue("street", address.street);
//   };

//   const handleAdd = (address) => {
//     const newUser = {
//       ...userInfo,
//       addresses: [...userInfo.addresses, address],
//     };
//     dispatch(updateUserAsync(newUser));
//     setShowAddAddressForm(false);
//   };

//   return (
//     <div>
//       <div className="mx-auto mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//           <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
//             Name:{" "}
//             {userInfo.firstName
//               ? ` ${userInfo.firstName} ${userInfo.lastName}`
//               : "New User"}
//           </h1>
//           <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
//             email address : {userInfo.email}
//           </h3>
//           {userInfo.role === "admin" && (
//             <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
//               role : {userInfo.role}
//             </h3>
//           )}
//         </div>

//         <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//           <button
//             onClick={(e) => {
//               setShowAddAddressForm(true);
//               setSelectedEditIndex(-1);
//             }}
//             type="submit"
//             className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Add New Address
//           </button>
//           {showAddAddressForm ? (
//             <form
//               className="bg-white px-5 py-12 mt-12"
//               noValidate
//               onSubmit={handleSubmit((data) => {
//                 handleAdd(data);
//                 reset();
//               })}
//             >
//               <div className="space-y-12">
//                 <div className="border-b border-gray-900/10 pb-12">
//                   <h2 className="text-2xl font-semibold leading-7 text-gray-900">
//                     Personal Information
//                   </h2>
//                   <p className="mt-1 text-sm leading-6 text-gray-600">
//                     Use a permanent address where you can receive mail.
//                   </p>

//                   <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                     <div className="sm:col-span-4">
//                       <label
//                         htmlFor="name"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         Full name
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type="text"
//                           {...register("name", {
//                             required: "name is required",
//                           })}
//                           id="name"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.name && (
//                           <p className="text-red-500">{errors.name.message}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="sm:col-span-4">
//                       <label
//                         htmlFor="email"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         Email address
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="email"
//                           {...register("email", {
//                             required: "email is required",
//                           })}
//                           type="email"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.email && (
//                           <p className="text-red-500">{errors.email.message}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="sm:col-span-3">
//                       <label
//                         htmlFor="phone"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         Phone
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           id="phone"
//                           {...register("phone", {
//                             required: "phone is required",
//                           })}
//                           type="tel"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.phone && (
//                           <p className="text-red-500">{errors.phone.message}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="col-span-full">
//                       <label
//                         htmlFor="street-address"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         Street address
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type="text"
//                           {...register("street", {
//                             required: "street is required",
//                           })}
//                           id="street"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.street && (
//                           <p className="text-red-500">
//                             {errors.street.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="sm:col-span-2 sm:col-start-1">
//                       <label
//                         htmlFor="city"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         City
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type="text"
//                           {...register("city", {
//                             required: "city is required",
//                           })}
//                           id="city"
//                           autoComplete="address-level2"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.city && (
//                           <p className="text-red-500">{errors.city.message}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="sm:col-span-2">
//                       <label
//                         htmlFor="state"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         State / Province
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type="text"
//                           {...register("state", {
//                             required: "state is required",
//                           })}
//                           id="state"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.state && (
//                           <p className="text-red-500">{errors.state.message}</p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="sm:col-span-2">
//                       <label
//                         htmlFor="pinCode"
//                         className="block text-sm font-medium leading-6 text-gray-900"
//                       >
//                         ZIP / Postal code
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type="text"
//                           {...register("pinCode", {
//                             required: "pinCode is required",
//                           })}
//                           id="pinCode"
//                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         />
//                         {errors.pinCode && (
//                           <p className="text-red-500">
//                             {errors.pinCode.message}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex items-center justify-end gap-x-6">
//                   <button
//                     type="submit"
//                     className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                   >
//                     Add Address
//                   </button>
//                 </div>
//               </div>
//             </form>
//           ) : null}

//           <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
//           {userInfo.addresses.map((address, index) => (
//             <div key={index}>
//               {selectedEditIndex === index ? (
//                 <form
//                   className="bg-white px-5 py-12 mt-12"
//                   noValidate
//                   onSubmit={handleSubmit((data) => {
//                     handleEdit(data, index);
//                     reset();
//                   })}
//                 >
//                   <div className="space-y-12">
//                     <div className="border-b border-gray-900/10 pb-12">
//                       <h2 className="text-2xl font-semibold leading-7 text-gray-900">
//                         Personal Information
//                       </h2>
//                       <p className="mt-1 text-sm leading-6 text-gray-600">
//                         Use a permanent address where you can receive mail.
//                       </p>

//                       <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                         <div className="sm:col-span-4">
//                           <label
//                             htmlFor="name"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             Full name
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               type="text"
//                               {...register("name", {
//                                 required: "name is required",
//                               })}
//                               id="name"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.name && (
//                               <p className="text-red-500">
//                                 {errors.name.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="sm:col-span-4">
//                           <label
//                             htmlFor="email"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             Email address
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               id="email"
//                               {...register("email", {
//                                 required: "email is required",
//                               })}
//                               type="email"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.email && (
//                               <p className="text-red-500">
//                                 {errors.email.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="sm:col-span-3">
//                           <label
//                             htmlFor="phone"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             Phone
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               id="phone"
//                               {...register("phone", {
//                                 required: "phone is required",
//                               })}
//                               type="tel"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.phone && (
//                               <p className="text-red-500">
//                                 {errors.phone.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="col-span-full">
//                           <label
//                             htmlFor="street-address"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             Street address
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               type="text"
//                               {...register("street", {
//                                 required: "street is required",
//                               })}
//                               id="street"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.street && (
//                               <p className="text-red-500">
//                                 {errors.street.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="sm:col-span-2 sm:col-start-1">
//                           <label
//                             htmlFor="city"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             City
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               type="text"
//                               {...register("city", {
//                                 required: "city is required",
//                               })}
//                               id="city"
//                               autoComplete="address-level2"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.city && (
//                               <p className="text-red-500">
//                                 {errors.city.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="sm:col-span-2">
//                           <label
//                             htmlFor="state"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             State / Province
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               type="text"
//                               {...register("state", {
//                                 required: "state is required",
//                               })}
//                               id="state"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.state && (
//                               <p className="text-red-500">
//                                 {errors.state.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         <div className="sm:col-span-2">
//                           <label
//                             htmlFor="pinCode"
//                             className="block text-sm font-medium leading-6 text-gray-900"
//                           >
//                             ZIP / Postal code
//                           </label>
//                           <div className="mt-2">
//                             <input
//                               type="text"
//                               {...register("pinCode", {
//                                 required: "pinCode is required",
//                               })}
//                               id="pinCode"
//                               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             />
//                             {errors.pinCode && (
//                               <p className="text-red-500">
//                                 {errors.pinCode.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-6 flex items-center justify-end gap-x-6">
//                       <button
//                         onClick={(e) => setSelectedEditIndex(-1)}
//                         type="submit"
//                         className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       >
//                         Edit Address
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               ) : null}
//               <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
//                 <div className="flex gap-x-4">
//                   <div className="min-w-0 flex-auto">
//                     <p className="text-sm font-semibold leading-6 text-gray-900">
//                       {address.name}
//                     </p>
//                     <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                       {address.street}
//                     </p>
//                     <p className="mt-1 truncate text-xs leading-5 text-gray-500">
//                       {address.pinCode}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="hidden sm:flex sm:flex-col sm:items-end">
//                   <p className="text-sm leading-6 text-gray-900">
//                     Phone: {address.phone}
//                   </p>
//                   <p className="text-sm leading-6 text-gray-500">
//                     {address.city}
//                   </p>
//                 </div>
//                 <div className="hidden sm:flex sm:flex-col sm:items-end">
//                   <button
//                     onClick={(e) => handleEditForm(index)}
//                     type="button"
//                     className="font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={(e) => handleRemove(e, index)}
//                     type="button"
//                     className="font-medium text-indigo-600 hover:text-indigo-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectUserInfo, updateUserAsync } from "../Usermanagementslice";
// import { useForm } from "react-hook-form";

// export default function UserProfile() {
//   const dispatch = useDispatch();
//   const userInfo = useSelector(selectUserInfo);
//   const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
//   const [showAddAddressForm, setShowAddAddressForm] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const handleEdit = (addressUpdate, index) => {
//     const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
//     newUser.addresses.splice(index, 1, addressUpdate);
//     dispatch(updateUserAsync(newUser));
//     setSelectedEditIndex(-1);
//   };

//   const handleRemove = (e, index) => {
//     const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
//     newUser.addresses.splice(index, 1);
//     dispatch(updateUserAsync(newUser));
//   };

//   const handleEditForm = (index) => {
//     setSelectedEditIndex(index);
//     setShowAddAddressForm(false);
//     const address = userInfo.addresses[index];
//     setValue("name", address.name);
//     setValue("email", address.email);
//     setValue("city", address.city);
//     setValue("state", address.state);
//     setValue("pinCode", address.pinCode);
//     setValue("phone", address.phone);
//     setValue("street", address.street);
//   };

//   const handleAdd = (address) => {
//     const newUser = {
//       ...userInfo,
//       addresses: [...userInfo.addresses, address],
//     };
//     dispatch(updateUserAsync(newUser));
//     setShowAddAddressForm(false);
//     reset();
//   };

//   const handleCancelEdit = () => {
//     setSelectedEditIndex(-1);
//     reset();
//   };

//   const handleCancelAdd = () => {
//     setShowAddAddressForm(false);
//     reset();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Profile Header Card */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 transform transition-all hover:shadow-xl">
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12">
//             <div className="flex items-center space-x-4">
//               <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
//                 <span className="text-4xl font-bold text-white">
//                   {userInfo.firstName?.[0]?.toUpperCase() || "U"}
//                 </span>
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold text-white tracking-tight">
//                   {userInfo.firstName
//                     ? `${userInfo.firstName} ${userInfo.lastName}`
//                     : "New User"}
//                 </h1>
//                 <p className="text-indigo-100 mt-2 flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                   {userInfo.email}
//                 </p>
//                 {userInfo.role === "admin" && (
//                   <span className="inline-flex items-center px-3 py-1 mt-3 rounded-full text-sm font-medium bg-yellow-400 text-yellow-900">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" />
//                     </svg>
//                     Admin
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Addresses Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center">
//               <svg className="w-7 h-7 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Your Addresses
//             </h2>
//             <button
//               onClick={() => {
//                 setShowAddAddressForm(true);
//                 setSelectedEditIndex(-1);
//                 reset();
//               }}
//               className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               Add New Address
//             </button>
//           </div>

//           {/* Add Address Form */}
//           {showAddAddressForm && (
//             <div className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border-2 border-indigo-100 animate-fadeIn">
//               <form
//                 noValidate
//                 onSubmit={handleSubmit((data) => {
//                   handleAdd(data);
//                 })}
//               >
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                       Add New Address
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Use a permanent address where you can receive mail.
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
//                     {/* Full Name */}
//                     <div className="sm:col-span-3">
//                       <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         {...register("name", { required: "Name is required" })}
//                         id="name"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="John Doe"
//                       />
//                       {errors.name && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.name.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* Email */}
//                     <div className="sm:col-span-3">
//                       <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                         Email Address
//                       </label>
//                       <input
//                         id="email"
//                         {...register("email", { required: "Email is required" })}
//                         type="email"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="john@example.com"
//                       />
//                       {errors.email && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.email.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* Phone */}
//                     <div className="sm:col-span-3">
//                       <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
//                         Phone Number
//                       </label>
//                       <input
//                         id="phone"
//                         {...register("phone", { required: "Phone is required" })}
//                         type="tel"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="+1 (555) 000-0000"
//                       />
//                       {errors.phone && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.phone.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* Street */}
//                     <div className="sm:col-span-6">
//                       <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
//                         Street Address
//                       </label>
//                       <input
//                         type="text"
//                         {...register("street", { required: "Street is required" })}
//                         id="street"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="123 Main Street"
//                       />
//                       {errors.street && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.street.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* City */}
//                     <div className="sm:col-span-2">
//                       <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         {...register("city", { required: "City is required" })}
//                         id="city"
//                         autoComplete="address-level2"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="New York"
//                       />
//                       {errors.city && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.city.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* State */}
//                     <div className="sm:col-span-2">
//                       <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
//                         State / Province
//                       </label>
//                       <input
//                         type="text"
//                         {...register("state", { required: "State is required" })}
//                         id="state"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="NY"
//                       />
//                       {errors.state && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.state.message}
//                         </p>
//                       )}
//                     </div>

//                     {/* Pin Code */}
//                     <div className="sm:col-span-2">
//                       <label htmlFor="pinCode" className="block text-sm font-semibold text-gray-700 mb-2">
//                         ZIP / Postal Code
//                       </label>
//                       <input
//                         type="text"
//                         {...register("pinCode", { required: "Postal code is required" })}
//                         id="pinCode"
//                         className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                         placeholder="10001"
//                       />
//                       {errors.pinCode && (
//                         <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                           <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                           </svg>
//                           {errors.pinCode.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-end gap-4 pt-4 border-t border-indigo-200">
//                     <button
//                       type="button"
//                       onClick={handleCancelAdd}
//                       className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//                     >
//                       Add Address
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Address List */}
//           <div className="space-y-4">
//             {userInfo.addresses && userInfo.addresses.length > 0 ? (
//               userInfo.addresses.map((address, index) => (
//                 <div key={index} className="animate-fadeIn">
//                   {selectedEditIndex === index ? (
//                     <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-100">
//                       <form
//                         noValidate
//                         onSubmit={handleSubmit((data) => {
//                           handleEdit(data, index);
//                         })}
//                       >
//                         <div className="space-y-8">
//                           <div>
//                             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                               Edit Address
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                               Update your address information below.
//                             </p>
//                           </div>

//                           <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
//                             {/* Same form fields as Add form */}
//                             <div className="sm:col-span-3">
//                               <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Full Name
//                               </label>
//                               <input
//                                 type="text"
//                                 {...register("name", { required: "Name is required" })}
//                                 id="name"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.name && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.name.message}
//                                 </p>
//                               )}
//                             </div>

//                             <div className="sm:col-span-3">
//                               <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Email Address
//                               </label>
//                               <input
//                                 id="email"
//                                 {...register("email", { required: "Email is required" })}
//                                 type="email"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.email && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.email.message}
//                                 </p>
//                               )}
//                             </div>

//                             <div className="sm:col-span-3">
//                               <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Phone Number
//                               </label>
//                               <input
//                                 id="phone"
//                                 {...register("phone", { required: "Phone is required" })}
//                                 type="tel"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.phone && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.phone.message}
//                                 </p>
//                               )}
//                             </div>

//                             <div className="sm:col-span-6">
//                               <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Street Address
//                               </label>
//                               <input
//                                 type="text"
//                                 {...register("street", { required: "Street is required" })}
//                                 id="street"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.street && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.street.message}
//                                 </p>
//                               )}
//                             </div>

//                             <div className="sm:col-span-2">
//                               <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 City
//                               </label>
//                               <input
//                                 type="text"
//                                 {...register("city", { required: "City is required" })}
//                                 id="city"
//                                 autoComplete="address-level2"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.city && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.city.message}
//                                 </p>
//                               )}
//                             </div>

//                             <div className="sm:col-span-2">
//                               <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 State / Province
//                               </label>
//                               <input
//                                 type="text"
//                                 {...register("state", { required: "State is required" })}
//                                 id="state"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.state && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.state.message}
//                                 </p>
//                               )}
//                             </div>

//                             <div className="sm:col-span-2">
//                               <label htmlFor="pinCode" className="block text-sm font-semibold text-gray-700 mb-2">
//                                 ZIP / Postal Code
//                               </label>
//                               <input
//                                 type="text"
//                                 {...register("pinCode", { required: "Postal code is required" })}
//                                 id="pinCode"
//                                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-4 py-2.5"
//                               />
//                               {errors.pinCode && (
//                                 <p className="mt-1.5 text-sm text-red-600 flex items-center">
//                                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                   </svg>
//                                   {errors.pinCode.message}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           <div className="flex items-center justify-end gap-4 pt-4 border-t border-blue-200">
//                             <button
//                               type="button"
//                               onClick={handleCancelEdit}
//                               className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
//                             >
//                               Cancel
//                             </button>
//                             <button
//                               type="submit"
//                               className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//                             >
//                               Save Changes
//                             </button>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   ) : (
//                     <div className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
//                               <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                               </svg>
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                                 {address.name}
//                               </h4>
//                               <div className="space-y-1.5 text-sm text-gray-600">
//                                 <p className="flex items-center">
//                                   <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                   </svg>
//                                   {address.street}
//                                 </p>
//                                 <p className="flex items-center">
//                                   <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                                   </svg>
//                                   {address.city}, {address.state} {address.pinCode}
//                                 </p>
//                                 <p className="flex items-center">
//                                   <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                   </svg>
//                                   {address.phone}
//                                 </p>
//                                 <p className="flex items-center">
//                                   <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                   </svg>
//                                   {address.email}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex flex-col gap-2 ml-4">
//                           <button
//                             onClick={() => handleEditForm(index)}
//                             className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
//                           >
//                             <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                             Edit
//                           </button>
//                           <button
//                             onClick={(e) => handleRemove(e, index)}
//                             className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
//                           >
//                             <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-12">
//                 <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//                 <h3 className="mt-4 text-lg font-medium text-gray-900">No addresses yet</h3>
//                 <p className="mt-2 text-sm text-gray-500">Get started by adding your first address.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../Usermanagementslice";
import { useForm } from "react-hook-form";
import { use } from "react";

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    setShowAddAddressForm(false);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
    reset();
  };

  const handleCancelEdit = () => {
    setSelectedEditIndex(-1);
    reset();
  };

  const handleCancelAdd = () => {
    setShowAddAddressForm(false);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 sm:py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-4 sm:mb-6 md:mb-8 transform transition-all hover:shadow-xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 flex-shrink-0">
                { userInfo?.imgpath ?
                <img
                  src={userInfo.imgpath}
                  alt={`${userInfo.firstName}'s profile`}
                  className="h-full w-full object-cover rounded-full"
                />
                :
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {userInfo?.firstName?.[0]?.toUpperCase() || "U"}
                </span>}
              </div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight truncate">
                  {userInfo.firstName
                    ? `${userInfo.firstName} ${userInfo.lastName}`
                    : "New User"}
                </h1>
                <p className="text-indigo-100 mt-1 sm:mt-2 flex items-center justify-center sm:justify-start text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{userInfo.email}</span>
                </p>
                {userInfo.role === "admin" && (
                  <span className="inline-flex items-center px-2.5 sm:px-3 py-1 mt-2 sm:mt-3 rounded-full text-xs sm:text-sm font-medium bg-yellow-400 text-yellow-900">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" />
                    </svg>
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Your Addresses
            </h2>
            <button
              onClick={() => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1);
                reset();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Address
            </button>
          </div>

          {/* Add Address Form */}
          {showAddAddressForm && (
            <div className="mb-6 sm:mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-indigo-100 animate-fadeIn">
              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  handleAdd(data);
                })}
              >
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                      Add New Address
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-6">
                    {/* Full Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        id="name"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Email Address
                      </label>
                      <input
                        id="email"
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        {...register("phone", { required: "Phone is required" })}
                        type="tel"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Street */}
                    <div className="sm:col-span-6">
                      <label htmlFor="street" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        {...register("street", { required: "Street is required" })}
                        id="street"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="123 Main Street"
                      />
                      {errors.street && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.street.message}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="sm:col-span-2">
                      <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        {...register("state", { required: "State is required" })}
                        id="state"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="NY"
                      />
                      {errors.state && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    {/* Pin Code */}
                    <div className="sm:col-span-2">
                      <label htmlFor="pinCode" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        {...register("pinCode", { required: "Postal code is required" })}
                        id="pinCode"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                        placeholder="10001"
                      />
                      {errors.pinCode && (
                        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.pinCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-indigo-200">
                    <button
                      type="button"
                      onClick={handleCancelAdd}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Address List */}
          <div className="space-y-3 sm:space-y-4">
            {userInfo.addresses && userInfo.addresses.length > 0 ? (
              userInfo.addresses.map((address, index) => (
                <div key={index} className="animate-fadeIn">
                  {selectedEditIndex === index ? (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-blue-100">
                      <form
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          handleEdit(data, index);
                        })}
                      >
                        <div className="space-y-6 sm:space-y-8">
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                              Edit Address
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">
                              Update your address information below.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-6">
                            {/* Same form fields as Add form */}
                            <div className="sm:col-span-3">
                              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Full Name
                              </label>
                              <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                id="name"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.name && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.name.message}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Email Address
                              </label>
                              <input
                                id="email"
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.email && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.email.message}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Phone Number
                              </label>
                              <input
                                id="phone"
                                {...register("phone", { required: "Phone is required" })}
                                type="tel"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.phone && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-6">
                              <label htmlFor="street" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                Street Address
                              </label>
                              <input
                                type="text"
                                {...register("street", { required: "Street is required" })}
                                id="street"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.street && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.street.message}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                City
                              </label>
                              <input
                                type="text"
                                {...register("city", { required: "City is required" })}
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.city && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.city.message}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="state" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                State / Province
                              </label>
                              <input
                                type="text"
                                {...register("state", { required: "State is required" })}
                                id="state"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.state && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.state.message}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <label htmlFor="pinCode" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                                ZIP / Postal Code
                              </label>
                              <input
                                type="text"
                                {...register("pinCode", { required: "Postal code is required" })}
                                id="pinCode"
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base"
                              />
                              {errors.pinCode && (
                                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-red-600 flex items-center">
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                  {errors.pinCode.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-blue-200">
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="group bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">
                                {address.name}
                              </h4>
                              <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-gray-600">
                                <p className="flex items-start">
                                  <svg className="w-4 h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <span className="break-words">{address.street}</span>
                                </p>
                                <p className="flex items-center">
                                  <svg className="w-4 h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                  </svg>
                                  <span className="truncate">{address.city}, {address.state} {address.pinCode}</span>
                                </p>
                                <p className="flex items-center">
                                  <svg className="w-4 h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  <span className="truncate">{address.phone}</span>
                                </p>
                                <p className="flex items-center">
                                  <svg className="w-4 h-4 mr-1.5 sm:mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span className="truncate">{address.email}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleEditForm(index)}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                          >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={(e) => handleRemove(e, index)}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                          >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">No addresses yet</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Get started by adding your first address.</p>
              </div>
            )}
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
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}