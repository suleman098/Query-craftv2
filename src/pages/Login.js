// src/Login.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthForm from "../components/AuthForm";
import { useAppContext } from "../context/Appcontext";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, setLoading } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/main");
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address.");
          break;
        default:
          toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <AuthForm
        title="Login"
        handleSubmit={handleLogin}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        buttonText="Login"
        isLoading={isLoading}
        linkPrompt="Don't have an account?"
        linkText="Sign Up"
        linkTo="/signup"
      />
    </div>
  );
};

export default Login;
