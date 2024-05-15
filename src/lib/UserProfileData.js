import axios from "axios";
import { SignOut } from "./SignOutFunction";
import { useAuth } from "../context/AuthContext";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export const UpdateProfileSubmit = async ({
  values,
  setBtn,
  userData,
  setUserData,
  setAnimation,
  navigate,
}) => {
  try {
    setBtn("Loading");
    const res = await axios.put(
      `${serverPath}user/${userData._id}`,
      {
        ...values,
      },
      { headers: { "Content-type": "application/json" } }
    );
    const SavedData = res.data.user;
    setUserData({ ...userData, SavedData });
    setBtn("Done");
    setTimeout(() => {
      navigate(`/${userData.username}/socialLinks-data-page`);
      setAnimation(true);
    }, 1000);
  } catch (error) {
    setBtn("NeedAction");
    console.log(error);
  }
};

export const DeleteAccountSubmit = async ({ setLoading, formDataId }) => {
  const [userData, setUserData] = useAuth();

  // check user id
  setLoading(true);
  await axios
    .delete(`http://localhost:5000/api/user/${userData._id}`)
    .then(async (res) => {
      SignOut({ path: "/auth/sign-in" });
      window.localStorage.removeItem("userID");
      window.location.replace("/auth/sign-in");
      if (formDataId) {
        await axios
          .delete(`http://localhost:5000/api/formdata/${formDataId}`)
          .then(window.localStorage.removeItem("formDataId"));
      }
    })
    .finally(() => {
      setLoading(false);
    });
};
