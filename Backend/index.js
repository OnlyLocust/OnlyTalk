import exprss from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import connect from './db.js';
import userRoute from './routes/user.routes.js'
import chatRoute from './routes/chat.routes.js'


dotenv.config();

const port = process.env.PORT || 9090

const app = exprss();
app.use(cors());
app.use(bodyParser.json());
app.use(exprss.json());
app.use(exprss.urlencoded({extended : true}));

connect()

app.use('/user' , userRoute)
app.use('/chats', chatRoute)

app.listen(port , () => {
    console.log("Server started :) ................. on " , port);
})