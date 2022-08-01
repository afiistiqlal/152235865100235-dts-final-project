import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
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
    if (user) navigate("/", { replace: true });
  }, [error, user, loading, navigate, from]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-neutral-50 mx-auto">
      <div className="w-full m-auto rounded-lg shadow-2xl max-w-lg py-2">
        <h1 className="text-3xl text-center font-semibold p-2 pb-4">Login</h1>
        <div className="px-6">
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
          <div className="pt-5 mx-auto text-center">
            <button
              onClick={() => logInWithEmailAndPassword(email, password)}
              className="border rounded-md hover:underline p-2"
            >
              Submit
            </button>
          </div>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">OR</p>
          </div>
          <div className="flex mt-4 gap-x-2">
            <button
              onClick={signInWithGoogle}
              type="button"
              className="flex items-center justify-center w-full p-2 border border-white rounded-md focus:ring-2 focus:ring-offset-1 hover:bg-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
              <div className="px-2">Continue With Google </div>
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
