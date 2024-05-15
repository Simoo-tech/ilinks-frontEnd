import cookie from "react-cookies";

export const SignOut = ({ path }) => {
  window.location.replace(path);
  cookie.remove("UD_1", { path: "/" });
};
