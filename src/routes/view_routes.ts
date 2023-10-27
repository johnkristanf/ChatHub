import express from 'express';

import JWT from '../middleware/JWT';

const router = express.Router();


router.get('/', async (request: any, response) => {

    try {

        response.status(200).render('LandingPage/LandingPage');
        
    } catch (error) {
        console.error(error);request
        response.status(500).send('Error Displaying Html Content');
    }
    
});



router.get('/auth', async (request: any, response) => {

    try {

        response.status(200).render('Forms/Auth');
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Displaying Html Forms Content');
    }
    
});



router.get('/account/verify', JWT.ValidateVerificationToken, async (request: any, response) => {

    try {
        
        if(request.user.Authenticated()){
           response.status(200).render('Verify/VerifyForm');

        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Verifying User');
    }
    
});



router.get('/account/messages', JWT.ValidateToken, async (request: any, response) => {

    try {
        
        if(request.user.Authenticated()){

            response.status(200).render('MainPage/Messages/MessageContainer');

        }
       

       
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Retrieving User Profile');
    }
    
});


router.get('/account/connect', JWT.ValidateToken, async (request: any, response: any) => {
    
    try {

        if(request.user.Authenticated()){

            const { username, email } = request.user;
    
            const userData = {
                username: username,
                email: email,
            };
    
            response.status(200).render('MainPage/Friends/FriendsContainer', { userData });
        }

        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Retrieving User Profile');
    }
    

});



export default router;