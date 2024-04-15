import axios from "axios";
const serverPath = import.meta.env.VITE_SOME_SERVER_API;

export async function UploadFiles({
  FinalImg,
  setUploading,
  setUploadArea,
  userData,
  setUserData,
  requestUrl,
  uploadArea,
}) {
  const file = new FormData();
  file.append("file", FinalImg);
  await axios
    .put(`${serverPath}upload-files/${requestUrl}`, file, {
      onUploadProgress: (e) => {
        setUploading(parseInt((e.loaded / e.total) * 100));
      },
    })
    .then((res) => {
      if (requestUrl.startsWith("avatar")) {
        setUserData({ ...userData, avatar: res.data.avatar });
      } else if (requestUrl.startsWith("portfolio")) {
        const onChangeImg = [...userData.IlinkData.portfolio];
        onChangeImg[uploadArea].imgurl = res.data;
        setUserData({
          ...userData,
          IlinkData: {
            ...userData.IlinkData,
            portfolio: onChangeImg,
          },
        });
      }
      setTimeout(() => setUploadArea(null), 1000);
    });
}
