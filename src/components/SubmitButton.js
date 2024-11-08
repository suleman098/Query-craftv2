function SubmitButton({ onClick, isExplained, isGenerated }) {
  return (
    <div className="card-actions justify-center">
      <button className="btn bg-white mt-2 text-black" onClick={onClick}>
        {isExplained && "Explain"} {isGenerated && "Generate"}
      </button>
    </div>
  );
}

export default SubmitButton;
