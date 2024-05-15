import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsFillShareFill, BsWhatsapp } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { saveSvgAsPng } from "save-svg-as-png";
import { useAuth } from "../../context/AuthContext";

export const ShareBtn = ({ setShareBtn }) => {
  const [userData] = useAuth();
  const { email, IlinkData } = userData;

  return (
    <div className="fixed bottom-14 right-5 flex flex-col gap-3 z-40">
      {email && (
        <Link
          target="_blank"
          to={`mailto:${email}`}
          className=" bg-red-500 z-20 p-3 rounded-full text-white"
        >
          <MdEmail size={19} />
        </Link>
      )}
      {IlinkData?.socialMediaLinks?.whatsappUrl && (
        <Link
          target="_blank"
          to={`https://wa.me/${IlinkData?.socialMediaLinks?.whatsappUrl}`}
          className=" bg-green-500 z-20 p-3 rounded-full text-white"
        >
          <BsWhatsapp size={19} />
        </Link>
      )}
      <button
        onClick={() => setShareBtn(true)}
        className=" bg-zinc-500 text-white z-20 p-3 rounded-full"
      >
        <BsFillShareFill className="text-mainColor2" size={19} />
      </button>
    </div>
  );
};

export default function ShareContent({
  shareBtn,
  setShareBtn,
  close,
  userViewData,
  userData,
  postion,
  opacity,
}) {
  const url = `https://ilink.onrender.com/userIlinks/${
    userViewData ? userViewData?.username : userData?.username
  }`;

  // copy to clipboard message
  const [copyBtn, setCopyBtn] = useState(false);
  const copyToClip = () => {
    setCopyBtn(true);
    setTimeout(() => setCopyBtn(false), 2000);
  };
  // download qr code
  const DownloadQR = () => {
    saveSvgAsPng(document.getElementById("QRCode"), "QRCode.png", {
      scale: 8,
    });
  };

  return (
    <section
      id="share-ilink-section"
      className={`w-full h-full z-30 top-0 left-0 justify-center items-center
      ${postion ? postion : "fixed"}  ${shareBtn ? "flex" : "hidden"} 
    before:bg-primaryColor ${
      opacity && `before:opacity-90`
    } before:absolute before:top-0 before:left-0 before:w-full before:h-full `}
    >
      <div
        className="container max-w-full bg-white sm:w-11/12 h-fit lg:w-9/12 rounded-xl text-black grid
        gap-5 py-3 px-5 relative"
      >
        <div
          id="top"
          className="w-full justify-between items-start flex border-b-2 py-[2px] h-fit "
        >
          <p className=" text-xl font-bold capitalize ">share your Ilink</p>
          {close && (
            <IoMdCloseCircleOutline
              className=" bg-red-500 rounded-full"
              size={20}
              color="white"
              onClick={() => setShareBtn(false)}
            />
          )}
        </div>
        <div
          id="middle"
          className="w-full flex col-span-full justify-between items-center sm:flex-wrap "
        >
          <div
            id="copy-url"
            className="sm:w-full md:w-6/12 py-3 flex flex-col items-start gap-2"
          >
            <p className="text-xl font-semibold capitalize  text-center ">
              link to share
            </p>
            <div className="input flex items-center w-full bg-slate-600 py-2 rounded-lg px-2">
              <FaLock color="white" size={12} />
              <input
                type="text"
                className="w-full text-sm truncate bg-inherit px-2 text-white
              outline-none"
                readOnly
                value={url}
              />
            </div>
            <div className="copy-message flex items-center gap-1 justify-end w-full">
              {copyBtn && (
                <span className="text-cyan-700 capitalize text-sm">
                  link copied to your clipboard
                </span>
              )}
              <CopyToClipboard text={url} onCopy={copyToClip}>
                <button
                  className="flex self-end border-2 py-1 px-3 ml-2 border-slate-600 text-slate-600
          capitalize rounded-lg duration-150
          hover:bg-slate-600 hover:text-white"
                >
                  copy link
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div
            className="bg-[#f1f1f1] flex self-center
          sm:w-full sm:h-[2px]
          md:w-[2px]  md:h-[400px]"
          />
          <div className="qr-code sm:w-full md:w-4/12 flex justify-center flex-col items-center py-3 gap-3">
            <p className="text-xl font-semibold capitalize text-center w-full">
              qr code
            </p>
            <p className="text-gray-500 text-sm mb-4 w-full text-center">
              Scan with your phone's camera or
              <br />
              QR code app to view your Ilnk
            </p>
            <div className="qrcode p-3 bg-[#f1f1f1] w-fit flex justify-center items-center rounded-lg">
              <QRCode value={url} size={150} title="QRcode" id="QRCode" />
            </div>
            <button
              onClick={DownloadQR}
              className="bg-mainColor1 text-white mt-2 py-2 px-4 rounded-lg "
            >
              Download QR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
