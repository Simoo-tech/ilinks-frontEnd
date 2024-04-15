import axios from "axios";
import { SignOut } from "./SignOutFunction";
import { useContext } from "react";
import { UserD1 } from "../context";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export const UpdateProfileSubmit = async ({
  values,
  setBtn,
  userData,
  setUserData,
  setAnimation,
  navigate,
}) => {
  setBtn("Loading");
  await axios
    .put(
      `${serverPath}user/${userData._id}`,
      {
        ...values,
      },
      { headers: { "Content-type": "application/json" } }
    )
    .then((res) => {
      const SavedData = res.data.user;
      setUserData({ ...userData, SavedData });
      setBtn("NoAction");
      setAnimation(true);
      navigate(`/${userData.username}/ilink-preview/socialLinks`);
    })
    .catch(() => {
      setBtn("NeedAction");
    });
};

export const DeleteAccountSubmit = async ({ setLoading, formDataId }) => {
  const { userData } = useContext(UserD1);

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
