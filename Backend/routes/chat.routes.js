import express from 'express'
import { enterMessage, getChat } from '../controllers/chat.controller.js';
import auth from "../middlewares/auth.js"


const route = express.Router()

route.put('/:sender/:reciever'  ,enterMessage);

route.get('/:sender/:reciever' ,  getChat)

export default route;