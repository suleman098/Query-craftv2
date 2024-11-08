function FormInput({
  id,
  label,
  value,
  onChange,
  validation,
  errors,
  type = "text",
  isDisabled = false,
  defaultValue = "", // Add defaultValue prop
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value || defaultValue}
        onChange={onChange}
        className={`input input-accent bg-${
          isDisabled ? "gray-200" : "white"
        } text-black w-full max-w-xs`}
        disabled={isDisabled}
      />
      {errors && errors[id] && (
        <p className="text-red-500 text-sm">{errors[id]}</p> // Show error message
      )}
    </div>
  );
}

export default FormInput;
