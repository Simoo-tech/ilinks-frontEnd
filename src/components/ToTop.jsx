import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

// to Top buttom
export const ToTop = ({  }) => {
  const [top, setTop] = useState(true);

  const toggleVisible = () => {
    const position = setSrollPosition(position);

    if (window.scrollY > 50) {
      setTop("goTop");
    } else if (window.scrollY < 50) {
      setTop("goTopHidden");
    }
  };
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  window.addEventListener("scroll", toggleVisible);
  console.log(scroll);
  return (
    <IoIosArrowUp
      onClick={toTop}
      size={40}
      className={`fixed bottom-0 left-2 bg-black text-white p-2 rounded-t-xl z-50 cursor-pointer hover:bg-white hover:text-black ${
        top >= 200 ? "visible" : "invisible"
      }`}
      title="To Top"
      id="to-top-btn"
    />
  );
};
