import { Outlet } from "react-router";
import Navbar from "../Navbar";
import Footer from "../Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
