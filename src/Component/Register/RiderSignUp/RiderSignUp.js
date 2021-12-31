import React from "react";
import { useForm } from "react-hook-form";
import useFirebase from "../../../Hooks/useFirebase";

const RiderSignUp = () => {
  const { register, handleSubmit, reset } = useForm();
  const { manuallySignUp } = useFirebase();
  const onSubmit = (data) => {
    manuallySignUp(
      data.email,
      data.confirmPassWord,
      data.fullName,
      data.profileUrl
    );
    reset();
  };
  // console.log(watch("example"));

  return (
    <>
      <div className="container">
        <div className="mb-5">
          <h1 className="text-center my-2 text-uppercase">Sign Up</h1>
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
                placeholder="You Age"
                {...register("age", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="text"
                placeholder="Address"
                {...register("Address", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="text"
                placeholder="Driving license image url"
                {...register("licenseImageUrl", { required: true })}
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
              <label className="h5 text-uppercase">Car Information</label>

              <input
                className="d-block w-100 my-2 py-1"
                type="text"
                placeholder="Brand name"
                {...register("CarBrandName", { required: true })}
              />

              <input
                className="d-block w-100 my-2 py-1"
                type="text"
                placeholder="Car model"
                {...register("CarModel", { required: true })}
              />

              <input
                className="d-block w-100 my-2 py-1"
                type="text"
                placeholder="Name palate"
                {...register("namePalate", { required: true })}
              />

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
              <input
                className="d-block w-100 my-2 py-2"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <input
                className="d-block w-100 my-2 py-2"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassWord", { required: true })}
              />
              <input
                className="d-inline px-5 my-2 text-uppercase bg-dark text-white py-2 border-0 rounded
                "
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-6 col-12">12</div>
    </>
  );
};

export default RiderSignUp;
