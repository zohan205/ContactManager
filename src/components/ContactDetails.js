import React from 'react';
import user from "../images/peska.png";
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const ContactDetails = () => {
    const location = useLocation()
    const { contact } = location.state
    return (
        <div className="main" style={{marginTop:"20px"}} >
            <div className="ui card centered" >
                <div className="image" >
                    <img src={user} alt="user" />
                </div>
                <div className="content" >
                    <div className="header center aligned" >{contact.name}</div>
                    <div className="description center aligned" >{contact.email}</div>
                </div>
            </div>
            <div style={{textAlign: "center"}} >
                <Link to="/" >
                    <button className="ui button blue center" >Back to Contact List</button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetails
