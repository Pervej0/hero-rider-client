import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const { manuallySignIn, errors } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = (data) => {
    manuallySignIn(data.email, data.password, location, navigate);
  };

  return (
    <section className="container py-3" style={{ minHeight: "80vh" }}>
      <div className="mb-5">
        <h1 className="text-center my-2 text-uppercase">Sign in</h1>
      </div>
      <div className="row">
        <div className="col-md-6 col-12">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="d-block w-100 my-2 py-2"
              type="email"
              placeholder="Enter email"
              {...register("email")}
            />
            <input
              className="d-block w-100 my-2 py-2"
              type="password"
              placeholder="Enter password"
              autoComplete="on"
              {...register("password", { required: true })}
            />
            {errors && <p className="fw-bold text-danger">{errors}</p>}
            <button
              type="submit"
              className="bg-dark rounded border-0 px-3 py-1 text-white"
            >
              Sign in
            </button>
          </form>

          <h5 className="mt-3">
            Are you new here?{" "}
            <Link to="/riderSignup" className="text-dark">
              Signup as a rider
            </Link>{" "}
            or{" "}
            <Link to="/learnerSignup" className="text-dark">
              Sign up as learner
            </Link>
          </h5>
        </div>
        <div className="col-md-6 col-12">
          <h3>image herrer</h3>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
