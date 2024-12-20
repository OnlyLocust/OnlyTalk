import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './users.module.css'
import User from './user';
import { useNavigate } from 'react-router-dom';

const Users = ({ sender }) => {

    const navigate = useNavigate()
        const [users , setUsers] = useState([])

    useEffect( () => {
        const getUser = async () => {
            try {
                const allusers = await axios.get('https://onlytalk.onrender.com/user/getusers')
                const addusers = [...allusers.data]
                setUsers(addusers)
                
            } catch (error) {
                console.log(error);
                navigate('/')
            }
        }

        getUser()
    } , [])

  return (
    <>
    <h1 className={styles.heading}>All Users Here</h1>
    <div className={styles.box}>
        {
            users.map((user) => 
            
                user != sender && <User user={user} key={user} >{user}</User>
            
            )
        }
    </div>



    </>
    
  )
}

export default Users
