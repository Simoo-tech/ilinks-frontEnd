import cookie from "react-cookies";

export const SignOut = ({ path }) => {
  cookie.remove("user_D1", { path: "/" });
  cookie.remove("user_T1", { path: "/" });
  cookie.remove("user_I1", { path: "/" });
  window.location.replace(path);
};
