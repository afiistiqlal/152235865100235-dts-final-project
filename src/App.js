import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";

/* 
//Todo: Install react-router, tailwind, firebase, DONE!
//Todo: routing login, firebase auth, DONE! searchParam,
Todo: configure auth login page, crud blog to firestore, fetch api, signIn with google
Todo: Styling
*/

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
