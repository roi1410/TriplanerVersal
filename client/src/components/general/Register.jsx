import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { signup } from "../../utils/AuthService";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

function Register() {
  const { setUser } = useContext(AppContext);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  let navigate = useNavigate();
  const { handleSubmit, register } = useForm();


  const onSubmit = async (data) => {
    if (data.password !== data.passwordVerification) {
      return alert("Passwords do not match");
    }
    delete data.passwordVerification;
    try {
      const response = await signup(data);
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

  const handleGuestLogin = () =>{
    navigate("/dashboard/new-trip");
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="name-input">
          <input
            type="firstName"
            placeholder="First Name"
            {...register("firstName", { required: true })}
          />
          <input
            type="lastName"
            placeholder="Last Name"
            {...register("lastName")}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <label className="password-input">
          <input
            type={passwordShown1 ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: true, minLength: 8 })}
          />
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
        <div>
          <span className="or">
            <hr />
            or
            <hr />
          </span>
          <button className="outlined-button" onClick={handleGuestLogin}>Continue As Guest</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
