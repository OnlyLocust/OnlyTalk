import React from 'react'
import styles from './login.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({setSender , sender}) => {


  const navigate = useNavigate()

  const login = async (data) => {

    try {
      const loginData = await axios.post('http://localhost:8000/user/login' , data);
      setSender(data.username)

      
      
    } catch (error) {
      console.log(error);
      alert("wrong Username or password")
      navigate('/')
    }
    

  }

  const getData = (e) => {
    e.preventDefault();
    const data = {
      username : e.target[0].value,
      password : e.target[1].value
    }
    login(data)
    e.target[0].value = ''
    e.target[1].value = ''

    navigate('/users')
    
  }




  return (



    <>


    
    {/* <div className={styles.outbox}> */}
          <form className={styles.box} onSubmit={(e) => getData(e)}>
            <h1 className={styles.heading}>Log In Here</h1>
            <input type="text" name="username" placeholder="Enter your username " className={styles.inputbox}/>
            <input
              type="password"
              name="password"
              placeholder="Enter your password " className={styles.inputbox}
            />
            <input type="submit" value="Log in" className={styles.login}/>
              <Link to='/signup' className={styles.signup}>Make a Account</Link>
        </form>
        {/* </div> */}


    </>

  )
}

export default Login
