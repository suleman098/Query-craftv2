import Layout from "./Layout";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Layout />
      <Footer />
    </>
  );
}
