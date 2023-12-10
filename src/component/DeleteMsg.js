import { useState } from "react";
import { BsTrash } from "react-icons/bs";

// delete account
export const DeleteAccountMessage = ({
  DeleteAccount,
  message,
  showMsg,
  setShowMsg,
}) => {
  const [validInp, setValidInp] = useState("");
  return (
    <div
      className={`${
        showMsg ? "block" : "hidden"
      } delete-account w-full h-full top-0 left-0 flex justify-center items-center absolute 
    before:absolute before:h-full before:w-full z-10 before:bg-black before:opacity-50 before:left-0 before:top-0`}
    >
      <div className="message gap-5 h-3/6 w-7/12 relative border-t-4 border-red-500 bg-white rounded-xl z-10 flex items-center flex-col justify-center ">
        <BsTrash
          className="absolute -top-8 bg-red-500 rounded-full px-3 py-2 text-white"
          size={55}
        />
        <p className="text-2xl text-colorBlue1 capitalize font-bold">
          please confirm
        </p>
        <div className="confirm w-11/12 flex flex-col gap-3">
          <p className="text-lg w-full text-center leading-7 text-gray-400">
            {message}
          </p>
          <input
            onChange={(e) => setValidInp(e.target.value)}
            type="text"
            placeholder="Confirm by typing DELETE"
            className={`${
              validInp === "DELETE" ? "border-green-500" : "border-red-500"
            } border-2 rounded-lg outline-none px-3 py-2 w-full `}
          />
        </div>
        <div className="btn flex gap-4">
          <button
            className="cancel-btn text-white bg-gray-600 capitalize py-2 px-3 rounded-lg"
            onClick={() => {
              setShowMsg(false);
            }}
          >
            cancel
          </button>
          <button
            className="accept-btn text-white bg-red-500 capitalize py-2 px-3 rounded-lg"
            onClick={validInp === "DELETE" ? DeleteAccount : null}
          >
            yes, delete it
          </button>
        </div>
      </div>
    </div>
  );
};
// delete item message
export const DeleteMessage = ({
  message,
  showMsg,
  setShowMsg,
  HandleRemoveImg,

}) => {
  return (
    <div
      className={`${
        showMsg ? "block" : "hidden"
      } delete-account w-full h-full top-0 left-0 flex justify-center items-center absolute 
    before:absolute before:h-full before:w-full z-10 before:bg-black before:opacity-50 before:left-0 before:top-0`}
    >
      <div className="message gap-5 h-3/6 w-7/12 relative border-t-4 border-red-500 bg-white rounded-xl z-10 flex items-center flex-col justify-center ">
        <BsTrash
          className="absolute -top-8 bg-red-500 rounded-full px-3 py-2 text-white"
          size={55}
        />
        <p className="text-2xl text-colorBlue1 capitalize font-bold">
          please confirm
        </p>
        <div className="confirm w-11/12 flex flex-col gap-3">
          <p className="text-lg w-full text-center leading-7 text-gray-400">
            {message}
          </p>
        </div>
        <div className="btn flex gap-4">
          <button
            onClick={() => {
              setShowMsg(false);
            }}
            className="text-white bg-gray-600 capitalize py-2 px-3 rounded-lg"
          >
            cancel
          </button>
          <button
            onClick={HandleRemoveImg}
            className="text-white bg-red-500 capitalize py-2 px-3 rounded-lg"
          >
            yes, delete it
          </button>
        </div>
      </div>
    </div>
  );
};
