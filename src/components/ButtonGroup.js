import React from "react";

function ButtonGroup({ activeButton, onExplain, onGenerate }) {
  return (
    <div className="flex justify-center">
      <button
        className={`btn btn-outline mr-2 w-1/2 text-black ${
          activeButton === "explain" ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          onExplain();
        }}
      >
        Explained
      </button>
      <button
        className={`btn btn-outline w-1/2 text-black ${
          activeButton === "generate" ? "bg-gray-200" : ""
        }`}
        onClick={() => {
          onGenerate();
        }}
      >
        Generated
      </button>
    </div>
  );
}

export default ButtonGroup;
