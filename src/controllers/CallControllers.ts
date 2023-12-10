import { v4 as uuidv4 } from 'uuid';

export const StartVideoCallController = (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){


           response.status(200).redirect(`/video/${uuidv4()}`)


        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Starting Video Call');

    }

}

export const VideoCallUIController = (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){


           response.status(200).render('MainPage/Messages/partials/VideoCall', { roomID: request.params.room })


        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Making Video Call UI');

    }

}