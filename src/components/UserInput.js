import Dropdown from "./Dropdown";
import React, { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import axios from "axios";
import { validateInput, getValidationMessage } from "../utils/helpers"; // Adjust the path as necessary
import Card from "./Card";
import CardTitle from "./CardTitle";
import ButtonGroup from "./ButtonGroup";
import InstructionMessage from "./InstructionMessage";
import FormulaTextarea from "./FormulaTextarea";
import SubmitButton from "./SubmitButton";

function UserInput() {
  const [isExplained, setisExplained] = useState(true);
  const [isGenerated, setisGenerated] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [activeButton, setActiveButton] = useState("explain");
  const { helpertype, setOutput, setLoading } = useAppContext();

  function displayExplained() {
    setisExplained(true);
    setisGenerated(false);
    setActiveButton("explain");
  }

  function displayGenerated() {
    setisExplained(false);
    setisGenerated(true);
    setActiveButton("generate");
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!validateInput(helpertype, isExplained, textareaValue)) {
        setOutput(getValidationMessage(helpertype, isExplained));
        setLoading(false); // Stop loading
        return;
      }

      const response = await axios.post("http://localhost:5000/chat", {
        message: textareaValue,
        type: helpertype,
        action: isExplained ? "explain" : "generate",
      });

      setOutput(response.data.message);
    } catch (error) {
      console.error("Error fetching response:", error);
      setOutput("An error occurred.");
    } finally {
      setLoading(false); // Ensure loading is stopped in case of success or error
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Card>
        <CardTitle title="Input:" />
        <h4 className="card-title text-black">I am using...</h4>
        <Dropdown />

        <h4 className="text-gray-400">I want the Formula to be...</h4>
        <ButtonGroup
          onExplain={displayExplained}
          onGenerate={displayGenerated}
          activeButton={activeButton}
        />

        <div className="h-12 overflow-y-auto">
          <InstructionMessage
            isExplained={isExplained}
            isGenerated={isGenerated}
          />
        </div>

        <FormulaTextarea
          placeholder={
            isGenerated
              ? helpertype === "Microsoft Excel"
                ? "Calculate the sum of a range like A1:A10"
                : "Retrieve all records from the 'employees' table"
              : helpertype === "Microsoft Excel"
              ? "=SUM(A1:A10)"
              : "SELECT * FROM employees;"
          }
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />

        <SubmitButton
          onClick={handleSubmit}
          isExplained={isExplained}
          isGenerated={isGenerated}
        />
      </Card>
    </div>
  );
}

export default UserInput;
