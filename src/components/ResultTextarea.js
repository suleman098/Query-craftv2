function ResultTextarea({ value }) {
  return (
    <textarea
      className="textarea textarea-bordered textarea-lg w-full bg-white text-black resize-none border-gray-300 border-3"
      value={value}
      rows="5"
      readOnly
    />
  );
}

export default ResultTextarea;
