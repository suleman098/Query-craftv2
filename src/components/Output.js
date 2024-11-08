import { useAppContext } from "../context/Appcontext";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import Card from "./Card";
import CardTitle from "./CardTitle";
import ClearButton from "./ClearButton";
import FormulaBox from "./FormulaBox";
import ResultTextarea from "./ResultTextarea";
import { useEffect } from "react";

function Output() {
  const { output, formula, setOutput, isLoading, setFormula } = useAppContext();

  const extractFormula = (text) => {
    // Regex for Excel formulas
    const excelPattern = /=[A-Z]+\([^()]*\)/;
    // Regex for full SQL queries, including multiline support
    const sqlPattern = /(SELECT|INSERT|UPDATE|DELETE|WITH)\s+.*?(;|$)/i;

    // Try matching an Excel formula first
    const excelMatch = text.match(excelPattern);
    if (excelMatch) return excelMatch[0];

    // Match a full SQL query
    const sqlMatch = text.match(sqlPattern);
    if (sqlMatch) return sqlMatch[0].trim(); // Trim whitespace

    return ""; // Return empty if no match found
  };

  useEffect(() => {
    if (output) {
      const extractedFormula = extractFormula(output);
      setFormula(extractedFormula);
    }
  }, [output, setFormula]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
    toast.success("Formula copied to clipboard!");
  };

  const handleClear = () => {
    setOutput("");
    setFormula("");
    toast("Output Cleared", {
      icon: "🗑",
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Card>
        <CardTitle title="Result:" subtitle="Results will be displayed here:" />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ResultTextarea value={output} />
            <FormulaBox formula={formula} onCopy={handleCopy} />
          </>
        )}

        <ClearButton onClick={handleClear} />
      </Card>
    </div>
  );
}

export default Output;
