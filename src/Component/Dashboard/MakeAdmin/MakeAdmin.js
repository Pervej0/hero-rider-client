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
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
    reset();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          className="w-50 d-block my-3 py-2"
          placeholder="Enter email here"
          {...register("email", { required: true })}
        />
        <button
          type="submit"
          className="bg-dark text-white border-0 py-2 px-3 rounded"
        >
          Add New Admin
        </button>
      </form>
    </div>
  );
};

export default MakeAdmin;
