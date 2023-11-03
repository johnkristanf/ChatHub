import { MessageModel } from "../../model/Messages";

export const SendMessage = (io: any) => {

        try {

            const userSockets = new Map();

            io.on('connection', async (socket: any)  => {

       
                socket.on('userOnline', (userId: string) => {
                    userSockets.set(userId, socket);

                });

            
                socket.on('SendMessage', async (RecieverId: string, SenderID: string, Message: string) => {
                        console.log('ReciverId:', RecieverId)
                        console.log('SenderID:', SenderID)
                        console.log('Message:', typeof Message)


                        const currentDate = new Date();

                        const formattedDate = currentDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                
                        });

                        const MessageData = [{
                            SenderID: SenderID,
                            ReciverID: RecieverId,
                            Message: Message,
                            timeStamp: formattedDate


                        }];


                        await MessageModel.insertMany({ MessagesInfo: MessageData })


                        const reciverSocket = userSockets.get(RecieverId);


                        if(reciverSocket){
                        
                            reciverSocket.emit('MessageRecived', SenderID, Message);


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

