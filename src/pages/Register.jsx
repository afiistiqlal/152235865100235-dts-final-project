import { useState, useEffect } from "react";
import { registerWithEmailAndPassword, auth, errorMessage } from "../data/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/login");
    if (error) errorMessage(error);
  }, [user,  navigate, error]);

  return (
    <div>
      <div className="border rounded shadow max-w-sm">
        <h1 className="text-2xl text-center">Sign Up</h1>
        <div className="m-10">
          <div>
            <label className="">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Name"
            />
          </div>
          <div className="">
            <label className="">email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email"
            />
          </div>
          <div className="">
            <label className="">password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 bg-neutral-100 border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
            />
          </div>
          {error ? errorMessage(error) : ""}
          <button
            onClick={() => registerWithEmailAndPassword(name, email, password)}
            className="border py-2 my-4 px-4 mx-4 rounded-lg bg-blue-50"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
