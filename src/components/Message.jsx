import { IoMdCloseCircle, IoMdNotifications } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";

export const Message = ({ setUserVerified, message, setMessage }) => {
  const { title, active, body, unRead } = message;

  // message style
  return (
    <div
      className={`${
        active ? "right-3" : " -right-[240px] "
      } fixed top-20 w-[240px] h-[200px] shadow-xl z-40 flex items-center justify-center duration-700 ease-in-out`}
    >
      <div className=" capitalize w-full h-full relative flex ">
        {/* left bottom */}
        {!active && (
          <button
            onClick={() => {
              setMessage({ ...message, active: true });
            }}
            id="left"
            className="absolute flex justify-between items-center py-1 px-2 bg-color3 -rotate-90 w-[170px] 
            h-fit top-[82px] -left-[100px] rounded-t-xl"
          >
            <h1 className="text-center text-white flex items-center gap-2">
              Notifications
            </h1>
            {unRead ? (
              <MdNotificationsActive color="white" />
            ) : (
              <IoMdNotifications color="white" />
            )}
          </button>
        )}
        {/* message body */}
        <div
          id="middle "
          className={`flex justify-center items-center flex-col h-full bg-white w-full py-4 px-3 relative`}
        >
          <IoMdCloseCircle
            size={23}
            color="red"
            className="absolute top-1 right-1"
            onClick={() => {
              setMessage({ ...message, active: false });
            }}
          />
          {title === "verify email" && (
            <div className="flex flex-col justify-evenly gap-2 items-center h-full">
              <h2 className="font-semibold">{title}</h2>
              <p className="text-base text-center">{body}</p>
              <button
                className="bg-primaryColor text-white py-1 w-full text-base"
                onClick={() => {
                  setUserVerified(true);
                  setMessage({ ...message, active: false });
                }}
              >
                Verify
              </button>
            </div>
          )}
          {title === "" && <p>No Notifications</p>}
        </div>
      </div>
    </div>
  );
};
