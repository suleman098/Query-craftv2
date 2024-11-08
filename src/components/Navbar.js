import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Logo from "./Logo";
import { FiLogOut } from "react-icons/fi";
import UserDetails from "./UserDetails";

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="navbar bg-white w-1/2 mx-auto flex items-center justify-between mt-3 rounded-lg border border-gray-400 px-4">
      <div className="flex-grow flex justify-center">
        <Logo />
      </div>
      <UserDetails />
      <button onClick={handleLogout} className="btn btn-ghost btn-circle">
        <FiLogOut size={25} color="black" />
      </button>
    </div>
  );
}

export default Navbar;
