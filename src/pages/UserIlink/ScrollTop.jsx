import { IoIosArrowDown } from "react-icons/io";

export const ScrollTo = ({  text, ContectSec }) => {
  return (
    <button
      onClick={(e) => {
        window.scrollTo(0, ContectSec.current);
      }}
      className="absolute bottom-5 translate-x-[-50%] left-[50%] bg-black py-3 
    flex flex-col gap-2 items-center px-10 text-lg capitalize rounded-xl z-20"
    >
      {text}
      <IoIosArrowDown className="animate-bounce" />
    </button>
  );
};
