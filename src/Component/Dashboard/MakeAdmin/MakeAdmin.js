import React, { useState } from "react";
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    fetch(`http://localhost:5000/admin/${data.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          alert("Successfully admin created");
        }
      })
      .catch((error) => console.log(error));
    reset();
  };

  return (
    <section style={{ minHeight: "80vh" }}>
      <div className="container">
        <h2 className="text-uppercase text-center mt-5 mb-5">
          Make a new Admin
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-50 mx-auto text-left">
            <input
              type="email"
              className="w-100 d-block my-3 py-2 mx-auto"
              placeholder="Enter email here"
              {...register("email", { required: true })}
            />
            <button
              type="submit"
              className="bg-dark text-white border-0 py-2 px-3 rounded"
            >
              Add New Admin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MakeAdmin;
