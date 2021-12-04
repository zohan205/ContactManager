import React from 'react';
import user from '../images/user.png';
import { Link } from 'react-router-dom'; 

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className="item">
            <img src={user} alt="Default" className="ui avatar image" />
            <div className="content">
                <Link to={`/contact/${id}`} 
                state={{contact: props.contact}}
                >
                    <div className="header">{name}</div>
                    <div >{email}</div>
                </Link>
            </div>
            <div className="ui right floated">
                <i className="trash alternate outline icon" onClick={()=>props.getId(id)}
                style={{ color: "red", marginTop: "7px", marginLeft: "10px"}} ></i>
                <Link to={`/edit/${id}`} 
                state={{contact: props.contact}} >
                    <i className="edit alternate outline icon"
                    style={{ color: "blue", marginTop: "7px"}} ></i>
                </Link>
            </div>               
        </div>
    )
}

export default ContactCard
