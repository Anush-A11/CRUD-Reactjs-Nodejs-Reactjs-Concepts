import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { FaBackward } from "react-icons/fa";




const DeleteContacts = () => {

  const {id}= useParams()

  const {state} = useLocation()

  const navigate = useNavigate()

  const handleDelete =()=>{

    fetch(`http://localhost:3000/contacts/${id}`,{


      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      
    }).then(async(res)=>{

      const response = await res.json()

      alert(`Deletion Successful for the contact with the name ${state.name} having email ${state.email}`)
      
      navigate('/view-contacts')
    })



  }


  const handleBackNavigation = ()=>{

    navigate('/view-contacts')

  }



  return (
    <div>
      {/* LOGICAL AND IS USED SO THAT JSX DOES NOT CRASH WHEN FETCHING ID AND STATE AS IT TAKES SOME TIME */}

      {!state && <h2>Loading......</h2>}

      {state && (
        <h2>
          Are you Sure you want to delete the contact with the name "
          {state.name} " & with "{state.email}" ?
        </h2>
      )}

      <button onClick={handleDelete}>
        <MdDeleteForever />
      </button>

      <button onClick={handleBackNavigation}>
        <FaBackward />
      </button>
    </div>
  );


}

export default DeleteContacts
