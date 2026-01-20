import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();


    const AddContactsNavigate = () => {
      return navigate("/add-contact");
    };

    const ViewContactsNavigate = ()=>{

      return navigate('/view-contacts')
    }



  return (
    <div>
      <h1>Welcome to Contact Management App</h1>

      <ul>
        <li onClick={() => AddContactsNavigate()} tabIndex={0}>Add Contact</li>
        <li onClick={() => ViewContactsNavigate()} tabIndex={0}>View Contacts</li>
        <li tabIndex={0}>Delete / Update Contacts</li>
      </ul>
    </div>
  );
}

export default Home
