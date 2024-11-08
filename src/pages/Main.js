import Output from "../components/Output";
import UserInput from "../components/UserInput";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
function Main() {
  return (
    <div className="flex flex-col items-center  bg-white">
      <Navbar />
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <div className="flex space-x-7">
        <UserInput />
        <Output />
      </div>
    </div>
  );
}

export default Main;
