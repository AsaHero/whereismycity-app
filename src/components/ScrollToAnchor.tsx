import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToAnchor() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
}

export default ScrollToAnchor;
