import React, { useEffect, useState } from "react";
import styles from "./chat.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ sender }) => {

  const navigate = useNavigate()
  const { receiver } = useParams();

  const [smsg, setSmsg] = useState([]);
  const [rmsg, setRmsg] = useState([]);

  const getMessages = async () => {
    try {
      const msg = await axios.get(
        `https://onlytalk.onrender.com/chats/${sender}/${receiver}`
      );
      const m1 = msg.data.msgs1;
      const m2 = msg.data.msgs2;
      setSmsg(m1);
      setRmsg(m2);
    } catch (error) {
      console.log('hi');
      
      console.log(error);
      navigate('/')
    }
  };

  useEffect(() => {
    getMessages();

    const interval = setInterval(getMessages, 1000);

      return () => clearInterval(interval);
  }, []);


  const addMsg = async (msg) => {
    try {
      const added = await axios.put(`https://onlytalk.onrender.com/chats/${sender}/${receiver}` , {message : msg})
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const sendMsg = (e) => {
    e.preventDefault()
    // console.log(e.target[0].value);
    const msg = e.target[0].value
     addMsg(msg);
     e.target[0].value = ''
    
  }

  return (
    <>
      {/* {
        sender === undefined && navigate('/')
      } */}
      <div className={styles.display}>
        <div className={styles.reciever}>
          <div className={styles.name}>{receiver}</div>
          <hr />
          <ScrollToBottom className={styles.chats}>{rmsg.map((msg) => (
              <div className={styles.r}>{msg}</div>
            ))}</ScrollToBottom>
        </div>
        <div className={styles.sender}>
          <div className={styles.name}>{sender} (YOU)</div>
          <hr />
          <ScrollToBottom className={styles.chats}>
            {smsg.map((msg) => (
              <div className={styles.s}>{msg}</div>
            ))}
          </ScrollToBottom>
            
        </div>
      </div>
      <div className={styles.sendmsg}>
        <form className={styles.msg} onSubmit={(e) => sendMsg(e)}>
          {/* <div>Send a Message here</div> */}
            <input type="text" className={styles.msgbox}/>
            <input type="submit" value="=>" className={styles.send}/>
        </form>
      </div>
    </>
  );
};

export default Chat;
