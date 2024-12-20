import mongoose from "mongoose";

const connect = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log('Database connected');
    }
    catch(err){
        console.log(err);
    }
}

export default connect;