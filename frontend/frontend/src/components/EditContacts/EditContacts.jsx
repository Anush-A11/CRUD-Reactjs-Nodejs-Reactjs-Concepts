import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";




const EditContacts = () => {

  const {id}= useParams()
  const { state } = useLocation()
  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: state
  })

  const add_to_mongodb = (data)=>{

    fetch(`http://localhost:3000/contacts/${id}`,{

      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)        

    }).then(async(res)=>{
      const response = await res.json()
      alert(`${response}`)
      navigate('/view-contacts')
    })

  }


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
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditContacts
