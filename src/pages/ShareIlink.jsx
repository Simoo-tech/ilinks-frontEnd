import React, { useContext, useState } from "react";
import ShareContent from "./UserIlink/Share";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
export default function ShareIlink() {
  const [shareBtn, setShareBtn] = useState(true);
  const [userData, setUserData] = useAuth();
  return (
    <Layout>
      <div className="section-h w-full flex justify-center items-center">
        <ShareContent
          shareBtn={shareBtn}
          setShareBtn={setShareBtn}
          close={false}
          userData={userData}
          postion="relative"
        />
      </div>
    </Layout>
  );
}
