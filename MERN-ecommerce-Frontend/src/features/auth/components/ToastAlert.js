import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // Import icons from react-icons

const ToastAlert = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icon = type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />;

  return (
    <div
      className={`fixed bottom-10 right-4 transform ${
        visible ? "translate-y-0" : "translate-y-16"
      } transition-transform duration-300 ease-in-out bg-white p-4 rounded-md shadow-md flex items-center`}
    >
      <div className={`text-${type === "success" ? "green" : "red"}-500 mr-2`}>
        {icon}
      </div>
      <div className="text-gray-800">{message}</div>
      <button
        className="ml-auto text-gray-600 hover:text-gray-800"
        onClick={() => {
          setVisible(false);
          onClose();
        }}
      >
        &#x2716;
      </button>
    </div>
  );
};

export default ToastAlert;
