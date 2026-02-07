// import React, { useState } from "react";
// import { FaUserCircle, FaLock, FaFileImage } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
// import { createUserAsync } from "../authSlice";

// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// export default function Signup() {
//   const [formValue, setFormValue] = useState(initialState);
//   const [show, setShow] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const dispatch = useDispatch();
//   const Navigate = useNavigate();

//   const user = useSelector((state) => state.auth.loggedInUser);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValue({ ...formValue, [name]: value });
//   };

//   const config = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { password, confirmPassword } = formValue;

//     if (password !== confirmPassword) {
//       // Handle password mismatch
//       return;
//     }

//     const formData = new FormData();

//     // Append JSON data
//     formData.append("firstName", formValue.firstName);
//     formData.append("lastName", formValue.lastName);
//     formData.append("email", formValue.email);
//     formData.append("password", formValue.password);
//     formData.append("confirmPassword", formValue.confirmPassword);

//     // Append the image file
//     formData.append("imageFile", formValue.imageFile);

//     dispatch(createUserAsync({ formData, config, Navigate }));
//   };

//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       {user && <Navigate to="/" replace={true} />}
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           className="mx-auto h-20 w-20"
//           src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
//           alt="StyleVista"
//         />
//         <h1 className="text-center font-bold text-2xl tracking-tight">
//           <span className="bg-gradient-to-r text-transparent from-yellow-500 via-orange-500 to-red-500 bg-clip-text">
//             StyleVista
//           </span>
//         </h1>
//         <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           Create a New Account
//         </h2>
//       </div>

//       <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form
//           style={{ width: "100%" }}
//           noValidate
//           className="space-y-6"
//           onSubmit={handleSubmit}
//         >
//           <div>
//             <label
//               htmlFor="firstName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               First Name
//             </label>
//             <div className="mt-2">
//               <input
//                 id="firstName"
//                 type="text"
//                 name="firstName"
//                 value={formValue.firstName}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="Enter First Name"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="lastName"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Last Name
//             </label>
//             <div className="mt-2">
//               <input
//                 id="lastName"
//                 type="text"
//                 name="lastName"
//                 value={formValue.lastName}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="Enter Last Name"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Email address
//             </label>
//             <div className="mt-2">
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formValue.email}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="Enter Email"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="password"
//                 type={show ? "text" : "password"}
//                 name="password"
//                 value={formValue.password}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="Enter Password"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Confirm Password
//             </label>
//             <div className="mt-2">
//               <input
//                 id="confirmPassword"
//                 type={showConfirm ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formValue.confirmPassword}
//                 onChange={handleChange}
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="Enter Confirm Password"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="image"
//               className="block text-sm font-medium leading-6 text-gray-900"
//             >
//               Image
//             </label>
//             <div className="mt-2">
//               <label
//                 htmlFor="imageInput"
//                 // className="relative border border-dashed border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 text-center"
//               >
//                 <div
//                   // className="flex  justify-center align-middle relative border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 text-center"
//                   className={`flex  justify-center align-middle relative border border-dashed ${
//                     formValue.imageFile
//                       ? "border-green-500 bg-green-100"
//                       : "border-gray-300"
//                   } rounded-md cursor-pointer hover:bg-gray-100 text-center`}
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <span className="text-sm text-gray-600 font-semibold">
//                     {formValue.imageFile ? "Image Uploaded" : "Upload Image"}
//                   </span>
//                   <span className="w-8 h-8 text-gray-600 ml-2 mt-3">
//                     <FaFileImage />
//                   </span>
//                 </div>
//                 <input
//                   id="imageInput"
//                   type="file"
//                   name="image"
//                   className="hidden"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     setFormValue({ ...formValue, imageFile: file });
//                   }}
//                 />
//               </label>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <p className="mt-7 text-center text-sm text-gray-500">
//           Already a Member?{" "}
//           <ReactRouterLink
//             to="/login"
//             className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//           >
//             Log In
//           </ReactRouterLink>
//         </p>
//       </div>
//     </div>
//   );
// }





