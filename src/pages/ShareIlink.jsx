import React, { useState } from "react";
import ShareContent from "./UserIlink/Share";
import { useAuth } from "../context/AuthContext";
export default function ShareIlink() {
  const [shareBtn, setShareBtn] = useState(true);
  const [userData, setUserData] = useAuth();
  return (
    <div className="section-h w-full flex justify-center items-center">
      <ShareContent
        shareBtn={shareBtn}
        setShareBtn={setShareBtn}
        close={false}
        userData={userData}
        postion="relative"
      />
    </div>
  );
}
