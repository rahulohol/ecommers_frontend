// import { useState } from "react";

// export default function LocationModal({ onClose, onApply }) {
//   const [pincode, setPincode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [detectedLocation, setDetectedLocation] = useState(null);
//   const [error, setError] = useState("");

//   // 📍 Detect location
//   const detectLocation = () => {
//     setLoading(true);
//     setError("");

//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;

//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//           );
//           const data = await res.json();

//           const pin = data.address.postcode;
//           const city =
//             data.address.city ||
//             data.address.town ||
//             data.address.village;

//           setDetectedLocation({ city, pincode: pin });
//           setPincode(pin);
//           onApply({ city, pincode: pin });
//            onClose();
//         } catch {
//           setError("Unable to fetch location details");
//         }

//         setLoading(false);
//       },
//       () => {
//         setError("Location permission denied");
//         setLoading(false);
//       }
//     );
//   };

//   // ✅ Apply location
// //   const applyLocation = () => {
// //     if (pincode.length !== 6) {
// //       setError("Please enter a valid 6-digit pincode");
// //       return;
// //     }
// //     onApply(pincode);
// //     onClose();
// //   };


// const applyLocation = async () => {
//   if (pincode.length !== 6) {
//     setError("Please enter a valid 6-digit pincode");
//     return;
//   }

//   setLoading(true);
//   setError("");

//   try {
//     const res = await fetch(
//       `https://api.postalpincode.in/pincode/${pincode}`
//     );
//     const data = await res.json();

//     if (!data[0]?.PostOffice?.length) {
//       throw new Error("Invalid pincode");
//     }

//     const city = data[0].PostOffice[0].District;

//     const location = { city, pincode };

//     // ✅ Save in localStorage
//     localStorage.setItem("location", JSON.stringify(location));

//     // ✅ Update Navbar state
//     onApply(location);

//     onClose();
//   } catch {
//     setError("Unable to fetch city for this pincode");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-[380px] rounded-lg shadow-lg p-6">
//         <h2 className="text-lg font-semibold mb-2">
//           📍 Choose your delivery location
//         </h2>

//         <p className="text-sm text-gray-600 mb-4">
//           Get product availability & delivery options for your area
//         </p>

//         {/* Detect location */}
//         <button
//           onClick={detectLocation}
//           disabled={loading}
//           className="w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-50"
//         >
//           {loading ? "Detecting..." : "📍 Use my current location"}
//         </button>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <div className="flex-1 h-px bg-gray-300" />
//           <span className="px-3 text-sm text-gray-500">OR</span>
//           <div className="flex-1 h-px bg-gray-300" />
//         </div>

//         {/* Manual pincode */}
//         <label className="text-sm font-medium">Enter pincode</label>
//         <div className="flex gap-2 mt-1">
//           <input
//             value={pincode}
//             onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
//             maxLength={6}
//             placeholder="6-digit pincode"
//             className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//           />
//           <button
//             onClick={applyLocation}
//             className="bg-yellow-400 px-4 rounded-md font-medium hover:bg-yellow-500"
//           >
//             Apply
//           </button>
//         </div>

//         {/* Detected location */}
//         {detectedLocation && (
//           <p className="text-sm text-green-600 mt-3">
//             Detected: {detectedLocation.city} – {detectedLocation.pincode}
//           </p>
//         )}

//         {/* Error */}
//         {error && (
//           <p className="text-sm text-red-500 mt-2">{error}</p>
//         )}

//         <p className="text-xs text-gray-500 mt-4">
//           We use your location only to show delivery availability.
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";

export default function LocationModal({ onClose, onApply }) {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [postOffices, setPostOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState(null);

  /* ============================================================
     📍 Detect location using browser GPS
     ============================================================ */
  const detectLocation = () => {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const pin = data.address.postcode;
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county;

          const location = { city, pincode: pin };

          localStorage.setItem("location", JSON.stringify(location));
          onApply(location);
          onClose();
        } catch {
          setError("Unable to fetch location details");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  };

  /* ============================================================
     🔎 Fetch pincode details (India Post API)
     ============================================================ */
  const fetchPincodeDetails = async () => {
    if (pincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    setError("");
    setPostOffices([]);
    setSelectedOffice(null);

    try {
      const res = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await res.json();

      if (!data[0]?.PostOffice?.length) {
        throw new Error("Invalid pincode");
      }

      // ✅ Save list for dropdown
      setPostOffices(data[0].PostOffice);
      console.log("Fetched post offices:", data[0].PostOffice);
    } catch {
      setError("Unable to fetch location for this pincode");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     ✅ Final apply after user selects area
     ============================================================ */
  const confirmLocation = () => {
    if (!selectedOffice) return;

    const location = {
      city: selectedOffice.Name,
      pincode:pincode,
    };

    localStorage.setItem("location", JSON.stringify(location));
    onApply(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[380px] rounded-lg shadow-lg p-6">

        {/* Header */}
        <h2 className="text-lg font-semibold mb-2">
          📍 Choose your delivery location
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Get product availability & delivery options for your area
        </p>

        {/* Detect location */}
        <button
          onClick={detectLocation}
          disabled={loading}
          className="w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-50"
        >
          {loading ? "Detecting..." : "📍 Use my current location"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Manual pincode */}
        <label className="text-sm font-medium">Enter pincode</label>
        <div className="flex gap-2 mt-1">
          <input
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value.replace(/\D/g, ""))
            }
            maxLength={6}
            placeholder="6-digit pincode"
            className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={fetchPincodeDetails}
            className="bg-yellow-400 px-4 rounded-md font-medium hover:bg-yellow-500"
          >
            Apply
          </button>
        </div>

        {/* Dropdown for multiple post offices */}
        {postOffices.length > 0 && (
          <div className="mt-4">
            <label className="text-sm font-medium">
              Select your area
            </label>
            <select
              value={selectedOffice?.Name || ""}
              onChange={(e) => {
                console.log("Selected office:", e.target.value);
                const office = postOffices.find(
                  (po) => po.Name === e.target.value
                );
                setSelectedOffice(office);
              }}
              className="w-full mt-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select area</option>
              {postOffices.map((po) => (
                <option key={po.Name} value={po.Name}>
                  {po.Name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Final confirm */}
        {selectedOffice && (
          <button
            onClick={confirmLocation}
            className="w-full mt-4 bg-yellow-400 py-2 rounded-md font-medium hover:bg-yellow-500"
          >
            Deliver to this address
          </button>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mt-3">{error}</p>
        )}

        {/* Footer note */}
        <p className="text-xs text-gray-500 mt-4">
          We use your location only to show delivery availability.
        </p>
      </div>
    </div>
  );
}
