import axios from "axios";
import cookie from "react-cookies";

const serverPath = import.meta.env.VITE_SOME_SERVER_API;
const ID = cookie.load("user_D1");
export const CreateIlinkData = async () => {
  console.log("sadwa");
  await axios
    .post(`${serverPath}ilinkData/createIlink`, {
      userID: ID,
    })
    .then(async (res) => {
      await axios.put(`${serverPath}ilinkData`, {
        IlinkID: res.data.UserIlinkData,
        userID: res.data.userID,
      });
    })
    .catch((err) => console.log(err));
};

export const UpdateIlinkData = async ({ userData, setBtn, navigate, path }) => {
  setBtn("Loading");
  await axios
    .put(`${serverPath}ilinkData/updateData/${ID}`, userData.IlinkData)
    .then((res) => {
      if (path === "shareIlink") {
        navigate(`/${userData.username}/${path}`);
      } else {
        navigate(`/${userData.username}/ilink-preview/${path}`);
      }
      setBtn("Done");
    })
    .catch((err) => console.log(err.response.data));
};
