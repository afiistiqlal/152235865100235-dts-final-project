import {
  Link,
  // NavLink
} from "react-router-dom";
import { auth, logout } from "../data/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const [user] = useAuthState(auth);
  return (
    <div className="flex flex-row mx-4 px-2 py-2 bg-slate-200 justify-between">
      Navbar
      {/* {name} */}
      {!user ? (
        <Link className="" to="/login">
          <div className="border bg-slate-100 hover:underline">Login here</div>
        </Link>
      ) : (
        <button
          className="border bg-slate-100 hover:underline"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
