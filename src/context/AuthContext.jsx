import { createContext, useContext, useState } from "react";
import UserImg from "/assets/userIcon.webp";
import axios from "axios";
import { useQuery } from "react-query";
import { Loading } from "../components/loading";
import { SignOut } from "../lib/SignOutFunction";
import cookie from "react-cookies";

const AuthContext = createContext();
const User_Data_cookies = cookie.load("UD_1");
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    avatar: UserImg,
  });

  if (User_Data_cookies) {
    const { isLoading, isRefetching, error } = useQuery(
      "fetchData",
      () =>
        axios
          .get(`${serverPath}user/${User_Data_cookies}`)
          .then((res) => setUserData(res.data.user)),
      {
        refetchOnmount: false,
        retry: false,
        refetchOnWindowFocus: false,
      }
    );

    if (isLoading || isRefetching) {
      return <Loading />;
    }
    if (error) {
      SignOut({ path: "/auth/sign-in" });
    }
  }
  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
