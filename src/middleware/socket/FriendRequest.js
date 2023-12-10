"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestSocket = void 0;
const Accounts_1 = require("../../model/Accounts");
const FriendRequestSocket = (io) => {
    try {
        const userSockets = new Map();
        io.on('connection', async (socket) => {
            socket.on('userConnected', (userId) => {
                userSockets.set(userId, socket);
            });
            socket.on('sendFriendRequest', async (data) => {
                const { senderId, recipientId } = data;
                const Recipient = await Accounts_1.AccountModel.findById(recipientId)
                    .select('image fullname friendRequests');
                if (Recipient) {
                    const SenderInfo = await Accounts_1.AccountModel.findById(senderId)
                        .select('friends image fullname friendRequests');
                    if (SenderInfo) {
                        if (AlreadySentFriendRequest(Recipient, socket, senderId, io)) {
                            return;
                        }
                        else {
                            const SenderData = {
                                senderId: senderId,
                                senderName: SenderInfo.fullname,
                                senderImage: SenderInfo.image,
                                UserAdded: recipientId
                            };
                            updateRecipientFriendRequestList(Recipient, SenderData, recipientId);
                            const recipientSocket = userSockets.get(recipientId);
                            if (recipientSocket) {
                                recipientSocket.emit('FriendRequestReceived', SenderData, recipientId);
                            }
                            else {
                                console.log('Recipient is not online');
                            }
                        }
                    }
                }
            });
            socket.on('AcceptFriendRequest', async (senderId, recipientId) => {
                try {
                    const sernderData = await Accounts_1.AccountModel.findById(senderId).select('friends');
                    const recipientData = await Accounts_1.AccountModel.findById(recipientId).select('friends friendRequests');
                    if (sernderData) {
                        for (const data of sernderData.friends) {
                            if (data === recipientId) {
                                const RecipientSocket = userSockets.get(recipientId);
                                RecipientSocket.emit('AlreadyFriend', { AlreadyFriend: true });
                                return;
                            }
                        }
                    }
                    if (recipientData) {
                        for (const data of recipientData.friends) {
                            if (data === recipientId) {
                                const RecipientSocket = userSockets.get(recipientId);
                                RecipientSocket.emit('AlreadyFriend', { AlreadyFriend: true });
                                return;
                            }
                        }
                    }
                    sernderData?.friends.push(recipientId);
                    await Accounts_1.AccountModel.findByIdAndUpdate(senderId, {
                        friends: sernderData?.friends
                    });
                    recipientData?.friends.push(senderId);
                    await Accounts_1.AccountModel.findByIdAndUpdate(recipientId, {
                        friends: recipientData?.friends,
                        friendRequests: recipientData?.friendRequests.filter(request => request.senderId !== senderId)
                    });
                    const SenderSocket = userSockets.get(senderId);
                    SenderSocket.emit('AcceptedRequestNotif', 'User Accepted');
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
            });
            socket.on("disconnecting", () => {
                for (const [userId, userSocket] of userSockets.entries()) {
                    if (userSocket === socket) {
                        userSockets.delete(userId);
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
exports.FriendRequestSocket = FriendRequestSocket;
const AlreadySentFriendRequest = (Recipient, socket, senderId, io) => {
    try {
        if (Recipient.friendRequests.length > 0) {
            if (Recipient.friendRequests[0].senderId === senderId) {
                socket.join(senderId);
                io.to(senderId).emit('AlreadySentFriendRequest', 'AlreadySentFriendRequest');
                return true;
            }
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
const updateRecipientFriendRequestList = async (Recipient, SenderDataObj, recipientId) => {
    try {
        const { senderId, senderName, senderImage } = SenderDataObj;
        Recipient.friendRequests.push({ senderId, senderName, senderImage, status: 'pending', UserAdded: recipientId });
        await Accounts_1.AccountModel.updateOne({ _id: recipientId }, {
            $set: {
                friendRequests: Recipient.friendRequests
            }
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
//# sourceMappingURL=FriendRequest.js.map