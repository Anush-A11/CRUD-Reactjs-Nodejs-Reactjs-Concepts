import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderFolder/Header";
import Footer from "./components/FooterFolder/Footer";
import Home from "./components/Home/Home";
import AddContact from "./components/AddContact/AddContact";
import ViewContacts from "./components/ViewContacts/ViewContacts";
import DeleteContacts from "./components/DeleteContacts/DeleteContacts";
import EditContacts from "./components/EditContacts/EditContacts";


export  const UserContext = createContext();


function App() {

  
  return (
    <Router>
      <>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/view-contacts" element={<ViewContacts />} />
          <Route path="/edit-contact/:id" element={<EditContacts />} />
          <Route path="/delete-contact/:id" element={<DeleteContacts />} />
        </Routes>

        <Footer />
      </>
    </Router>
  );
}

export default App


