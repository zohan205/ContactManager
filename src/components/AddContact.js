import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const AddContact = (props) => {
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        email: ""
    }

    const [data, setData] = useState(initialValues);
    const { name, email } = data;
    const onVlaueChange = (e) =>{
        setData({...data, [e.target.name]: e.target.value });
    }

    const add = (e) => {
        e.preventDefault();
        if (data.name === "" || data.email ===""){
            alert("All feilds are mandatory");
            return
        }
        props.addContactHandler(data);
        navigate('/')

    }
    const another = (e) => {
        e.preventDefault();
        if (data.name === "" || data.email ===""){
            alert("All feilds are mandatory");
            return
        }
        props.addContactHandler(data);
        setData({name: "", email:""});

    }


    return (
        <div className="ui main" >
            <h2>Add Contact</h2>
            <form className="ui form"  >
                <div className="field">
                    <label >Name</label>
                    <input onChange={onVlaueChange} name="name" 
                    value={name} />
                </div>
                <div className="field">
                    <label >Email</label>
                    <input onChange={onVlaueChange} name="email" 
                    value={email} />
                </div>
                <button className="ui button blue" onClick={add} >Save</button>
                <button className="ui button blue" onClick={another} >Save and add another</button>
                <Link to="/" ><button className="ui button blue" >Back to Contact List</button></Link>
            </form>
        </div>
    )

}
export default AddContact;