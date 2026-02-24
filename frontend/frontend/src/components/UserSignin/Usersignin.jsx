import React from 'react'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

const Usersignin = () => {



    const navigate = useNavigate()

    const { user,setUser } = useContext(UserContext);

    const {register, handleSubmit, formState: {errors}, reset}= useForm()


    function sendsSignIn_data_to_mongodb(data){

        fetch("http://3.87.45.74/user/sign-in", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then(async (res) => {
          const response = await res.json();
          if (res.ok) {
            localStorage.setItem("token", response.token);
            localStorage.setItem(
              "user",
              JSON.stringify({
                _id: response.id,
                name: response.name,
                email: response.email,
                role: response.role,
              }),
            );
            alert("Login Successful");
            setUser({
              id: response.id,
              name: response.name,
              email: response.email,
              role: response.role,
            });
            navigate("/");
          } else {
            alert(response.message);
            reset();
          }
        });

    }



    return (
      <div>
        <form onSubmit={handleSubmit(sendsSignIn_data_to_mongodb)}>

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
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
}

export default Usersignin
