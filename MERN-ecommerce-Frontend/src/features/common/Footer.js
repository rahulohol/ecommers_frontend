// function Footer() {
//   return (
//     <>
//       <div className=" bg-gray-900">
//         <div className="max-w-2xl mx-auto text-white py-10">
//           <div className="text-center">
//             <h3 className="text-3xl mb-3"> Download our Ecommerce App </h3>
//             <p> Buy what you want. </p>
//             <div className="flex justify-center my-10">
//               <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-52 mx-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
//                   className="w-7 md:w-8"
//                 />
//                 <div className="text-left ml-3">
//                   <p className="text-xs text-gray-200">Download on </p>
//                   <p className="text-sm md:text-base"> Google Play Store </p>
//                 </div>
//               </div>
//               <div className="flex items-center border w-auto rounded-lg px-4 py-2 w-44 mx-2">
//                 <img
//                   src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
//                   className="w-7 md:w-8"
//                 />
//                 <div className="text-left ml-3">
//                   <p className="text-xs text-gray-200">Download on </p>
//                   <p className="text-sm md:text-base"> Apple Store </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
//             <p className="order-2 md:order-1 mt-8 md:mt-0">
//               {" "}
//               © StyleVista, 2023.{" "}
//             </p>
//             <div className="order-1 md:order-2">
//               <span className="px-2">About us</span>
//               <span className="px-2 border-l">Contact us</span>
//               <span className="px-2 border-l">Privacy Policy</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Footer;



import { useState } from "react";

function Footer() {
  const [hoveredStore, setHoveredStore] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const links = {
    Company: ["About Us", "Careers", "Press", "Blog"],
    Support: ["Contact Us", "Help Center", "Shipping Info", "Returns"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  const socials = [
    {
      name: "Instagram",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l16 16M4 20 20 4" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83-.18-.77-.12-3.15 0-3.3s2.42-2.05 3.45-3.08c0 0 .83-1.22.55-2.17-.42-1.4-3.02-1.05-3.02.65 0 .62.07 1.04.16 1.33-.29-.05-.56-.08-.81-.02-1.96.29-2.12 2.05-1.49 3.38.82 1.86 3.31.72 3.89.38 0 0-.14.67-.48 1.11-.27.36.18.66.61.55 1.44-.37 2.49-1.44 2.49-3.02 0-2.57-2.22-4.21-4.69-3.59-2.1.53-2.93 2.2-2.93 3.37 0 .82.28 1.11.39 1.27l-.05.28c-.06.36-.25.79-.39 1.07-.15.32.01.44.34.32 1.39-.53 2.43-2.16 2.43-3.49 0-2.82-2.32-5.41-6.52-5.41C7.01 9 5 11.6 5 14.2c0 2.58 1.54 5.35 4.31 5.94-.06.22-.16.56-.23.8-.07.29-.23.35-.54.21-1.99-.93-3.24-3.83-3.24-6.16C5.3 10.82 8.23 7 13.22 7c3.93 0 6.78 2.8 6.78 6.55 0 3.9-2.45 7.03-5.85 7.03-1.14 0-2.22-.59-2.59-1.29l-.7 2.68c-.26 1-.95 2.24-1.41 3C11.18 21.9 11.56 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #111827 0%, #0f172a 100%)" }}>
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }} />

      {/* Main CTA Section */}
      <div className="relative">
        {/* Decorative blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }} />

        <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
          <div className="text-center relative z-10">
            {/* Pill badge */}
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-4 py-1 rounded-full"
              style={{ color: "#a78bfa", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)" }}
            >
              Available Now
            </span>
            <h3 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
              Download our <span style={{ background: "linear-gradient(135deg, #a78bfa, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ecommerce App</span>
            </h3>
            <p className="text-gray-400 text-base max-w-md mx-auto">Shop smarter, save bigger. Get exclusive deals and a seamless experience right in your pocket.</p>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              {[
                { id: "google", label: "Google Play", sub: "Get it on", icon: "https://cdn-icons-png.flaticon.com/512/888/888857.png" },
                { id: "apple", label: "App Store", sub: "Download on the", icon: "https://cdn-icons-png.flaticon.com/512/888/888841.png" },
              ].map((store) => (
                <button
                  key={store.id}
                  onMouseEnter={() => setHoveredStore(store.id)}
                  onMouseLeave={() => setHoveredStore(null)}
                  className="flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300 cursor-pointer"
                  style={{
                    background: hoveredStore === store.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
                    border: hoveredStore === store.id ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.1)",
                    transform: hoveredStore === store.id ? "translateY(-2px)" : "translateY(0)",
                    boxShadow: hoveredStore === store.id ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                  }}
                >
                  <img src={store.icon} alt={store.label} className="w-8 h-8 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                  <div className="text-left">
                    <p className="text-gray-400" style={{ fontSize: "10px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{store.sub}</p>
                    <p className="text-white font-semibold text-sm">{store.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)" }} />
      </div>

      {/* Links + Newsletter Row */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-lg mb-4" style={{ fontFamily: "'Georgia', serif" }}>StyleVista</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Curated fashion & lifestyle products delivered to your door. Redefining how you shop.</p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(139,92,246,0.2)";
                    e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
                    e.currentTarget.style.color = "#a78bfa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  <span className="text-gray-400" style={{ transition: "color 0.2s" }}>{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide" style={{ textTransform: "uppercase", letterSpacing: "0.1em" }}>{title}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-500 text-sm transition-colors duration-200 hover:text-white cursor-pointer relative group"
                    >
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-purple-400">›</span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Strip */}
      <div className="max-w-5xl mx-auto px-6 pb-10">
        <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(99,102,241,0.08))", border: "1px solid rgba(139,92,246,0.2)" }}>
          <div>
            <h4 className="text-white font-semibold text-base">Stay in the loop</h4>
            <p className="text-gray-500 text-sm mt-1">Get weekly style tips & exclusive offers.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={subscribed}
              className="flex-1 md:w-64 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            <button
              disabled={subscribed}
              onClick={() => { if (email) setSubscribed(true); }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
              onMouseEnter={(e) => !subscribed && (e.currentTarget.style.filter = "brightness(1.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
              {subscribed ? "Thanks ✓" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)" }} />
      </div>
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-gray-600 text-xs">© 2025 StyleVista. All rights reserved.</p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
            <a key={item} href="#" className="text-gray-600 text-xs hover:text-gray-300 transition-colors duration-200 cursor-pointer">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;