import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaUpload, FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink, useNavigate, Navigate } from "react-router-dom";
import { createUserAsync } from "../authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [formValue, setFormValue] = useState(initialState);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const user = useSelector((state) => state.auth.loggedInUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formValue.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formValue.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formValue.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(formValue.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formValue.password) {
      newErrors.password = "Password is required";
    } else if (formValue.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formValue.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formValue.password !== formValue.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("firstName", formValue.firstName);
    formData.append("lastName", formValue.lastName);
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    formData.append("confirmPassword", formValue.confirmPassword);

    if (formValue.imageFile) {
      formData.append("imageFile", formValue.imageFile);
    }

    dispatch(createUserAsync({ formData, config, Navigate }));
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {user && <Navigate to="/" replace={true} />}
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 py-16 text-white">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20"></div>
            <img
              className="relative h-20 w-20 rounded-full shadow-2xl ring-4 ring-white/30"
              src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
              alt="StyleVista"
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r text-transparent from-yellow-300 via-orange-300 to-red-300 bg-clip-text">
              StyleVista
            </span>
          </h1>
          <p className="text-lg text-indigo-100 text-center mb-6 max-w-md">
            Join thousands of fashion enthusiasts
          </p>
          <div className="mt-4 space-y-3 max-w-md">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-white text-sm">Personalized Recommendations</h3>
                <p className="text-xs text-indigo-200">Get style suggestions tailored to you</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-white text-sm">Exclusive Member Deals</h3>
                <p className="text-xs text-indigo-200">Access special discounts and offers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="font-semibold text-white text-sm">Track Your Orders</h3>
                <p className="text-xs text-indigo-200">Real-time updates on all purchases</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-6  sm:p-8 py-2 overflow-y-auto">
        <div className="max-w-md w-full space-y-0 pt-0 pb-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-4">
            <img
              className="mx-auto h-16 w-16 rounded-full shadow-lg"
              src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
              alt="StyleVista"
            />
            <h1 className="mt-3 text-2xl font-bold">
              <span className="bg-gradient-to-r text-transparent from-yellow-500 via-orange-500 to-red-500 bg-clip-text">
                StyleVista
              </span>
            </h1>
          </div>
          <div className="hidden lg:block text-center">
            <FaUserCircle className="mx-auto h-10 w-10 text-gray-400" />
            </div>

          {/* Form Header */}
          <div className="!m-auto border-b border-gray-200 pb-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Account
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Start your style journey with us today
            </p>
          </div>

          {/* Form Section */}
          <form noValidate className="space-y-3 m-auto" onSubmit={handleSubmit}>
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formValue.firstName}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400 text-sm"
                    placeholder="John"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formValue.lastName}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400 text-sm"
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400 text-sm"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                >
                  {show ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formValue.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400 text-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                >
                  {showConfirm ? (
                    <FaEyeSlash className="h-4 w-4" />
                  ) : (
                    <FaEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 flex items-center">
                  <span className="mr-1">⚠</span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Image Upload Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Profile Picture (Optional)
              </label>
              <div>
                <label
                  htmlFor="imageInput"
                  className={`relative flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                    formValue.imageFile
                      ? "border-green-500 bg-green-50 hover:bg-green-100"
                      : "border-gray-300 hover:border-indigo-400 hover:bg-indigo-50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {formValue.imageFile ? (
                      <>
                        <FaCheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-700 truncate max-w-[200px]">
                          {formValue.imageFile.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <FaUpload className="h-4 w-4 text-gray-400" />
                        <span className="text-xs font-medium text-gray-600">
                          Click to upload image
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    id="imageInput"
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFormValue({ ...formValue, imageFile: file });
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <ReactRouterLink
              to="/login"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 border-2 border-indigo-600 rounded-lg text-sm font-semibold text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Sign In Instead
            </ReactRouterLink>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-3">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}