import React from "react";
import styles from "./signup.module.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = ({setSender}) => {


  const navigate = useNavigate()

  const signup = async (data) => {

    try {
      const signupData = await axios.post('https://render.com/docs/web-services#port-binding/user/signup' , data);
      setSender(data.username)      
    } catch (error) {
      console.log(error);
      alert('username already exists')
      navigate('/signup')
    }

  }

  const getData = (e) => {
    e.preventDefault();
    const data = {
      username : e.target[0].value,
      password : e.target[1].value
    }
    signup(data)
    e.target[0].value = ''
    e.target[1].value = ''
    navigate('/users')
  }

  return (
    <div className="">
      <form className={styles.box} onSubmit={(e) => getData(e)}>
        <h1 className={styles.heading}>Sign Up</h1>
        <input type="text" name="username" placeholder="Enter your username "  className={styles.inputbox} />
        <input
          type="password"
          name="password"
          placeholder="Enter your password " className={styles.inputbox} 
        />
        <input type="submit" value="Sign Up" className={styles.signup}/>
    </form>
    </div>
  );
};

export default Signup;
