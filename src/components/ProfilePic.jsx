import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import CropImg from "./Tools/CropImg";
import Avatar from "react-avatar";
import { useAuth } from "../context/AuthContext";

export const ProfilePic = () => {
  const [userData] = useAuth();
  const [uploadArea, setUploadArea] = useState(false);
  const { avatar } = userData;

  return (
    <>
      <button
        onClick={() => setUploadArea(true)}
        id="avatar"
        type="button"
        className="relative w-fit self-center h-fit rounded-full flex justify-center items-center group"
      >
        <Avatar
          src={avatar}
          round
          size={"110px"}
          alt="avatar"
          className="before:rounded-full before:absolute before:bg-black/70 before:top-0 
          before:left-0 before:w-full before:h-full group-hover:before:bg-black/50 before:z-10
          relative bg-zinc-400"
        />
        <CiEdit className=" absolute z-10" size={35} color="white" />
      </button>
      {uploadArea && (
        <CropImg
          setUploadArea={setUploadArea}
          requestUrl={`avatar/${userData._id}`}
          type="avatar"
        />
      )}
    </>
  );
};
