import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
/* 
* * Important!
!deprecated
?should?
* @param myparam
Todo: Install router, tailwind, firebase
//Todo: routing login, firebase auth, DONE!
Todo: crud blog to firestore
*/
function App() {
  return (
    <div className="flex flex-col justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
