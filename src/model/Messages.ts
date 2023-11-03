import dbConn from '../config/dbConn';

import { Schema, model } from 'mongoose';

dbConn();

const MessageSchema = new Schema({

    MessagesInfo: [{
        SenderID: String,
        ReciverID: String,

        Message: String,

        timeStamp: String
    }]


});


MessageSchema.index({
    _id: 1,
    Messages: 1

}, { name: "User Messages Index" });


export const MessageModel = model('Messages', MessageSchema);