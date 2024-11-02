import React, { useState } from "react";
import ShareContent from "./UserIlink/Share";
import Layout from "../Layout";

export default function ShareIlink() {
  const [shareBtn, setShareBtn] = useState(true);

  return (
    <Layout>
      <div className="section-h w-full flex justify-center items-center">
        <ShareContent
          shareBtn={shareBtn}
          setShareBtn={setShareBtn}
          close={false}
          postion="relative"
        />
      </div>
    </Layout>
  );
}
