import React, { useCallback, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { UploadFiles } from "../../lib/UploadFilesReq";
// icons
import { MdError } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function CropImg({ setUploadArea, uploadArea, requestUrl, type }) {
  const [userData, setUserData] = useAuth();

  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState();
  const [zoom, setZoom] = useState(1);
  const [uploading, setUploading] = useState();
  const editor = useRef();
  // handle close upload area
  const handleClose = () => {
    if (!uploading) {
      setError();
      setUploadArea(null);
      if (!imgSrc) {
        setImgSrc();
        setZoom(1);
      }
    }
  };

  // handle change file
  const HandleChangePhoto = (e) => {
    if (
      e.type === "image/png" ||
      e.type === "image/jpeg" ||
      e.type === "image/jpg"
    ) {
      setImgSrc(e);
      setError();
    } else {
      setError("File type not supported");
      setImgSrc();
    }
  };

  // handle zoom in photo
  const ZoomIn = useCallback(() => {
    if (zoom <= 3) {
      setZoom((prev) => prev + 0.2);
    }
  }, [zoom]);

  // handle zoom out photo
  const ZoomOut = useCallback(() => {
    if (zoom > 1) {
      setZoom((prev) => prev - 0.2);
    }
  }, [zoom]);

  // handle upload
  const UploadImg = () => {
    if (type === "avatar") {
      const canvas = editor.current.getImage();
      canvas.toBlob(
        (blob) => {
          const FinalImg = new File([blob], imgSrc.name, {
            type: imgSrc.type,
            lastModified: imgSrc.lastModified,
          });
          UploadFiles({
            FinalImg,
            imgSrc,
            setUploading,
            setUploadArea,
            userData,
            setUserData,
            requestUrl,
            uploadArea,
            setError,
            setImgSrc,
          });
        },
        "image/png",
        0.8
      );
    } else {
      UploadFiles({
        imgSrc,
        setUploading,
        setUploadArea,
        userData,
        setUserData,
        requestUrl,
        uploadArea,
        setError,
        setImgSrc,
      });
    }
  };

  return (
    <div
      id="Upload_photo"
      className="fixed z-50 w-full h-full bg-black/60 top-0 left-0 flex justify-center items-center"
    >
      <div
        id="img-upload"
        className=" bg-white flex flex-col justify-center gap-5 items-center relative rounded-xl p-5
        sm:min-w-[90%] sm:min-h-[75%] 
        md:min-w-[70%] md:min-h-[75%]
        lg:min-w-[35%] lg:min-h-[70%] w-8/12"
      >
        <IoCloseOutline
          size={30}
          color="red"
          className="absolute right-3 top-3 border-2 border-red-500 rounded-full p-1 cursor-pointer"
          onClick={handleClose}
        />
        {/* uploading progress */}
        {uploading ? (
          // after uploading
          uploading === 100 ? (
            <div className="w-full justify-center flex items-center gap-5 text-black flex-col ">
              <p className="text-2xl flex items-center gap-4">
                loading please wait <span className="loading loading-spinner" />
              </p>
            </div>
          ) : (
            // in uploading progress
            <div className="w-full flex flex-col items-center gap-5 text-black">
              <div className="w-9/12 bg-[#ddd] h-4 rounded-xl relative ">
                <div
                  style={{ width: `${uploading}%` }}
                  className="absolute top-0 left-0 bg-primaryColor h-full rounded-xl"
                />
                <p className="absolute -right-10 -top-1">{uploading}%</p>
              </div>
              <p className="text-lg capitalize flex items-center gap-3">
                Uploading please wait <span className="loading- loading" />
              </p>
            </div>
          )
        ) : (
          <>
            {error && (
              <span className="text-red-500 font-medium flex items-center gap-2">
                <MdError /> {error}
              </span>
            )}
            {/* avatar input and tools */}
            <div className="flex flex-col w-full max-w-full items-center justify-between gap-5">
              {imgSrc && (
                <div
                  id="image-holder"
                  className="flex-col flex items-center justify-between h-full w-full"
                >
                  {/* image preview */}
                  {type === "avatar" ? (
                    <AvatarEditor
                      ref={editor}
                      borderRadius={1000}
                      width={310}
                      height={310}
                      image={imgSrc}
                      border={10}
                      color={[255, 255, 255, 0.6]}
                      scale={zoom}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(imgSrc)}
                      className="max-h-[500px]"
                    />
                  )}
                  {/* zoom buttons */}
                  {type === "avatar" && (
                    <div
                      id="scale-btns"
                      className="flex-row w-fit mt-5 text-black flex gap-5 items-center "
                    >
                      <p>Zoom: {parseInt(zoom * 100)}%</p>
                      <button
                        type="button"
                        className="text-4xl border-2 border-black px-2 rounded-xl  py-1 "
                        onClick={ZoomIn}
                      >
                        <FaPlus size={20} />
                      </button>
                      <button
                        type="button"
                        className="text-4xl border-2 border-black px-2 rounded-xl  py-1 "
                        onClick={ZoomOut}
                      >
                        <FaMinus size={20} />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* save and change buttons */}
              <div
                id="input-button"
                className="flex gap-5 w-full h-full items-center justify-center"
              >
                {imgSrc ? (
                  <div className="flex gap-5 items-center">
                    <button
                      type="button"
                      onClick={UploadImg}
                      id="upload-img"
                      className="capitalize py-2 px-6 bg-green-500 text-white sm:px-3 md:text-md"
                    >
                      upload avatar
                    </button>
                    <button
                      type="button"
                      id="change-avatar"
                      onClick={() => {
                        setError();
                        setImgSrc();
                        setZoom(1);
                      }}
                      className="capitalize py-2 px-6 bg-primaryColor text-white sm:px-3 md:text-md"
                    >
                      change avatar
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 w-full h-full ">
                    <p className="text-zinc-500 capitalize">max size 20 MB</p>
                    <input
                      id="avatar-input"
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          HandleChangePhoto(e.target.files[0]);
                        }
                      }}
                      className="file:text-white file:bg-blue-500 file:border-none file:px-3 file:py-2 file:mr-3
                        text-black border-[2px] border-blue-500 selection:text-orange-600 rounded-xl "
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CropImg;
