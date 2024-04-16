import axios from "axios";
import cookie from "react-cookies";
import UserImg from "../assets/userIcon.webp";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export const Fetch_Check_Data = async ({
  setLoading,
  setMessage,
  setUserData,
  username,
  setUserViewData,
}) => {
  const User_Data_cookies = cookie.load("user_D1");

  // if cleint view user Ilnik
  if (username) {
    setLoading(true);
    axios
      .post(`${serverPath}userIlink`, { username: username })
      .then((res) => {
        setUserViewData(res.data);
      })
      .finally(() => setLoading(false));
  }
  // user login data fetch
  if (User_Data_cookies && !username) {
    setLoading(true);
    axios
      .get(`${serverPath}user/${User_Data_cookies}`)
      .then((res) => {
        setUserData(res.data);
        if (!res.data.avatar) {
          const data = res.data;
          setUserData({ avatar: UserImg, ...data });
        }
        if (!res.data.verifed) {
          setMessage({
            active: true,
            title: "verify email",
            body: "please verify your email to continue",
            unRead: true,
          });
        }
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      );
  }
  if (!cookie.load("reset_token") && !cookie.load("user_reset_id")) {
    cookie.remove("reset_token");
    cookie.remove("user_reset_id");
  }
};

export const JobSearchData = async ({ setJobs }) => {
  await axios.get(`${serverPath}user`).then((res) => setJobs(res.data));
};
