import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Logo from "./Logo";
function AuthForm({
  title = "Update Details",
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  buttonText = "Update",
  isLoading,
  linkText,
  linkTo,
  linkPrompt,
  isUpdateMode = false,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        !isUpdateMode
          ? "bg-white p-6 rounded shadow-lg w-96 border-2 border-gray-300"
          : ""
      }`}
    >
      {!isUpdateMode && <Logo />}
      {!isUpdateMode && <h2 className="text-lg font-bold mb-4">{title}</h2>}

      {(isUpdateMode || linkTo === "/login") && (
        <>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input input-accent bg-white text-black w-full max-w-xs"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input input-accent bg-white text-black w-full max-w-xs"
            />
          </div>
        </>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isUpdateMode}
          className="input input-accent bg-white text-black w-full max-w-xs"
        />
      </div>

      {!isUpdateMode && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-accent bg-white text-black w-full max-w-xs"
          />
        </div>
      )}

      {isLoading ? (
        <Loader size="small" />
      ) : (
        <button
          type="submit"
          className="w-full p-2 rounded btn btn-outline btn-success text-white"
          disabled={isLoading}
        >
          {buttonText}
        </button>
      )}

      {!isUpdateMode && (
        <p className="mt-4 text-center">
          {linkPrompt}{" "}
          <Link to={linkTo} className="text-blue-500 underline">
            {linkText}
          </Link>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
