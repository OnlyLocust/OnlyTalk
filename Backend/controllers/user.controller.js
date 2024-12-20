import user from "../models/user.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config()

const signup = async (req , res) => {
    const {username , password} = req.body;

    if(!username || !password){
        return res.status(400).json({message : 'Something is missing'})
    }


    const olduser = await user.find({username : username})
    
    if(olduser.length > 0){
        return res.status(400).json({message : "User name already exists"})
    }
    


    try {
        const hashpass = await bcrypt.hash(password , 10)
        const newUser = new user({username , password : hashpass})
        await newUser.save();
        jwt.sign({username , password} , process.env.SECREAT_KEY , { expiresIn: '1h' } )
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(400).json(error)
    }
    
}

const login = async (req , res) => {
    const {username , password} = req.body

    const existUser = await user.find({username : username})

    if(existUser.length != 1){
        return res.status(400).json({message : "User not exists"})
    }
    else{

        const match = await bcrypt.compare(password , existUser[0].password)
        if(match){
            jwt.sign({username , password} , process.env.SECREAT_KEY , { expiresIn: '1h' } )
            return res.status(200).json(existUser[0])
        }
        else{
            return res.status(400).json({message : "User not exists"})
        }
    }
}

const getUser = async (req, res) => {
    try {
        let users = await user.find()
        let usernames = []
        users.forEach(element => {
            usernames.push(element.username)
            
        });

        return res.status(200).json(usernames)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export {signup , login , getUser}