import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { Next_Prev_Btns } from "../../components/Next_Prev_Btns";
import { UserD1 } from "../../context";
import { MdErrorOutline } from "react-icons/md";
import { UpdateIlinkData } from "../../lib/UserIlinkDataReq";

export default function SkillsSection() {
  const { userData, setUserData } = useContext(UserD1);

  // animation
  const [animation, setAnimation] = useState(true);
  useEffect(() => {
    setAnimation(false);
    if (userData?.IlinkData?.skills?.length === 0) {
      setUserData({
        ...userData,
        IlinkData: {
          ...userData.IlinkData,
          skills: [
            {
              skillname: "",
              skillperc: null,
            },
          ],
        },
      });
    }
  }, []);

  return (
    <section
      className={`${
        animation ? "opacity-0" : "opacity-100"
      }  h-full flex flex-col items-center pt-5 px-5 shadow-xl duration-300 ease-in-out 
      sm:overflow-y-scroll 
      lg:overflow-hidden lg:justify-between`}
    >
      <div className="w-full border-colorDark2 border-b-2 border-zinc-300">
        <h1 className="sm:text-2xl lg:text-3xl font-semibold uppercase">
          skills
        </h1>
        <h2 className="text-base capitalize font-light">
          add some of your skills
        </h2>
      </div>
      <Form />
    </section>
  );
}

const Form = () => {
  const { userData, setUserData } = useContext(UserD1);
  const navigate = useNavigate();
  const [btn, setBtn] = useState("NeedAction");
  const [percErr, setPercErr] = useState([]);
  const { IlinkData } = userData;

  // handle add button
  const AddSkill = (e) => {
    setUserData({
      ...userData,
      IlinkData: {
        ...userData.IlinkData,
        skills: [
          ...userData.IlinkData.skills,
          { skillname: "", skillperc: null },
        ],
      },
    });
  };

  // handle change value
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChange = [...userData.IlinkData.skills];
    onChange[i][name] = value;
    setUserData({
      ...userData,
      IlinkData: { ...userData.IlinkData, skills: onChange },
    });
  };

  // handle delete links
  const handleDeleteSkill = (i) => {
    const onDelete = [...userData.IlinkData.skills];
    onDelete.splice(i, 1);
    setUserData({
      ...userData,
      IlinkData: { ...userData.IlinkData, skills: onDelete },
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(),
          UpdateIlinkData({ userData, setBtn, navigate, path: "portfolio" });
      }}
      className="flex flex-col w-full justify-between lg:max-h-full h-full "
    >
      <div
        className="grid gap-4 justify-items-center px-3 my-6
       sm:grid-cols-1 
       md:grid-cols-2 
       lg:grid-cols-3 lg:max-h-[95%]"
      >
        {IlinkData?.skills?.map((skill, i) => (
          // skill
          <div
            key={i}
            id="skill"
            className=" flex h-fit gap-3 items-end rounded-lg relative border-2 border-white p-2 
            sm:justify-center
            lg:justify-end"
          >
            <div className="form-group-skill-name flex flex-col ">
              <label
                htmlFor="skillname"
                className="mb-1 sm:text-sm lg:text-base capitalize"
              >
                skill name
              </label>
              <input
                required
                onChange={(e) => {
                  handleChange(e, i);
                }}
                value={`${skill.skillname}`}
                type="text"
                placeholder="name"
                name="skillname"
                className="border-2 outline-none p-2 shadow-md w-full
                rounded-lg sm:text-sm lg:text-base"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              {percErr === i || percErr?.includes(i) ? (
                <span className="text-red-500 w-full flex self-center items-center gap-1 text-sm">
                  <MdErrorOutline /> Invalid max 100%
                </span>
              ) : null}
              <div className="form-group-skill-percentage flex items-center gap-2">
                <input
                  required
                  type="number"
                  name="skillperc"
                  placeholder="percent"
                  onChange={(e) => {
                    handleChange(e, i);
                    if (e.target.value > 100) {
                      setPercErr([...percErr, i]);
                      setBtn("NoAction");
                    } else {
                      setBtn("NeedAction");
                      setPercErr(percErr.filter((item) => item !== i));
                    }
                  }}
                  value={`${skill.skillperc}`}
                  maxLength={3}
                  minLength={0}
                  className="border-2 outline-none p-2 shadow-md
              rounded-lg sm:text-sm lg:text-base sm:w-5/12 lg:w-7/12"
                />
                <label
                  htmlFor="skillperc"
                  className="mb-1 sm:text-sm lg:text-base capitalize w-fit"
                >
                  %
                </label>
              </div>
            </div>
            <button
              onClick={(e) => {
                handleDeleteSkill(i);
              }}
              type="button"
              className={`${
                IlinkData?.skills?.length <= 1 ? "hidden" : "block"
              } rounded-md p-1 bg-red-500 z-20 absolute top-2 right-2 `}
            >
              <FaTrash size={14} color="white" />
            </button>
          </div>
        ))}
        {/* add skill button */}
        {percErr?.length > 1 ? null : (
          <div
            id="add-skill-btn"
            className={`w-8/12 h-fit flex-col justify-center items-center
            ${IlinkData?.skills?.length >= 20 ? "hidden" : "flex"}`}
          >
            <p className="mb-1 text-lg capitalize w-fit">add skill</p>
            <button
              onClick={AddSkill}
              type="button"
              className="border-white border-2 p-2 rounded-lg w-11/12 flex justify-center
      hover:bg-white "
            >
              <FiPlus size={22} />
            </button>
          </div>
        )}
      </div>
      <Next_Prev_Btns
        prev={`/${userData.username}/ilink-preview/socialLinks`}
        btn={btn}
      />
    </form>
  );
};
