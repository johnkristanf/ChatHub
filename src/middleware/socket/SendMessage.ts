import { RequestTypeId } from '../../types/FriendRequestTypes';
import { AccountModel } from '../../model/Accounts';


export const SendMessage = (io: any) => {

        try {

            const userSockets = new Map();

            io.on('connection', async (socket: any)  => {

       
                socket.on('userOnline', (userId: string) => {
                    userSockets.set(userId, socket);

                });

            
                socket.on('SendMessage', async (ReciverId: string, SenderID: string, messageInput: string) => {
                        console.log('ReciverId:', ReciverId)
                        console.log('SenderID:', SenderID)
                        console.log('Message:', messageInput)


                        

                    const reciverSocket = userSockets.get(ReciverId);


                    if(reciverSocket){
                        
                        reciverSocket.emit('MessageRecived', SenderID, messageInput);


                    } else {
                        
                        console.log('Recipient is not online.');
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

          
        } catch (error) {
             console.error(error);
            throw error
        }

}

