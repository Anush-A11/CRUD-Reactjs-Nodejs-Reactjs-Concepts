import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserContext} from "../../App.jsx"
import { Link } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)

    const AddContactsNavigate = () => {
      return navigate("/add-contact");
    };

    const ViewContactsNavigate = ()=>{

      return navigate('/view-contacts')
    }

    const navigateToSignup = ()=>{
      return navigate('/sign-up')
    }

    const navigateToLogin = () => {
      return navigate("/log-in");
    };

    const handleLogout = ()=>{

      localStorage.clear()
      alert(`Successfully Logged Out`)
      setUser(null)
    }

  return (
    <div>
      <h1>Welcome to Contact Management App</h1>

      <ul>
        <li onClick={() => AddContactsNavigate()} tabIndex={0}>
          Add Contact
        </li>
        <li onClick={() => ViewContactsNavigate()} tabIndex={0}>
          View Contacts
        </li>
        <li tabIndex={0}>Delete / Update Contacts</li>
      </ul>

      <div>
        <h2>COMMIT 1</h2>
        <img src="/public/images/crm1.jpg" />
      </div>
    </div>
  );
}

export default Home
