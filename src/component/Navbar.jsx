import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, logout } from "../data/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "../assets/Logo.png";

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      logout();
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-row py-4 px-4 shadow-lg items-center justify-between">
      <div className="flex flex-row">
        <NavLink to="/" className="justify-center">
          <img className="h-10 w-10" src={Logo} alt="Workflow" />
        </NavLink>
        <NavLink to="/explore" className="px-4 my-auto hover:underline">
          Explore
        </NavLink>
      </div>
      {!user ? (
        <NavLink className="px-4" to="/login">
          <div className="border hover:underline hover:bg-neutral-100 rounded-lg p-2">Login here</div>
        </NavLink>
      ) : (
        <div>
          <NavLink to="/myarticles" className="justify-end hover:underline">
            MyArticle
          </NavLink>
          <NavLink to="/createPost" className="hover:underline px-4">
            Create Post
          </NavLink>
          <button
            className="border hover:underline hover:bg-neutral-100 rounded-lg p-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
