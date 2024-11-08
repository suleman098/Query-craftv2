import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";

const Dropdown = () => {
  const { helpertype, sethelpertype } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (value) => {
    sethelpertype(value);
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="dropdown dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center space-x-2 btn m-1 bg-white text-black w-full hover:bg-gray-200 justify-start"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown open/close
      >
        {helpertype === "Microsoft Excel" && (
          <img src="./excel-logo.png" className="w-6 h-7" alt="Excel Logo" />
        )}
        {helpertype === "SQL" && (
          <img src="./sql-logo.png" className="w-5 h-7" alt="SQL Logo" />
        )}
        <span className="ml-2">{helpertype}</span>
      </div>

      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white text-black rounded-box z-[1] w-full p-2 shadow"
        >
          <li>
            <a
              onClick={() => handleOptionSelect("Microsoft Excel")}
              className="flex items-center hover:bg-gray-200 p-2 space-x-2"
            >
              <img
                src="./excel-logo.png"
                className="w-6 h-7"
                alt="Excel Logo"
              />
              <span>Microsoft Excel</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => handleOptionSelect("SQL")}
              className="flex items-center hover:bg-gray-200 p-2 space-x-2"
            >
              <img src="./sql-logo.png" className="w-5 h-7" alt="SQL Logo" />
              <span>SQL</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
