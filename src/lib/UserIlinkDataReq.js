import axios from "axios";
import cookies from "react-cookies";

const serverPath = import.meta.env.VITE_SOME_SERVER_API;
const token = cookies.load("UD_1");

export const CreateIlinkData = async ({ userData }) => {
  try {
    const res = await axios.post(
      `${serverPath}ilinkData/create-ilink`,
      {
        email: userData.email,
      },
      { headers: { "access_token ": token } }
    );
    if (res.data.success) {
      await axios.put(
        `${serverPath}ilinkData`,
        {
          IlinkID: res.data.IlinkID,
          userID: token,
        },
        { headers: { "access_token ": token } }
      );
    } else {
      console.log(res.data);
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

export const UpdateIlinkData = async ({ userData, setBtn, navigate, path }) => {
  try {
    setBtn("Loading");
    const data = userData?.IlinkData;
    const res = await axios.put(
      `${serverPath}ilinkData/update-ilink/${data._id}`,
      { ...data },
      {
        headers: { "Content-type": "application/json", "access_token ": token },
      }
    );

    if (res.data.success) {
      setBtn("Done");
      setTimeout(() => {
        navigate(`/${userData.username}/${path}`);
      }, 1000);
    } else {
      console.log(res);
      setBtn("NeedAction");
    }
  } catch (error) {
    console.log(error);
    setBtn("NeedAction");
  }
};
