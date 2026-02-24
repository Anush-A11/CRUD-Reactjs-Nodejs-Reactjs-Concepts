import React, { useContext, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { data, useNavigate } from 'react-router-dom';
import { FaBackward } from 'react-icons/fa' 
import { UserContext } from '../../App';



const AddContact = () => {
  

  const {register, reset, formState: {errors}, handleSubmit} = useForm()

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserContext);

  useEffect(()=>{

    if(!user){

      alert('Please Log In to Add Contact')
      navigate('/log-in')
    }

  },[])


  const add_to_mongodb = (data)=>{

    const dataTosend = {
      ...data,
      createdBy: user._id,
    };

    console.log(dataTosend);


    fetch("http://3.87.45.74/contacts/add-contact", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTosend),
    }).then(async (res) => {
      const response = await res.json();
      alert(`${response.message}`);
      reset();
    });
  }

  const backBtn = ()=>{

    return navigate('/')

  }


  if(!user){

    return null

  }else{

  return (

    <div>
      <Form onSubmit={handleSubmit(add_to_mongodb)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            {...register("name")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            {...register("phonenumber")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <FaBackward tabIndex={0} onClick={backBtn}/>

    </div>
  )}

}

export default AddContact
