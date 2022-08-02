import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";

/* 
//Todo: Install react-router, tailwind, firebase, DONE!
//Todo: routing login, firebase auth, DONE! searchParam, fetch api, signIn with google
Todo: stay logged in when reload, crud blog to firestore, show all user article in Home
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
