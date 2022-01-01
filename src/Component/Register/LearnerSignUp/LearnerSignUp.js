import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useFirebase from "../../../Hooks/useFirebase";

const LearnerSignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const { manuallySignUp } = useFirebase();
  const [error, setError] = useState("");
  // const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    data.role = "Learner";
    if (data.password !== data.confirmPassWord) {
      setError("Password dosen't matched!");
      return;
    }
    const details = data;
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    // console.log(data);
    manuallySignUp(
      data.email,
      data.confirmPassWord,
      data.fullName,
      data.profileUrl,
      location,
      navigate
    );
    reset();
  };
  // console.log(watch("example"));

  return (
    <>
      <div className="container my-5">
        <div className="mb-5">
          <h1 className="text-center my-2 text-uppercase">
            Sign Up For Learner
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 col-12">
              <label className="h5 text-uppercase">Personal Information</label>
              <input
                className="d-block w-100 my-2 py-2"
                placeholder="Full Name"
                {...register("fullName", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="number"
                placeholder="Your Age"
                {...register("age", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="text"
                placeholder="Address"
                {...register("address", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="number"
                placeholder="Phone no."
                {...register("phone", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="text"
                placeholder="NID image url"
                {...register("nidImageUrl", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="text"
                placeholder="Profile image url"
                {...register("profileUrl", { required: true })}
              />
            </div>
            <div className="col-md-6 col-12">
              <label className="h5 text-uppercase">Vehicle Type</label>
              <div className="mb-3">
                <select
                  {...register("vehicleType", { required: true })}
                  className="w-100"
                >
                  <option value="car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="bicycle">Bicycle</option>
                </select>
              </div>
              <label className="h5 text-uppercase mb-0">Password</label>
              <input
                className="d-block w-100 my-2 py-2"
                type="password"
                placeholder="Password"
                autoComplete="on"
                {...register("password", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="password"
                placeholder="Confirm password"
                autoComplete="on"
                {...register("confirmPassWord", { required: true })}
              />
              {error && <p className="text-danger fw-bold">{error}</p>}
              <button
                className="d-inline px-5 my-2 text-uppercase bg-dark text-white py-2 border-0 rounded
                "
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-6 col-12">12</div>
    </>
  );
};

export default LearnerSignUp;
