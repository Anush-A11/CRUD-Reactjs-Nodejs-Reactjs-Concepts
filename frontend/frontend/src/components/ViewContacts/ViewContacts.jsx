import React, { useEffect, useState } from 'react'
import { FaBackward } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";



const ViewContacts = () => {

  const [array_Contacts, setArrayContacts] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const navigate = useNavigate()
  

  useEffect(()=>{

    fetch("http://localhost:3000/contacts/all-contacts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(async(res) => {
      const all_contacts = await res.json() // GETTING ALL CONTACTS FROM MONGO DB
      setArrayContacts(all_contacts)  // SETTING ALL CONTACTS INSIDE THE STATE FOR DISPLAY IN JSX/HTML    
      setisLoading(false)
    })
  },[])


  const backBtn = () => {
    return navigate("/");
  };

  const handleEdit = (arr)=>{

    return navigate(`/edit-contact/${arr._id}`, {state: arr});

  }

  const handleDelete = (arr) => {

    return navigate(`/delete-contact/${arr._id}`, {state: arr});

  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading pls wait.....</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            
              {array_Contacts.map((arr) => {
                return (
                  <tr key={arr._id}>
                    <td>{arr.name}</td>
                    <td>{arr.email}</td>
                    <td>{arr.phonenumber}</td>

                    <td onClick={() => handleEdit(arr)}>
                      <button>
                        {" "}
                        <CiEdit />
                      </button>
                    </td>
                    <td onClick={() => handleDelete(arr)}>
                      <button>
                        {" "}
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            
          </tbody>
        </table>
      )}

      <FaBackward tabIndex={0} onClick={backBtn}/>
      
    </div>
  );
}


export default ViewContacts
