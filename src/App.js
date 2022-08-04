import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
