import {
  isValidExcelFormula,
  isValidExcelDescription,
  isValidSQLQuery,
  isValidSQLDescription,
} from "./validations";

export const validateInput = (helpertype, isExplained, textareaValue) => {
  if (helpertype === "Microsoft Excel") {
    if (isExplained) {
      // is the user selected the Explin button (use wantts the formulas to be explained meaning they must insert the actuall Excel formula)
      return isValidExcelFormula(textareaValue); // this validates if the formulas is actually Excel
    } else {
      return isValidExcelDescription(textareaValue); // if the user has clicked generate then must have inseted the description of the formulas - this cheks that the user has NOT inserts any formula and a velid description
    }
  } else if (helpertype === "SQL") {
    if (isExplained) {
      return isValidSQLQuery(textareaValue);
    } else {
      return isValidSQLDescription(textareaValue);
    }
  }
  return false; // Return false for invalid helper types
};

export const getValidationMessage = (helpertype, isExplained) => {
  // this function is use to minimised the API requests been made to GPT API and setting this Output to the appopriate error message
  if (helpertype === "Microsoft Excel") {
    return isExplained
      ? "Please enter a valid Excel formula (e.g., '=SUM(A1, B1)')."
      : "Please enter a description, not a formula.";
  } else if (helpertype === "SQL") {
    return isExplained
      ? "Please enter a valid SQL query (e.g., 'SELECT * FROM table;')."
      : "Please enter a description, not an SQL query.";
  }
  return "Invalid helper type. Please select either Excel or SQL.";
};
