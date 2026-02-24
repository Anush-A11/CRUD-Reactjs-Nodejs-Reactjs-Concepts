import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Usersignup = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm()

    const navigate = useNavigate()

    const addUsertomongoDB = (data)=>{

        fetch("http://3.87.45.74/user/sign-up", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(async (res) => {
          const response = await res.json();

          if (res.ok) {
            alert(response.message);
            reset();
            navigate("/");
          } else {
            alert(response.message);
            reset();
          }
        });


    }
  return (
    <div>
      <form onSubmit={handleSubmit(addUsertomongoDB)}>
        Name:{" "}
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        <br />
        Email:{" "}
        <input
          type="email"
          {...register("email", { required: "Email is Required" })}
        />
        <br />
        Password:{" "}
        <input
          type="text"
          {...register("password", { required: "Password is required" })}
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default Usersignup
