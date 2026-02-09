import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderFolder/Header";
import Footer from "./components/FooterFolder/Footer";
import Home from "./components/Home/Home";
import AddContact from "./components/AddContact/AddContact";
import ViewContacts from "./components/ViewContacts/ViewContacts";
import DeleteContacts from "./components/DeleteContacts/DeleteContacts";
import EditContacts from "./components/EditContacts/EditContacts";
import Usersignup from "./components/UserSignup/Usersignup";
import Usersignin from "./components/UserSignin/Usersignin";
import TopNavbar from "./components/Navbar/TopNavbar";
import 'bootstrap/dist/css/bootstrap.min.css'


export  const UserContext = createContext();


function App() {


  const [user, setUser] = useState(()=>{
    
  const savedUser = localStorage.getItem("user");

    return savedUser? JSON.parse(savedUser): null
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <>
          <TopNavbar />

          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/view-contacts" element={<ViewContacts />} />
            <Route path="/edit-contact/:id" element={<EditContacts />} />
            <Route path="/delete-contact/:id" element={<DeleteContacts />} />
            <Route path="/sign-up" element={<Usersignup />} />
            <Route path="/log-in" element={<Usersignin />} />
          </Routes>

          <Footer />
        </>
      </Router>
    </UserContext.Provider>
  );
}

export default App


