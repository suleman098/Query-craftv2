import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [helpertype, sethelpertype] = useState("Microsoft Excel");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [formula, setFormula] = useState("");

  const updateInputValue = (value) => setInputValue(value);

  return (
    <AppContext.Provider
      value={{
        helpertype,
        sethelpertype,
        inputValue,
        updateInputValue,
        isLoading,
        setLoading,
        output,
        setOutput,
        formula,
        setFormula,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
