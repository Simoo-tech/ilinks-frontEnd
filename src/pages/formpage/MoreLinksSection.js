import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";

function MoreLinks({ otherLinks, setOtherLinks }) {
  // adding other links data
  const addLink = () => {
    setOtherLinks([...otherLinks, { labelVal: "", urlVal: "", iconName: "" }]);
  };

  // handle delete links
  const handleDelte = (i) => {
    const onDelete = [...otherLinks];
    onDelete.splice(i, 1);
    setOtherLinks(onDelete);
  };

  // handle change value
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeval = [...otherLinks];
    onchangeval[i][name] = value;
    setOtherLinks(onchangeval);
  };

  return (
    <section className="more-links flex-col flex justify-between self-start container w-full sm:w-full md:w-full lg:w-6/12">
      <div className="section-info flex flex-col  mb-3">
        <p className="text-3xl">Other Links</p>
        <p className="text-base">Add other links </p>
        <Link
          className="underline"
          to="https://icon-sets.iconify.design/"
          target="_blank"
          rel=""
        >
          get icons from here
        </Link>
      </div>
      <div className=" input-more flex flex-col w-12/12 pb-4 ">
        {otherLinks
          ? otherLinks.map((val, i) => (
              <div
                className="link-holder flex flex-row flex-wrap justify-between py-3 px-3 columns-2 mb-3 relative"
                key={i}
              >
                <div className="input-info w-[48%]  mb-2">
                  <label htmlFor="iconName">icon name (optional)</label>
                  <input
                    required
                    name="iconName"
                    value={val.iconName}
                    onChange={(e) => handleChange(e, i)}
                    placeholder="logos:facebook"
                  />
                </div>
                <div className="input-info w-[48%] mb-2">
                  <label htmlFor="labelVal">Label</label>
                  <input
                    required
                    name="labelVal"
                    value={val.labelVal}
                    onChange={(e) => handleChange(e, i)}
                    placeholder="Facebook"
                  />
                </div>
                <div className="input-info w-full ">
                  <label htmlFor="urlVal">url</label>
                  <input
                    required
                    name="urlVal"
                    value={val.urlVal}
                    onChange={(e) => handleChange(e, i)}
                    placeholder="www.facebook.com"
                  />
                </div>
                <TiDelete
                  onClick={() => handleDelte(i)}
                  className="delete absolute text-gray-500 hover:text-red-600 right-0 text-3xl top-0"
                />
              </div>
            ))
          : ""}
        <button
          className={`addBtn ${
            otherLinks.length > 6 ? "hidden" : `my-2 py-2 rounded-2xl`
          }`}
          onClick={addLink}
        >
          <AddCircleIcon color="action" />
        </button>
      </div>
    </section>
  );
}

export default MoreLinks;
