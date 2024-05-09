import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import CropImg from "./CropImg";
import Avatar from "react-avatar";

export const ProfilePic = ({ userData }) => {
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
          size="160px"
          alt="avatar"
          className="relative before:rounded-full before:absolute before:bg-black/70 before:top-0 bg-zinc-400
          before:left-0 before:w-full before:h-full group-hover:before:bg-black/50 before:z-10"
        />
        <CiEdit className=" absolute z-10" size={35} color="white" />
      </button>
      {uploadArea && (
        <CropImg
          setUploadArea={setUploadArea}
          requestUrl={`avatar/${userData._id}`}
        />
      )}
    </>
  );
};
