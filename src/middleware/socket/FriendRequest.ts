import { RequestTypeId } from '../../types/FriendRequestTypes';
import { AccountModel } from '../../model/Accounts';


export const FriendRequestSocket = (io: any) => {

try {

    const userSockets = new Map();

    io.on('connection', async (socket: any)  => {

       
        socket.on('userConnected', (userId: string) => {
            userSockets.set(userId, socket);
        });
            
        socket.on('sendFriendRequest', async (data: RequestTypeId) => {
    
            const { senderId, recipientId } = data;

            
                const Recipient = await AccountModel.findById(recipientId)
                .select('image fullname friendRequests');


                if(Recipient){

                    const SenderInfo = await AccountModel.findById(senderId)
                    .select('friends image fullname friendRequests');


                    if(SenderInfo) {

                        if(AlreadySentFriendRequest(Recipient, socket, senderId, io)){
                            return;

                        } else { 

                            const SenderData = {
                                senderId: senderId,
                                senderName:  SenderInfo.fullname,
                                senderImage: SenderInfo.image
                            }
    
                            updateRecipientFriendRequestList(Recipient, SenderData, recipientId);

    
                            const recipientSocket = userSockets.get(recipientId);
    
    
                            if (recipientSocket) {
                                recipientSocket.emit('FriendRequestReceived', SenderData, senderId);
    
                            } else {
                                console.log('Recipient is not online');
    
                            }

                        }
                    


                    } 

                   

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

          
} catch (error) {
    console.error(error);
    throw error
}

}


const AlreadySentFriendRequest = (Recipient: any, socket: any, senderId: string, io: any) => {

    try {

        
        if(Recipient.friendRequests.length > 0){

            if(Recipient.friendRequests[0].senderId === senderId){
                
                socket.join(senderId);
                io.to(senderId).emit('AlreadySentFriendRequest',  'AlreadySentFriendRequest');

                return true;
            }
           

        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

type SenderDataTypes = {
    senderId: string,
    senderName: string,
    senderImage: string,
}



const updateRecipientFriendRequestList = async (Recipient: any, SenderDataObj: SenderDataTypes, recipientId: string) => {

    try {

        const { senderId, senderName, senderImage } = SenderDataObj;

        Recipient.friendRequests.push({ senderId, senderName, senderImage, status: 'pending' });

                        
        await AccountModel.updateOne({ _id: recipientId }, 
            { 
                $set: { 
                    friendRequests: Recipient.friendRequests 
                } 

            }
        );

        
    } catch (error) {
        console.error(error);
        throw error;
    }

}