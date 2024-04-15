import React, { useCallback, useContext, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { IoCloseOutline } from "react-icons/io5";
import { FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import { PiUserSquareFill, PiUserCircleFill } from "react-icons/pi";
import { UploadFiles } from "../Functions/UploadFilesReq";
import { UserD1 } from "../context";

function CropImg({ setUploadArea, uploadArea, cropShape, requestUrl, shape }) {
  const { userData, setUserData } = useContext(UserD1);
  const [imgSrc, setImgSrc] = useState();
  const [error, setError] = useState();
  const [zoom, setZoom] = useState(1);
  const [cropShapeType, setCropShapeType] = useState(
    shape === "rectangle" ? 0 : 1000
  );
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
      if (e.size > 10000000) {
        setError("Image size is large than 10 MB");
        setImgSrc();
        return;
      } else {
        setImgSrc(e);
        setError();
      }
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
    if (zoom >= 1) {
      setZoom((prev) => prev - 0.2);
    }
  }, [zoom]);
  
  // handle upload
  const UploadImg = () => {
    const canvas = editor.current.getImage();
    canvas.toBlob(
      (blob) => {
        const FinalImg = new File([blob], imgSrc.name, {
          type: imgSrc.type,
          lastModified: imgSrc.lastModified,
        });

        UploadFiles({
          FinalImg,
          setUploading,
          setUploadArea,
          userData,
          setUserData,
          requestUrl,
          uploadArea,
        });
      },
      "image/png",
      0.8
    );
  };

  return (
    <div
      id="Upload_photo"
      className="absolute z-50 w-full h-full bg-black/60 top-0 left-0 flex justify-center items-center"
    >
      <div
        id="img-upload"
        className="min-w-[800px] h-[600px] min-h-[600px] bg-white flex justify-between items-center relative rounded-xl p-5"
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
            <div className="w-full justify-center flex items-center gap-5">
              <p className="text-2xl">Image uploaded</p>
              <FaCheckCircle size={30} color="green" />
            </div>
          ) : (
            // in uploading progress
            <div className="w-full flex flex-col items-center gap-5 ">
              <div className="w-9/12 bg-[#ddd] h-4 rounded-xl relative">
                <div
                  style={{ width: `${uploading}%` }}
                  className="absolute top-0 left-0 bg-primaryColor h-full rounded-xl"
                />
                <p className="absolute -right-10 -top-1">{uploading}%</p>
              </div>
              <p className="text-lg capitalize"> Uploading please wait ...</p>
            </div>
          )
        ) : (
          // avatar input and tools
          <div className="flex flex-col w-full h-[90%] items-center justify-between gap-5">
            {imgSrc && (
              <div
                id="tools"
                className={`${
                  cropShape ? "flex-row" : "flex-col"
                } flex items-center justify-between w-full h-full`}
              >
                {/* crop shape */}
                {cropShape ? (
                  <div id="crop-shape" className="flex flex-col w-2/12 gap-5">
                    <h4 className="text-2xl font-semibold">Crop Shape</h4>
                    <button
                      className="flex flex-col items-center text-lg border-2 py-2 border-black"
                      onClick={() => setCropShapeType(1000)}
                    >
                      <PiUserCircleFill size={40} />
                      <p className="text-lg capitalize">circle</p>
                    </button>
                    <button
                      className="flex flex-col items-center text-lg border-2 py-2 border-black"
                      onClick={() => setCropShapeType(0)}
                    >
                      <PiUserSquareFill size={40} />
                      <p className="text-lg capitalize">square</p>
                    </button>
                  </div>
                ) : null}
                {/* image preview */}
                <AvatarEditor
                  ref={editor}
                  style={{
                    width: "fit-content",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                  borderRadius={cropShapeType}
                  width={shape === "rectangle" ? 850 : 420}
                  height={shape === "rectangle" ? 406+0 : 420}
                  image={imgSrc}
                  border={0}
                  color={[255, 255, 255, 0.6]}
                  scale={zoom}
                />
                {/* zoom buttons */}
                <div
                  id="scale-btns"
                  className={` ${
                    cropShape ? "flex-col w-2/12" : "flex-row w-fit mt-5"
                  } flex gap-5 items-center `}
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
              </div>
            )}
            {/* save and reset buttons */}
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
                    className="capitalize py-2 px-6 bg-green-500 text-white"
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
                    className="capitalize py-2 px-6 bg-primaryColor text-white"
                  >
                    change avatar
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-5 w-full h-full">
                  <p className="text-zinc-500 capitalize">max size 10 MB</p>
                  <input
                    id="avatar-input"
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        HandleChangePhoto(e.target.files[0]);
                      }
                    }}
                    className="file:text-white file:border-none file:bg-blue-500 file:px-3 file:py-2 file:mr-3
                border-[2px] border-blue-500 sm:w-full md:w-auto selection:text-orange-600 rounded-xl"
                  />
                </div>
              )}
            </div>
            {error && <span className="text-red-500 ">{error}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropImg;
