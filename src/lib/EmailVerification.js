import axios from "axios";
import { CreateIlinkData } from "./UserIlinkDataReq";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

// send verification code
export const SendCode = async ({ userData, setBtn }) => {
  try {
    setBtn(true);
    const res = await axios.post(`${serverPath}send-verify-email`, {
      email: userData.email,
    });
    if (res.data.success) {
      setBtn(false);
      window.location.assign(`/auth/verify-email/${userData._id}`);
    } else {
      console.log(res.response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
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
    CreateIlinkData({ userData });
    try {
      setBtn("Loading");
      setError({ active: false });
      const res = await axios.put(`${serverPath}user/${userData._id}`, {
        verifed: true,
      });
      if (res.data.success) {
        setBtn("Done");
        setTimeout(() => {
          window.location.replace(
            `/${res.data.user.username}/profile-data-page`
          );
        }, 1000);
      } else {
        console.log(res.response.data.message);
        setBtn("NeedAction");
      }
    } catch (error) {
      setBtn("NeedAction");
      console.log(error);
    }
  } else {
    setError({ active: true, text: "الرمز الذي ادخلته غير صحيح اعد المحاولة" });
  }
};
