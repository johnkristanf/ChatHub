import mongoose from "mongoose";

export default () => {

    mongoose.connect('mongodb://127.0.0.1/ChatHub')
    .then(() => console.log('Connected to the Database!'))
    .catch((err) => console.log(err))

}


