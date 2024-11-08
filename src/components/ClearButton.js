function ClearButton({ onClick }) {
  return (
    <div className="card-actions mt-auto justify-center">
      <button className="btn bg-white mt-7 text-black" onClick={onClick}>
        🧹Clear
      </button>
    </div>
  );
}

export default ClearButton;
