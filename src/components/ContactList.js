import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    const inputEl = useRef("");
    const getId = (id) =>{
        props.removeContactHandler(id);
    }
    const renderContactList = props.contacts.map((contact)=>{
        return(
            <ContactCard contact={contact} key={contact.id} getId={getId} />
        )
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }
    
    return (
        <div className="main" style={{marginTop: "50px"}}>
            <h2>Contact List           
            </h2>
            <div className="ui search" >
                <div className="ui icon input" >
                    <input type="text" placeholder="Search Contacts"
                     ref = {inputEl}
                     className="prompt" 
                     value = {props.term}
                     onChange={ getSearchTerm }
                     />
                    <i className="search icon" ></i>
                </div>
                <Link to="/add" >
                    <button className="ui button blue right floated"  >Add Contact</button>
                </Link>
            </div>
            <div className="ui celled list" >
                {renderContactList.length > 0 ? renderContactList : "No Contacts Available"  }
            </div>
        </div>
    )
}

export default ContactList
