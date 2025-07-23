import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Signup() {
  const auth = useAuth();
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profilePic: "",
  });
  const navigation = useNavigate();

  const setImage = (image) => {
    // get the image file and set it to formData
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData({ ...formData, profilePic: e.target.result });
    }
    reader.readAsDataURL(image);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      toast.loading("Signing up...", { id: "signup" });
      console.log("FormData: ", formData);
      await auth?.signup(formData.name, formData.email, formData.password, formData.profilePic);
      toast.success("Signed up successfully", { id: "signup" });
      // window.location.href = "/";
      navigation("/");
    } catch (error) {
      setSpinner(false);
      toast.error("Unable to signup", { id: "signup" });
      console.log(error);
    }
  };

  return (
    <div className="bg-[#f0f4f9] flex flex-col items-center justify-center h-screen">
      <div className="bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-center p-4 rounded-2xl shadow-md">
        <div className=" min-w-[60vw] sm:min-w-[30vw] ">
          <img
            src="src/assets/ai.png"
            alt="login"
            className={`rounded-full h-24 w-24 mb-2 ${spinner ? "animate-spin" : ""
              }`}
          />
          <p className="text-2xl">SignUp</p>
          <p>Create a new Account</p>
          <div className="h-[2vh] sm:min-h-[20vh]"></div>
        </div>
        <form onSubmit={handleSignup} className="flex flex-col items-start">
          <label className="flex items-center justify-center custom-file-upload bg-[#777777] rounded-full overflow-hidden h-20 w-20">
            {formData.profilePic && (
              <img
                src={formData.profilePic}
                className="w-[100%] h-[100%] object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              // set uri of image to formData
              onChange={(e) => setImage(e.target.files[0])}
            />
            {!formData.profilePic && <p>Avatar</p>}
          </label>
          <label for="name">Full Name</label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="rounded-lg border-2 border-grey p-2 my-2"
          />
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="rounded-lg border-2 border-grey p-2 my-2"
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="rounded-lg border-2 border-grey p-2 my-2"
          />
          <div className="bs">
            <button
              onClick={handleSignup}
              className="rounded-full px-4 py-2 bg-blue-600 text-white mr-2 my-2 hover:bg-blue-700"
            >
              Register
            </button>
          </div>
          <span className="flex gap-4 p-2">
            <p>Already have an Account?</p>
            <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
