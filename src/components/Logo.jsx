import { FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Logo = ({ align, textSize, imgSize }) => {
  return (
    <Link
      id="logo"
      to="/"
      className={`sm:text-lg ${
        textSize ? textSize : "lg:text-2xl"
      } uppercase font-bold cursor-pointer flex items-center text-white ${
        align ? align : "self-start"
      }`}
    >
      <FaLink
        className="rotate-[-45deg] text-mainColor1 "
        size={imgSize ? imgSize : "20px"}
      />
      Links
    </Link>
  );
};
