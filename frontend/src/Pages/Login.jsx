import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const auth = useAuth();
  const formRef = useRef();
  const [spinner, setSpinner] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSpinner(true);

    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast.loading("Logging in...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged in successfully", { id: "login" });
    } catch (error) {
      setSpinner(false);
      toast.error("Unable to login", { id: "login" });
      console.log(error);
    }
  };
  return (
    <div className="bg-[#f0f4f9] flex flex-col items-center justify-center h-screen">
      <div className="bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-center p-4 rounded-2xl shadow-md">
        <div className="min-w-[30vw] ">
          <img
            src="src/assets/ai.png"
            alt="login"
            className={`rounded-full h-24 w-24 mb-2 ${spinner ? "animate-spin" : ""
              }`}
          />
          <p className="text-2xl">Login</p>
          <p>Sign in to your account</p>
          <div className="min-h-[3vh] sm:min-h-[20vh]"></div>
        </div>
        <form
          ref={formRef}
          onSubmit={handleLogin}
          className="flex flex-col items-start"
        >
          <div className="flex flex-col">
            <label for="username">Username</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="rounded-lg border-2 border-grey p-2 my-2"
            />
          </div>
          <div className="flex flex-col">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="rounded-lg border-2 border-grey p-2 my-2"
            />
          </div>
          <div className="bs">
            <button
              onClick={handleLogin}
              className="rounded-full px-4 py-2 bg-blue-600 text-white mr-2 my-2 hover:bg-blue-700"
            >
              Login
            </button>
            <Link to="/signup" className="">
              Register
            </Link>
          </div>
          <span className="flex gap-4 mt-4">
            <p>Forgot your password ?</p>
            <a className="link" href="#">
              Reset Account
            </a>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
