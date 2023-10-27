
const socket = io('http://localhost:3000/');

socket.on('connect', () => {
    console.log(`Connected with socket ID: ${socket.id}`);

});
   

const UserID = async () => {

    try {
        
        const response = await axios.get('/ActiveUserData');
        const { user_id } = response.data;

        return user_id
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const emitUserId = async () => {

    const userId = await UserID(); 
    socket.emit('userConnected', userId);


}

emitUserId();



const AddFriend = async (recipientId) => {

    try {

        const senderId = await UserID();

        socket.emit('sendFriendRequest', { senderId, recipientId });


        socket.on('AlreadySentFriendRequest', (message) => {
            console.log(message);

        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}



socket.on('FriendRequestReceived', async (SenderData, SenderId) => {

           
    if (SenderId && SenderData) {

        console.log('SENDER DATA FROM SERVER', SenderData)
       
        const storedsenderID = localStorage.getItem('senderIdArray');
        let SenderIdArray = [];

        if (storedsenderID) {
            
            SenderIdArray = JSON.parse(storedsenderID);
        }

       
        SenderIdArray.push(SenderId);

        
        localStorage.setItem('senderIdArray', JSON.stringify(SenderIdArray));

        RenderFriendRequestUI(SenderData);
    }

  

});


function RenderFriendRequestUI(data) {

    const FriendRequestContainer = document.querySelector('.FriendRequestContainer');
    const FriendRequest = document.createElement('div');
    FriendRequest.classList.add('FriendRequest');

    let html = ''

        const SenderImage = data.senderImage !== 'NoImgProvided' ? data.senderImage : '/img/user_image.png';

        html += `

        <div class="htmlContainer">

            <h1><img src="${SenderImage}"></h1>

                <div class="SenderFullName">
                <h1>${data.senderName}</h1>
                </div>

                <div class="RequestBtn">
                    <button id="ConfirmRequest">Confirm</button>
                    <button id="DeleteRequest">Delete</button>
                </div>    
                     
        </div>`;

      

    FriendRequest.innerHTML = html;   
    FriendRequestContainer.appendChild(FriendRequest);
    

    
   
}




document.addEventListener('DOMContentLoaded', async function() {

    try {
         
    const storedSenderId = localStorage.getItem('senderIdArray');

   
    if (storedSenderId) {
    
        const response = await axios.get(`/FriendRequestList/${storedSenderId}`);
        const { SenderData } = response.data;

        console.log('SenderData from axios', SenderData)

       
        const FriendRequestContainer = document.querySelector('.FriendRequestContainer');
        const FriendRequest = document.createElement('div');
        FriendRequest.classList.add('FriendRequest');

        RenderFriendRequestList(SenderData, FriendRequest, FriendRequestContainer)
        

    }
    
    } catch (error) {
        console.error(error);
        throw error
        
    }
   

});


const RenderFriendRequestList = (SenderData, FriendRequest, FriendRequestContainer) => {

    console.log('SenderData sa RenderRequest:', SenderData)

    let html = ''
    
    for (const data of SenderData) {

        const SenderImage = data.image !== 'NoImgProvided' ? data.image : '/img/user_image.png';

        html += `

        <div class="htmlContainer">

            <h1><img src="${SenderImage}"></h1>

                <div class="SenderFullName">
                <h1>${data.fullname}</h1>
                </div>

                <div class="RequestBtn">
                    <button onclick="AcceptFriendRequest('${data._id}', '${data.UserAdded}')" id="ConfirmRequest">Confirm</button>
                    <button id="DeleteRequest">Delete</button>
                </div>    
                     
        </div>`;

      

    }

    FriendRequest.innerHTML = html;   
    FriendRequestContainer.appendChild(FriendRequest);
}



const AcceptFriendRequest = async (senderId, recipientId) => {

    try {

        console.log(senderId);
        console.log(recipientId);

        

        socket.emit('AcceptFriendRequest', senderId, recipientId);

        socket.on('AcceptedRequestNotif', (message) => {
            console.log(message)
        })

        
    } catch (error) {
        console.error(error);
        throw error;
    }

}



   


