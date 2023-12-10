import mongoose from "mongoose";

export default () => {

    mongoose.connect('mongodb+srv://johnkristanf:jkgwapo123@cluster0.nfcnnwm.mongodb.net/ChatHub')
    .then(() => console.log('Connected to the Database!'))
    .catch((err) => console.log(err))

}


