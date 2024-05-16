import { Link } from "react-router-dom";
import LogoImg from "/assets/main-logo.webp";
export const Logo = ({ align, textSize, imgSize }) => {
  return (
    <Link
      id="logo"
      to="/"
      className={`sm:text-lg ${
        textSize ? textSize : "lg:text-2xl"
      } uppercase font-bold cursor-pointer flex items-center text-white ${
        align ? align : "self-center"
      }`}
    >
      <img
        src={LogoImg}
        loading="lazy"
        alt="logo"
        width={imgSize ? imgSize : 110}
      />
    </Link>
  );
};
