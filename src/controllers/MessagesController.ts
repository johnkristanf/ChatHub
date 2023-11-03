import { MessageModel } from "../model/Messages";


export const getMessagesController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){


            const messages = await MessageModel.find({});

            if(messages) response.status(200).send({ messages: messages });

        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error getting Messages');

    }

}