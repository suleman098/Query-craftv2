import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { FiSettings } from "react-icons/fi";
import Modal from "./Modal";
import Button from "./Button";
import FormInput from "./FormInput";
import useFetchUserData from "../hooks/useFetchUserData"; // Import your custom hook

function UserDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  // Use the custom hook to fetch user data
  const fetchedUserData = useFetchUserData();

  // Update userData when fetchedUserData is available
  useEffect(() => {
    if (fetchedUserData) {
      setUserData(fetchedUserData);
    }
  }, [fetchedUserData]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!userData.firstName) newErrors.firstName = "First name is required";
    if (!userData.lastName) newErrors.lastName = "Last name is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return; // Don't proceed if validation fails

    setLoading(true);
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      toast.success("Details updated successfully!");
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("Failed to update details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-ghost btn-circle"
      >
        <FiSettings size={25} color="black" />
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Update Your Details</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate} className="space-y-4">
            <FormInput
              id="firstName"
              label="First Name"
              value={userData.firstName}
              onChange={handleChange}
              errors={errors}
              defaultValue={userData.firstName} // Pass defaultValue
            />
            <FormInput
              id="lastName"
              label="Last Name"
              value={userData.lastName}
              onChange={handleChange}
              errors={errors}
              defaultValue={userData.lastName} // Pass defaultValue
            />
            <FormInput
              id="email"
              label="Email"
              value={userData.email}
              onChange={handleChange}
              isDisabled={true}
              defaultValue={userData.email} // Pass defaultValue
            />
            <Button type="submit" isLoading={isLoading}>
              Update Details
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserDetails;
