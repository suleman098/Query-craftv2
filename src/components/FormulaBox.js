function FormulaBox({ formula, onCopy }) {
  if (formula) {
    return (
      <div className="formula-box mt-4 bg-gray-100 p-2 rounded-md flex items-center justify-between border border-gray-300">
        <span className="text-black mr-2">{formula}</span>
        <button onClick={onCopy} className="btn btn-sm bg-gray-200 text-black">
          Copy
        </button>
      </div>
    );
  }
}

export default FormulaBox;
