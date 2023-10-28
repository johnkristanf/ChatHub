import Accounts from '../model/Accounts';
import { AccountModel } from '../model/Accounts';


export const SearchFriendController = async (request: any, response: any) => {

    try {

        if(request.user.Authenticated()){

            const { fullname } = request.params;

            const searchFriend = await Accounts.Search(fullname);

            if(searchFriend || searchFriend === undefined){

                response.status(200).send({
                  searchResponseData: searchFriend || 'Undefined'

                })

            }
                  
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Searching Friend')
        
    }
    
    
}


export const GetProfileController = async (request: any, response: any) => {

    
    try {

        if(request.user.Authenticated()){

            const { user_id } = request.params;

            const FriendProfile = await Accounts.Profile(user_id);

            if(FriendProfile){

                response.status(200).send({
                    FriendProfile: FriendProfile 

                })

            }
                  
        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Searching Friend')
        
    }
    
}


export const GetFriendRequestListController = async (request: any, response: any) => {

    try {
    
        if(request.user.Authenticated()){

            const { SenderId } = request.params;
            const SenderIdArrayMap: string[] = [];

            const SenderIdArray = JSON.parse(SenderId.split(','));

            const matchFriendRequest: any = await AccountModel.findById(request.user.id).select('friendRequests');


            if(matchFriendRequest){

                for(const data of matchFriendRequest.friendRequests){

                    const findMatchSenderId = SenderIdArray.find((senderId: string) => {
                        return senderId === data.senderId;
        
                    });

                    SenderIdArrayMap.push(findMatchSenderId);

                }
        
        
                    const requestData = await AccountModel.find({ _id: { $in: SenderIdArrayMap } })
                    .select('image fullname UserAdded');
        
            
                    if(requestData){
                        response.status(200).send({
                            SenderData: requestData
        
                        });
            
                    }   

            }
          

        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Getting FriendRequest Friend')
    }
    
}



export const GetFriendsListIDController = async (request: any, response: any) => {

    try {
    
        if(request.user.Authenticated()){

            const listID = await AccountModel.find({ _id: request.user.id }).select('friends');

            if(listID) response.status(200).send({
                listID: listID
            })



        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Getting Friends List')
    }
    
}



export const GetFriendsListController = async (request: any, response: any) => {

    try {
    
        if(request.user.Authenticated()){

            const { friendIDArray } = request.body;

            const friendData = await AccountModel.find({ _id: { $in: friendIDArray } })
            .select('image fullname email')

            if(friendData) response.status(200).send({
                friendData: friendData
            })



        }
        
    } catch (error) {
        console.error(error);
        response.status(500).send('Error Getting Friends List')
    }
    
}

