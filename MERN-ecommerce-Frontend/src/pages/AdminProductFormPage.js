import { useEffect, useState } from "react";
import ProductForm from "../features/admin/components/ProductForm";
import NavBar from "../features/navbar/Navbar";
function AdminProductFormPage() {
  const [screenSize, setScreenSize] = useState("");

  // Add an event listener to update the screen size when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("large");
      } else if (window.innerWidth >= 768) {
        setScreenSize("medium");
      } else {
        setScreenSize("small");
      }
    };

    // Initialize the screen size on component mount
    handleResize();

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <NavBar>
        <div
          className={`${
            screenSize === "large"
              ? "w-85pct-large"
              : screenSize === "medium"
              ? "w-85pct-medium"
              : "w-90pct-small"
          }`}
        >
          <ProductForm></ProductForm>
        </div>
      </NavBar>
    </div>
  );
}

export default AdminProductFormPage;
