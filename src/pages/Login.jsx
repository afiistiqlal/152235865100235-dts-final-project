import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  // signInWithGoogle,
} from "../data/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [error, user, loading, navigate, from]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-neutral-50">
      <div className="w-full m-auto rounded-lg shadow-2xl max-w-lg">
        <h1 className="text-2xl text-center ">Login</h1>
        <div className="px-2">
          <div className="">
            <label className="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-2 py-2 border rounded-md bg-neutral-100"
              placeholder="Email"
            />
          </div>
          <div className="">
            <label className="">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>
          <div className="pt-5">
            <button
              onClick={() => logInWithEmailAndPassword(email, password)}
              className="border rounded-md hover:underline"
            >
              Submit
            </button>
          </div>
          <p className="mt-8 text-xs font-light text-center">
            {" "}
            Don't have an account?{" "}
            <Link to="/register" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
