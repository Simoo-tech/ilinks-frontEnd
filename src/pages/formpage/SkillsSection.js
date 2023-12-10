import React, { useContext, useEffect, useState } from "react";
import { FormDataContext } from "../../context/context";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "../../App.css";

function SkillsSection() {
  const [skills, setSkills] = useState([]);
  // context
  const { formData, setFormData } = useContext(FormDataContext);
  // animation
  const [pageAnimation, setPageAnimation] = useState();
  useEffect(() => {
    setPageAnimation(true);
    if (formData.skills) {
      setSkills(formData.skills);
    }
  }, [formData]);

  return (
    <section
      className={`skills flex flex-col justify-between items-center w-full sm:overflow-y-scroll duration-500 ease-in-out
    sm:w-full md:w-full lg:w-full absolute ${
      pageAnimation ? " right-0" : " -right-[1000px] "
    } `}
    >
      <div className="container flex flex-col justify-between items-center h-full ">
        <div className={`w-full border-colorDark2 text-white border-b-2 py-3 `}>
          <p className="sm:text-2xl lg:text-3xl font-semibold uppercase">
            skills
          </p>
          <p className="sm:text-sm lg:text-base capitalize">
            add some of your skills
          </p>
        </div>
        <Form
          setFormData={setFormData}
          formData={formData}
          skills={skills}
          setSkills={setSkills}
        />
      </div>
    </section>
  );
}

export default SkillsSection;

const Form = ({ setFormData, formData, skills, setSkills }) => {
  const navigate = useNavigate();
  // handle submit
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, skills });
    navigate("/formpage/socialLinks");
  };

  // handle add button
  const AddSkill = (e) => {
    setSkills([...skills, { skillname: "", skillperc: null }]);
  };

  // handle change value
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeval = [...skills];
    onchangeval[i][name] = value;
    setSkills(onchangeval);
  };

  // handle delete links
  const handleDeleteSkill = (i) => {
    const onDelete = [...skills];
    onDelete.splice(i, 1);
    setSkills(onDelete);
  };
  return (
    <form
      onSubmit={HandleSubmit}
      className={`skills flex flex-col w-full my-3 py-3 px-3 justify-between shadow-2xl
      ease-linear bg-colorDark1 text-white sm:h-full lg:h-screen sm:gap-5 `}
    >
      <div
        className={`flex h-fit flex-wrap gap-5 items-center
        sm:items-center sm:pb-3 sm:flex-col
        md:flex-row md:justify-between
        lg:items-start lg:flex-row lg:justify-start `}
      >
        {skills.map((skill, i) => (
          // skill
          <div
            key={i}
            className="skill flex gap-3 items-start h-fit sm:w-full md:w-fit
            bg-colorDark2 py-2 px-3 rounded-lg relative"
          >
            <div className="form-group-skill-name flex flex-col">
              <label htmlFor="skillname" className="mb-1 text-lg capitalize">
                skill name
              </label>
              <input
                onChange={(e) => {
                  handleChange(e, i);
                }}
                value={`${skill.skillname}`}
                type="text"
                name="skillname"
                placeholder="skill name"
                className={`border-2 outline-none pl-2 py-2 bg-colorDark1 text-white border-colorDark1
                focus-visible:border-white rounded-lg`}
              />
            </div>
            <div className="form-group-skill-percentage flex flex-col">
              <label
                htmlFor="skillperc"
                className="mb-1 text-lg capitalize w-fit"
              >
                percentage
              </label>
              <input
                type="number"
                name="skillperc"
                onChange={(e) => {
                  handleChange(e, i);
                }}
                style={{ width: "90px" }}
                value={`${skill.skillperc}`}
                min={1}
                max={100}
                maxLength={3}
                placeholder="percent %"
                className={`border-2 outline-none pl-2 py-2 bg-colorDark1 text-white border-colorDark1
                focus-visible:border-white rounded-lg`}
              />
            </div>
            <button
              onClick={(e) => handleDeleteSkill(i)}
              type="button"
              className="rounded-full p-[4px] absolute
              -right-2 -top-2 bg-red-500"
            >
              <IoClose size={10} color="white" />
            </button>
          </div>
        ))}
        {/* add skill button */}
        <div
          className={`add-skill sm:w-5/12 lg:w-1/12 flex-col justify-center items-center
        ${skills.length >= 20 ? "hidden" : "flex"}`}
        >
          <p className="mb-1 text-lg capitalize w-fit">add skill</p>
          <button
            onClick={AddSkill}
            type="button"
            className="border-colorDark2 border-4 p-2 rounded-lg w-11/12 flex justify-center
          hover:bg-colorDark2 "
          >
            <FiPlus size={22} />
          </button>
        </div>
      </div>
      <div className="btn border-gray-400 border-t-2 pt-5 flex gap-5 justify-center">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className={`sm:text-lg lg:text-xl px-5 py-2 rounded-2xl capitalize font-semibold
          flex items-center flex-row-reverse gap-2 group text-white hover:bg-transparent
          bg-colorDark2 w-fit `}
        >
          back
          <GoArrowLeft className="text-xl" />
        </button>
        <button
          type="submit"
          className={`sm:text-lg lg:text-xl px-5 py-2  rounded-2xl capitalize font-semibold
          flex items-center gap-2 group text-white hover:bg-transparent bg-colorDark2 w-fit `}
        >
          Next
          <GoArrowRight className="text-xl" />
        </button>
      </div>
    </form>
  );
};
