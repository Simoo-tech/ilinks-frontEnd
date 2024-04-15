import cookie from "react-cookies";

export const SessionTime = () => {
  if (cookie.load("ExpTime")) {
    cookie.remove("user_D1", { path: "/" });
    cookie.remove("user_T1", { path: "/" });
    cookie.remove("user_I1", { path: "/" });
  }
};
