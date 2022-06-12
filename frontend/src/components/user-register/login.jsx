import "./user.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { userContext } from "../../context/useContext";



export const Login = () => {

    const [userDetail, setUserDetail] = useState({
        userId: "",
        user: ""
    })

    const { userLogin } = useContext(userContext)



    const navigate = useNavigate()

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const [getData, setGetData] = useState()


    const handleChange = (e) => {
        let { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            let email = data.email;
            let psw = data.password;
    
            let res = await fetch(`https://full-stack-food-app-advanced.herokuapp.com/users?email=${email}&psw=${psw}`);
            let res_data = await res.json();
            //console.log('res_data', res_data)
            let singleData = res_data.data[0]
            setGetData(singleData);
            
            
           

        }
        catch(err) {
            console.log(err)
        }
    }


    useEffect(()=> {
        setTimeout(()=> {
         //console.log('getData._id', getData._id)
                

            setUserDetail({ ...userDetail, userId: getData._id, user: data.first_name })
            swal({
                text: "You Have Successfully Logged In",
                icon: "success"
            })
            
            setTimeout(() => {
                navigate("/products");

            }, 3000)

        }, 1)
    }, [getData]);

    useEffect(() => {
        if (userDetail) {
            userLogin(userDetail)

        }
    })
   // console.log("getData", getData)
    // console.log(userDetail);
    return (
        <div className="signup_mainDiv">
            <form className="register_form" onSubmit={handleSubmit}>
                <input type="text" value={data.first_name} name="first_name" onChange={handleChange} placeholder="First Name" />
                <input type="text" value={data.last_name} name="last_name" onChange={handleChange} placeholder="Last Name" />
                <input type="email" value={data.email} name="email" onChange={handleChange} placeholder="Email" />
                <input type="password" value={data.password} name="password" onChange={handleChange} placeholder="Password" />
                <input type="submit" value="Sign In" className="submit_btn" />
            </form>

            <div className="alter_btn">New User? <Link to="/signup"><span>Create an Account</span></Link> </div>
        </div>
    )
}