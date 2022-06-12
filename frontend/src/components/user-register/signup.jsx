import "./user.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

export const Signup = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

   

    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(data.first_name !== "" && data.last_name !== "" && data.email !== "" && data.password !== ""){
            axios.post("https://full-stack-food-app-advanced.herokuapp.com/users/create", data)
            .then(res => console.log(res))
            .then(swal({text: "Account Created!", icon:"success"})).then(navigate("/"))
            .catch(err=> swal("Try Again", err, "failure"));
        }
        else {
            swal({title:"Try Again", text:"Please Fill Every Field", icon:"error"})
        }
        
    }

    console.log(data);
    return (
        <div className="signup_mainDiv">
            <form className="register_form" onSubmit={handleSubmit}>
                <input type="text" value={data.first_name} name="first_name" onChange={handleChange} placeholder="First Name" />
                <input type="text" value={data.last_name} name="last_name" onChange={handleChange} placeholder="Last Name" />
                <input type="email" value={data.email} name="email" onChange={handleChange} placeholder="Email" />
                <input type="password" value={data.password} name="password" onChange={handleChange} placeholder="Password" />
                <input type="submit" value="Sign Up" className="submit_btn" />
            </form>

            <div className="alter_btn">Already Have an Account? <Link to="/"><span>Sign In</span></Link> </div>
        </div>
    )
}