import axios from "axios";
import cookie from "react-cookies";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export const Fetch_Check_Data = async () => {
  const User_Data_cookies = cookie.load("UD_1");

  // user login data fetch
  if (User_Data_cookies) {
    try {
      const res = await axios.get(`${serverPath}user/${User_Data_cookies}`);
      if (res.data.success) {
        return res.data.user;
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      cookie.remove("UD_1", { path: "/" });
      window.location.assign("/auth/sign-in");
      console.log(error);
    }
  }
  if (!cookie.load("reset_token") && !cookie.load("user_reset_id")) {
    cookie.remove("reset_token");
    cookie.remove("user_reset_id");
  }
};

export async function FetchUserShow({ username, setUserData, setLoading }) {
  // if cleint view user Ilnik
  setLoading(true);
  try {
    const res = await axios.post(`${serverPath}userIlink`, {
      username,
    });
    if (res.data.success) {
      setUserData(res.data.userIlink);
      setLoading(false);
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(error);
  }
}

export const JobSearchData = async ({ setJobs }) => {
  await axios.get(`${serverPath}user`);
};
