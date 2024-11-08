function Loader({ message = "Hold On Getting your Query...", size = "large" }) {
  const loaderSizeClass = size === "small" ? "loading-sm" : "loading-lg";

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        size === "large" ? "h-full" : ""
      }`}
    >
      <span
        className={`loading loading-ring text-secondary ${loaderSizeClass} mb-5`}
      ></span>
      {size === "large" && <span>{message}</span>}
    </div>
  );
}

export default Loader;
