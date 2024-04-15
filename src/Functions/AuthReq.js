import axios from "axios";
import cookie from "react-cookies";
import { CreateIlinkData } from "./UserIlinkDataReq";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

// send verification code
export const SendCode = async ({
  userData,
  navigate,
  setUserVerified,
  setBtn,
}) => {
  setBtn("Loading");
  await axios
    .post(`${serverPath}verify-email`, {
      email: userData.email,
    })
    .then((res) => {
      cookie.save("verifyCode", res.data.newCode, { path: "/" });
      navigate(`/auth/verify-email/${userData._id}`);
      setUserVerified(false);
      setBtn("NeedAction");
      cookie.remove("ExpTime", { path: "/" });
    })
    .catch((err) => console.log(err));
};

// Verify Email
export const VerifyCodeSubmit = async ({
  setError,
  correctCode,
  btn,
  setBtn,
  userData,
}) => {
  if (correctCode && btn === "NeedAction") {
    setBtn("Loading");
    setError({ active: false });
    await axios
      .put(`${serverPath}user/${userData._id}`, {
        verifed: true,
      })
      .then((res) => {
        setBtn("Done");
        CreateIlinkData({ userData });
        window.location.replace(
          `/${res.data.user.username}ilink-preview/profile`
        );
        cookie.remove("verifyCode", { path: "/" });
      })
      .catch(() => setBtn("NeedAction"));
  } else {
    if (btn === "NoAction") {
      setError({
        active: true,
        text: "please enter the code that we sent it for you",
      });
    } else {
      setError({ active: true, text: "Incorrect code please try again" });
    }
  }
};

// Register
export const RegisterSubmit = async ({ setBtn, values, setError }) => {
  setBtn("Loading");
  await axios
    .post(`${serverPath}auth/register `, {
      ...values,
    })
    .then((res) => {
      console.log(res.data);
      setError(null);
      const ExpireDate = 1 * 60 * 60;
      cookie.save("user_D1", res.data.newUser._id, {
        path: "/",
        maxAge: ExpireDate,
      });
      cookie.save("user_T1", res.data.token, { path: "/", maxAge: ExpireDate });
      window.location.replace(
        `/${res.data.newUser.username}/ilink-preview/profile`
      );
    })
    .catch((err) => {
      setBtn("NeedAction");
      setError(err.response.data?.message);
    });
};

// LoginSubmit
export const LoginSubmit = async ({ values, setError, setBtn }) => {
  setBtn("Loading");
  await axios
    .post(`${serverPath}auth/login`, {
      ...values,
    })
    .then((res) => {
      const ExpireDate = 1 * 60 * 60;
      if (cookie.load("ExpTime")) {
        cookie.remove("ExpTime", { path: "/" });
      }
      setBtn("NeedAction");
      cookie.save("user_D1", res.data.user._id, {
        path: "/",
        maxAge: ExpireDate,
      });
      cookie.save("user_T1", res.data.token, { path: "/", maxAge: ExpireDate });
      window.location.replace(
        `/${res.data.user.username}/ilink-preview/profile`
      );
    })
    .catch((err) => {
      setBtn("NeedAction");
      setError(err.response.data.message);
    });
};

// reset password
/////// check token
export const checkToken = async ({ userID, token, setValid, setLoading }) => {
  setLoading(true);
  await axios
    .post(`${serverPath}auth/resetpassword/${userID}`, {
      token,
    })
    .then(() => {
      setValid(true);
    })
    .catch(() => {
      setValid(false);
    })
    .then(() => setLoading(false));
};
/////// handle submit reset password
export const ResetPasswordSubmit = async ({ values, userID }) => {
  await axios
    .put(`${serverPath}auth/resetpassword/${userID}`, {
      ...values,
    })
    .then((res) => {
      window.location.replace("/auth/sign-in");
      window.localStorage.removeItem("pass_token");
      window.localStorage.removeItem("user_ID");
    });
};
/////// handle send reset password link
export const SendResetLink = async ({
  email,
  setSend,
  setMsg,
  setBtn,
  btn,
}) => {
  if (btn === "NeedAction") {
    setBtn("Loading");
    await axios
      .post(`${serverPath}auth/resetpassword`, { email })
      .then((res) => {
        if (cookie.load("ExpTime")) {
          cookie.remove("ExpTime", { path: "/" });
        }
        const ExpireDate = 30 * 60;
        setBtn("Done");
        setTimeout(() => {
          setSend(false);
          cookie.save("reset_token", res.data.PassToken, {
            path: "/",
            maxAge: ExpireDate,
          });
          cookie.save("user_reset_id", res.data.userID, {
            path: "/",
            maxAge: ExpireDate,
          });
        }, 1000);
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        setBtn("NeedAction");
      });
  } else {
    return;
  }
};
