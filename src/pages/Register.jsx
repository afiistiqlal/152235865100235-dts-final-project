import { useState, useEffect } from "react";
import {
  registerWithEmailAndPassword,
  auth,
  errorMessage,
} from "../data/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, error] = useAuthState(auth);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
    if (error) errorMessage(error);
  }, [user, navigate, error, from]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-neutral-50 mx-auto">
      <div className="w-full m-auto rounded-lg shadow-2xl max-w-lg py-2">
        <h1 className="text-3xl text-center font-semibold p-2 pb-4">Sign Up</h1>
        <div className="px-6">
          <div className="py-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Name"
            />
          </div>
          <div className="py-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email"
            />
          </div>
          <div className="py-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-neutral-400 focus:ring-neutral-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>
          {error ? errorMessage(error) : ""}
          <div className="pt-5 mx-auto text-center">
            <button
              onClick={() =>
                registerWithEmailAndPassword(name, email, password)
              }
              className="border rounded-md hover:underline p-2"
            >
              Register
            </button>
          </div>
          <div className="text-center">
            <p className="mt-8 text-xs font-light text-center">
              Already have an account?{" "}
              <Link to="/login" className="hover:underline font-medium"> Sign In</Link> instead
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
