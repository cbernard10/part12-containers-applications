import { useState } from "react";

// not using useImperativeHandle here because react recommends using props instead: https://react.dev/reference/react/useImperativeHandle

const Togglable = (props) => {
  const { buttonLabel, visible, setVisible } = props;

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="bg-gray-100 w-fit px-6 py-2 rounded-3xl">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={toggleVisibility}
          className="bg-transparent border-2 border-black px-5 py-1 text-black rounded-2xl hover:bg-gray-300 self-end w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Togglable;
