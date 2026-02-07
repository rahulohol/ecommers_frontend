import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../authSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
// import {toast}Alert from "./ToastAlert";
// import { useAlert } from "react-alert";
import {toast} from 'sonner';

export default function ResetPassword() {
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const navigate = useNavigate();
  // const alert = useAlert();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   useEffect(() => {
  // ToastAlert()

  //     // toast.success("Password Reset Successfully", {
  //     //   position: "top-right", // You can adjust the position as needed
  //     //   autoClose: 5000, // Time for the toast to auto-close in milliseconds (e.g., 5000ms = 5 seconds)
  //     // });
  //   }, [passwordReset]);

  useEffect(() => {
    if (passwordReset) {
      setShowSuccessAlert(true); // Display the success alert when passwordReset changes to true

      toast.success("Password has reset successfully");
      navigate("/login");
    }
  }, [passwordReset]);

  // useEffect(() => {
  //   if (passwordReset) {
  //     setShowSuccessAlert(true);

  //     // Start a timer to redirect to /login after 5 seconds (adjust as needed)
  //   }
  // }, [passwordReset, navigate]);

  // useEffect(() => {
  //   if (passwordReset) {
  //     // setShowSuccessAlert(true);

  //     // Start a timer to redirect to /login after 5 seconds (adjust as needed)
  //     const redirectTimer = setTimeout(() => {
  //       navigate("/login");
  //     }, 5000);

  //     return () => clearTimeout(redirectTimer);
  //   }
  // }, [passwordReset, navigate]);

  return (
    <>
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
            className="mx-auto h-10 w-auto"
            src="/ecommerce.png"
            alt="Your Company"
          /> */}
            <img
              className=" mx-auto h-20 w-20"
              src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
              alt="StyleVista"
            />
            <h1 className="text-center font-bold text-2xl tracking-tight">
              StyleVista
            </h1>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter New Password
            </h2>
          </div>

          <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
                );
              })}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter New Password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Enter Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {/* {passwordReset && (
                    <p className="text-green-500">
                      Password Reset Successfully
                    </p>
                  )} */}
                  {/* {showSuccessAlert && (
                    <ToastAlert
                      message="Password Reset Successfully"
                      type="success"
                      onClose={() => setShowSuccessAlert(false)} // Close the success alert
                    />
                  )} */}

                  {/* {showSuccessAlert && (
                    <div className="fixed top-0 right-0 transform transition-transform duration-300 ease-in-out">
                      <ToastAlert
                        message="Password Reset Successfully"
                        type="success"
                        onClose={() => setShowSuccessAlert(false)}
                      />
                    </div>
                  )} */}

                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Send me back to{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p>Incorrect Link</p>
      )}
    </>
  );
}
