"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSenderNameController = exports.getMessagesController = void 0;
const Messages_1 = require("../model/Messages");
const Accounts_1 = require("../model/Accounts");
const redisConnfig_1 = require("../config/redisConnfig");
const getMessagesController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const messages = await Messages_1.MessageModel.find({}).sort({ timeStamp: 1 });
            await (0, redisConnfig_1.RedisSet)('messages', messages);
            const cachedMessages = await (0, redisConnfig_1.RedisGet)('messages');
            if (messages)
                response.status(200).send({ messages: cachedMessages });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error getting Messages');
    }
};
exports.getMessagesController = getMessagesController;
const getSenderNameController = async (request, response) => {
    try {
        if (request.user.Authenticated()) {
            const { SenderID } = request.params;
            const data = await Accounts_1.AccountModel.findOne({ _id: SenderID }).select('fullname');
            if (data)
                response.status(200).send({ senderName: data });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error getting Sender Data');
    }
};
exports.getSenderNameController = getSenderNameController;
//# sourceMappingURL=MessagesController.js.map