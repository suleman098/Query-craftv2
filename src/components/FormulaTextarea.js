function FormulaTextarea({ placeholder, value, onChange }) {
  return (
    <textarea
      placeholder={placeholder}
      className="textarea textarea-bordered textarea-lg w-full bg-white text-black resize-none border-gray-300 border-3"
      value={value}
      onChange={onChange}
    ></textarea>
  );
}

export default FormulaTextarea;
