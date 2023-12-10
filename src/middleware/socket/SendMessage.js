"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessage = void 0;
const Messages_1 = require("../../model/Messages");
const Accounts_1 = require("../../model/Accounts");
const SendMessage = (io) => {
    try {
        const userSockets = new Map();
        io.on('connection', async (socket) => {
            socket.on('userOnline', async (userId) => {
                userSockets.set(userId, socket);
                const users = await Accounts_1.AccountModel.find({}).select('_id');
                const OnlineUsers = Array.from(userSockets.keys());
                const OfflineUser = users.filter(data => !OnlineUsers.includes(data._id.toString()));
                const isUserOnline = userSockets.has(userId);
                if (isUserOnline) {
                    await Accounts_1.AccountModel.findByIdAndUpdate(userId, { activity: 'Online' });
                }
                if (OfflineUser.length > 0) {
                    for (const data of OfflineUser) {
                        await Accounts_1.AccountModel.updateMany({ _id: data._id }, { activity: 'Offline' });
                    }
                }
            });
            socket.on('SendMessage', async (RecieverId, SenderID, Message) => {
                const currentDateAndTime = new Date();
                const MessageData = [{
                        SenderID: SenderID,
                        ReciverID: RecieverId,
                        Message: Message,
                        timeStamp: currentDateAndTime
                    }];
                const reciverSocket = userSockets.get(RecieverId);
                if (reciverSocket) {
                    await Messages_1.MessageModel.insertMany({ MessagesInfo: MessageData, MessageStatus: 'Read' });
                    const messages = await Messages_1.MessageModel.find({}).sort({ timeStamp: 1 });
                    reciverSocket.emit('MessageRecived', SenderID, messages, currentDateAndTime);
                }
                else {
                    await Messages_1.MessageModel.insertMany({ MessagesInfo: MessageData, MessageStatus: 'Unread' });
                }
            });
            socket.on('SendNotif', async (SenderID, RecieverId) => {
                try {
                    const reciverSocket = userSockets.get(RecieverId);
                    const NumberOfMessages = await Messages_1.MessageModel.find({
                        MessageStatus: 'Unread',
                        'MessagesInfo.0.ReciverID': RecieverId
                    }).count();
                    const SenderData = await Accounts_1.AccountModel.findById(SenderID).select('image fullname');
                    if (reciverSocket) {
                        reciverSocket.emit('Notify', SenderData, NumberOfMessages);
                    }
                    else {
                        console.log('Recipient is not online.');
                    }
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
            });
            socket.on('ReciverIsOnline', async (MessageId) => {
                try {
                    await Messages_1.MessageModel.findByIdAndUpdate(MessageId, { MessageStatus: 'Read' });
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
            });
            socket.on('disconnect', () => {
                for (const [key, value] of userSockets.entries()) {
                    if (value === socket) {
                        userSockets.delete(key);
                        break;
                    }
                }
            });
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.SendMessage = SendMessage;
//# sourceMappingURL=SendMessage.js.map