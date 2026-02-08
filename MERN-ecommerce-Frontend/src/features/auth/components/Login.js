// import { useSelector, useDispatch } from "react-redux";
// import { selectError, selectLoggedInUser } from "../authSlice";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { loginUserAsync } from "../authSlice";
// import { useForm } from "react-hook-form";

// export default function Login() {
//   const dispatch = useDispatch();
//   const error = useSelector(selectError);
//   const user = useSelector(selectLoggedInUser);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const Navigater = useNavigate();

//   return (
//     <>
//       {user && <Navigate to="/" replace={true}></Navigate>}
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           {/* <img
//             className="mx-auto h-10 w-auto"
//             src="/ecommerce.png"
//             alt="Your Company"
//           /> */}
//           <img
//             className=" mx-auto h-20 w-20"
//             src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
//             alt="StyleVista"
//           />
//           <h1 className="text-center font-bold text-2xl tracking-tight">
//             <span className="bg-gradient-to-r text-transparent from-yellow-500 via-orange-500  to-red-500 bg-clip-text">
//               StyleVista
//             </span>
//           </h1>
//           {/* <h1 className="text-center font-bold text-2xl tracking-tight">
//             StyleVista
//           </h1> */}
//           {/* <h1 className="text-center font-bold text-2xl tracking-tight">
//             <span className="bg-gradient-to-r text-transparent from-blue-900 to-white bg-clip-text">
//               StyleVista
//             </span>
//           </h1> */}
//           <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Log in to your account
//           </h2>
//         </div>

//         <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form
//             style={{ width: "100%" }}
//             noValidate
//             onSubmit={handleSubmit((data) => {
//               let loginInfo = { email: data.email, password: data.password };
//               dispatch(loginUserAsync({ loginInfo, Navigater }));
//             })}
//             className="space-y-6"
//           >
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//               >
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   {...register("email", {
//                     required: "email is required",
//                     pattern: {
//                       value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
//                       message: "email not valid",
//                     },
//                   })}
//                   type="email"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   placeholder="Enter Email"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500">{errors.email.message}</p>
//                 )}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <Link
//                     to="/forgot-password"
//                     className="font-semibold text-indigo-600 hover:text-indigo-500"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   {...register("password", {
//                     required: "password is required",
//                   })}
//                   type="password"
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   placeholder="Enter Password"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500">{errors.password.message}</p>
//                 )}
//               </div>
//               {error && (
//                 <p className="text-red-500">{error || error.message}</p>
//               )}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Log in
//               </button>
//             </div>
//           </form>

//           <p className="mt-7 text-center text-sm text-gray-500">
//             Not a member?{" "}
//             <Link
//               to="/signup"
//               className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
//             >
//               Create an Account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }


import { useSelector, useDispatch } from "react-redux";
import { selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUserAsync } from "../authSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Navigater = useNavigate();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="h-screen flex bg-gray-50 overflow-hidden">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          
          <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
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
              Your ultimate destination for fashion and style
            </p>
            <div className="mt-4 space-y-3 max-w-md">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white text-sm">Exclusive Collections</h3>
                  <p className="text-xs text-indigo-200">Access to premium fashion items</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white text-sm">Fast Delivery</h3>
<p className="text-xs text-indigo-200">Free shipping on orders over ₹499</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-white text-sm">Easy Returns</h3>
                  <p className="text-xs text-indigo-200">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
          <div className="max-w-md w-full space-y-6">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-6">
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

            {/* Form Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome Back
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Sign in to continue your shopping experience
              </p>
            </div>

            {/* Form Section */}
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                let loginInfo = { email: data.email, password: data.password };
                dispatch(loginUserAsync({ loginInfo, Navigater }));
              })}
              className="space-y-4 m-auto"
            >
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Please enter a valid email",
                      },
                    })}
                    type="email"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 text-gray-900 placeholder:text-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-4 w-4" />
                    ) : (
                      <FaEye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.password.message}
                  </p>
                )}
                {error && (
                  <p className="mt-1 text-xs text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {error || error.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-[1.02]"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">
                  New to StyleVista?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 border-2 border-indigo-600 rounded-lg text-sm font-semibold text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Create an Account
              </Link>
            </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-4">
            By signing in, you agree to our{" "}
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
    </>
  );
}