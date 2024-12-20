import express from 'express'
import { getUser, login, signup } from '../controllers/user.controller.js';
import auth from "../middlewares/auth.js"


const route = express.Router();

route.post('/signup' , signup);
route.post('/login' , login);
route.get('/getusers' , getUser)

export default route;