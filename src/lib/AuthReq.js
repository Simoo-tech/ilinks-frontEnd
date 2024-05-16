import axios from "axios";
import cookie from "react-cookies";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

// Register
export const RegisterSubmit = async ({ setBtn, values, setError }) => {
  try {
    setBtn("Loading");
    setError(null);
    const res = await axios.post(
      `${serverPath}auth/register `,
      {
        ...values,
      },
      { timeout: 10000, timeoutErrorMessage: "request time out " }
    );
    if (res.data.success) {
      cookie.save("UD_1", res.data.Access_Token, {
        path: "/",
        maxAge: 3600000,
        secure: true,
      });
      window.location.replace(`/`);
    } else {
      console.log(res.response.data.message);
      setBtn("NeedAction");
    }
  } catch (error) {
    setBtn("NeedAction");
    console.log(error);
  }
};

// LoginSubmit
export const LoginSubmit = async ({ values, setError, setBtn }) => {
  try {
    setBtn("Loading");
    const res = await axios.post(
      `${serverPath}auth/login`,
      {
        ...values,
      },
      { timeout: 10000, timeoutErrorMessage: "request time out " }
    );
    if (res.data.success) {
      const data = res.data.user;
      setBtn("NeedAction");
      console.log(data.token);
      cookie.save("UD_1", res.data.Access_Token, {
        path: "/",
        maxAge: 3600000,
        secure: true,
      });
      if (data.verified) {
        if (
          data?.IlinkData?.skills?.length > 1 &&
          data?.IlinkData?.portfolio?.length > 1
        ) {
          window.location.replace(`/userIlinks/${data.username}`);
        } else {
          window.location.replace(`/${data.username}/profile-data-page`);
        }
      } else {
        window.location.replace(`/`);
      }
    } else {
      setError(res.response.data.message);
      setBtn("NeedAction");
    }
  } catch (error) {
    setError("Email or Password is not correct");
    setBtn("NeedAction");
    console.log(error);
  }
};

// reset password

/////// handle submit reset password
export const ResetPasswordSubmit = async ({ values }) => {
  try {
    await axios.put(
      `${serverPath}auth/reset-password/${cookie.load("reset_token")}`,
      {
        ...values,
      }
    );
    cookie.remove("reset_token", { path: "/" });
    window.location.replace("/auth/sign-in");
  } catch (error) {
    console.log(error.response.data.message);
  }
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
    try {
      setBtn("Loading");
      const res = await axios.post(`${serverPath}auth/send-reset-password`, {
        email,
      });
      setBtn("Done");
      setSend(false);
      cookie.save("reset_token", res.data.PassToken, {
        path: "/",
        maxAge: 600000,
      });
    } catch (error) {
      setMsg(error.response.data.message);
      setBtn("NeedAction");
    }
  }
};
