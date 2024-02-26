import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import VisibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "../Components/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const signedIn = await signInWithEmailAndPassword(auth, email, password);
      if (signedIn.user) {
        navigate("/");
      }
    } catch (e) {
      toast.error('Bad user credentials')
      // navigate("/signup");
    }
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome Back!</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChange}
          className="emailInput"
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "password" : "text"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <img
            src={VisibilityIcon}
            alt="show password"
            className="showPassword"
            onClick={() => setShowPassword((prev) => !prev)}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>
        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#fff" width="34px" height="34px" />
          </button>
        </div>
      </form>

      <OAuth />

      <Link to="/signup" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  );
}

export default SignIn;
