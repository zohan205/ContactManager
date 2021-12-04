import React, { useState,useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";
import './App.css';
import Header from "./Header";
import api from '../api/contacts'
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchResult, setSearchResult ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // add contacts to api
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid_v4(),
      ...contact
    };
    const response = await api.post("/contacts",request);
    setContacts([...contacts, response.data ])
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== ""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts);
    }
  };

  //Retrieve contacts through api
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  // Delete contacts through api
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact)=>{
      return contact.id!== id;
    })
    setContacts(newContactList);
  }

  //Edit Contacts through api
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact)=>{
        return contact.id === id ? {...response.data} : contact;
      })
    )
  };

  useEffect(()=>{
    (async function (){
      const allContacts = await retriveContacts();
      if (allContacts) setContacts(allContacts)
    })();

  },[]);

  // useEffect(()=>{
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  // },[contacts]);
  return (
    <div className="ui container" >
      <Router>
        <Header/>
        <Routes>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler}/>}/>
          <Route path="/" element={<ContactList contacts={ searchTerm.length < 1 ? contacts :searchResult } 
           removeContactHandler={removeContactHandler}
           term ={searchTerm}
           searchKeyword = {searchHandler}
           />}/>
          <Route path="/contact/:id" element={<ContactDetails/>} />
          <Route path="/edit/:id" element={<EditContact  updateContactHandler={updateContactHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
