import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

// to Top buttom
export function ToTop() {
  const [top, setTop] = useState(0);
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  window.addEventListener("scroll", (e) => {
    setTop(window.scrollY);
  });

  return (
    <IoIosArrowUp
      onClick={toTop}
      size={40}
      className={`fixed bottom-0 left-2 bg-white text-white p-2 rounded-t-xl z-50 cursor-pointer hover:bg-white hover:text-black ${
        top >= 200 ? "visible" : "invisible"
      }`}
      title="To Top"
      id="to-top-btn"
    />
  );
}
