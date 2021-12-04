import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const EditContact = (props) => {
    const location = useLocation()
    const { id, name, email } = location.state.contact;
    const navigate = useNavigate();
    const initialValues = {
        name,
        email,
        id
    }

    const [data, setData] = useState(initialValues);
    const onVlaueChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value });
    }

    const update = (e) => {
        e.preventDefault();
        if (data.name === "" || data.email ===""){
            alert("All feilds are mandatory");
            return
        }
        props.updateContactHandler(data);
        navigate('/')

    }


    return (
        <div className="ui main" >
            <h2>Edit Contact</h2>
            <form className="ui form" onSubmit={ update } >
                <div className="field">
                    <label >Name</label>
                    <input onChange={onVlaueChange} name="name" 
                    value={data.name} />
                </div>
                <div className="field">
                    <label >Email</label>
                    <input onChange={onVlaueChange} name="email" 
                    value={data.email} />
                </div>
                <button className="ui button blue" >Update</button>
                <Link to="/" ><button className="ui button blue" >Back to Contact List</button></Link>
            </form>
        </div>
    )

}
export default EditContact;