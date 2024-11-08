import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/Appcontext";
import { Toaster } from "react-hot-toast";
import AuthForm from "../components/AuthForm";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { isLoading, setLoading } = useAppContext();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: new Date(),
      });

      navigate("/main");
      toast.success("Sign-up successful!");
    } catch (error) {
      console.error("Sign-up error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("Email is already in use.");
          break;
        case "auth/invalid-email":
          toast.error("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters.");
          break;
        default:
          toast.error("Sign-up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <AuthForm
        title="Sign Up"
        handleSubmit={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        buttonText="Signup"
        isLoading={isLoading}
        linkPrompt="Already have an account?"
        linkText="Login"
        linkTo="/login"
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
    </div>
  );
};

export default SignUp;
