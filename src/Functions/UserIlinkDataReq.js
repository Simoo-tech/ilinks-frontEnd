import axios from "axios";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export const IlinksDataFetch = async ({
  username,
  setUserData,
  setFormData,
}) => {
  await axios
    .post(`${serverPath}ilinkData`, { username })
    .then((res) => {
      setUserData(res.data);
      setFormData(res.data.formData);
    })
    .catch((err) => console.log(err));
};

export const CreateIlinkData = async ({ userData }) => {
  console.log("sadwa");
  const { _id } = userData;
  await axios
    .post(`http://localhost:5000/api/ilinkData/createIlink`, {
      userID: _id,
    })
    .then(async (res) => {
      await axios.put(`http://localhost:5000/api/ilinkData`, {
        IlinkID: res.data.UserIlinkData,
        userID: res.data.userID,
      });
    })
    .catch((err) => console.log(err));
};

export const UpdateIlinkData = async ({ userData, setBtn, navigate, path }) => {
  setBtn("Loading");
  await axios
    .put(
      `http://localhost:5000/api/ilinkData/updateData/${userData.IlinkData._id}`,
      userData.IlinkData
    )
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
