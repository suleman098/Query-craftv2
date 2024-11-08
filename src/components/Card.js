function Card({ children }) {
  return (
    <div className="card card-compact bg-base-500 w-[500px] h-[500px] bg-white shadow-xl border-grey border-2">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
