import React, { useContext, useState } from "react";
import ShareContent from "../UserIlink/Share";
import { UserD1 } from "../../context";

export default function ShareIlink() {
  const [shareBtn, setShareBtn] = useState(true);
  const { userData } = useContext(UserD1);
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
