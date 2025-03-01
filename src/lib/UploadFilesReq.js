import axios from "axios";
import cookies from "react-cookies";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export async function UploadFiles({
  FinalImg,
  setUploading,
  setUploadArea,
  userData,
  setUserData,
  requestUrl,
  uploadArea,
  setError,
  setImgSrc,
  imgSrc,
}) {
  const file = new FormData();
  file.append("file", FinalImg || imgSrc);
  const token = cookies.load("UD_1");
  const imgSize = FinalImg || imgSrc;
  // check file size
  if (imgSize.size <= 20 * 1024 * 1024) {
    try {
      const res = await axios.put(
        `${serverPath}upload-files/${requestUrl}`,
        file,
        {
          onUploadProgress: (e) => {
            setUploading(parseInt((e.loaded / e.total) * 100));
          },
          headers: {
            "Content-type": "multipart/form-data",
            "access_token ": token,
          },
        }
      );

      if (res.data.success) {
        if (requestUrl.startsWith("avatar")) {
          setUserData({ ...userData, avatar: res.data.avatar });
        } else if (requestUrl.startsWith("portfolio")) {
          const onChangeImg = [...userData.IlinkData.portfolio];
          onChangeImg[uploadArea].imgurl = res.data.path;
          setUserData({
            ...userData,
            IlinkData: {
              ...userData.IlinkData,
              portfolio: onChangeImg,
            },
          });
        }
        setTimeout(() => setUploadArea(null), 1000);
      }
    } catch (error) {
      setError("File size is large than 20 MB or type not support");
      setUploading();
      setImgSrc();
    }
  } else {
    setError("File size is large than 20 MB");
    setUploading();
    setImgSrc();
  }
}
