import React from 'react'
import styles from './users.module.css'
import { Link } from 'react-router-dom'


const User = ({user , sender }) => {
  
  return (
    <div className={styles.userbox}>
    <Link to={`/chat/${user}`} className={styles.link} >{user}</Link>
    </div>
  )
}

export default User
