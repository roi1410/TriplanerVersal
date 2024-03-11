import React, { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/AuthService";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

function Register() {
  const { isGuest, setIsGuest, setUser } = useContext(GeneralContext);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  let navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.passwordVerification) {
      return setPasswordMatch(true);
    }
    delete data.passwordVerification;
    try {
      const response = await signup(data);
      console.log(response);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const togglePasswordVisibility1 = () => {
    setPasswordShown1((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordShown2((prev) => !prev);
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
  };

  useEffect(() => {
    if (isGuest) {
      navigate("/dashboard/trip-planner");
    }
  }, [isGuest]);

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
        <div className="name-input">
          <input
            type="firstName"
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && alert("First Name is required.")}
          <input
            type="lastName"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && alert("Last Name is required")}
        </div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && alert("Email is required and must be a valid email address")}
        <label className="password-input">
          <input
            type={passwordShown1 ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && alert("Password is required and must be at least 8 characters long")}
          {passwordShown1 ? (
            <AiFillEyeInvisible
              className="password-icon"
              onClick={togglePasswordVisibility1}
            />
          ) : (
            <AiFillEye
              className="password-icon"
              onClick={togglePasswordVisibility1}
            />
          )}
        </label>
        <label className="password-input">
          <input
            type={passwordShown2 ? "text" : "password"}
            placeholder="Verify Password"
            {...register("passwordVerification", {
              required: true,
              minLength: 8,
            })}
          />
          {passwordShown2 ? (
            <AiFillEyeInvisible
              className="password-icon"
              onClick={togglePasswordVisibility2}
            />
          ) : (
            <AiFillEye
              className="password-icon"
              onClick={togglePasswordVisibility2}
            />
          )}
        </label>
        {passwordMatch && alert("Passwords do not match")}
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            className=""
            defaultChecked
            {...register("rememberMe")}
          />
          Remember Me
        </label>
        <button className="primary-button" type="submit">
          Register
        </button>
        <div className="guest-login">
          <span className="or">
            <hr />
            or
            <hr />
          </span>
          <button
            type="button"
            className="outlined-button"
            onClick={handleGuestLogin}
          >
            Continue As Guest
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
