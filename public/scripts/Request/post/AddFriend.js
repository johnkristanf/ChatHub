
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



socket.on('FriendRequestReceived', async (SenderData) => {

           
    if (SenderData) {

        RenderFriendRequestUI(SenderData);
    }

  

});


function RenderFriendRequestUI(data) {

    console.log('data gikan sa socket io:', data)

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
                <button onclick="AcceptFriendRequest('${data.senderId}', '${data.UserAdded}')" id="ConfirmRequest">Confirm</button>
                <button id="DeleteRequest">Delete</button>
                </div>    
                     
        </div>`;

      

    FriendRequest.innerHTML = html;   
    FriendRequestContainer.appendChild(FriendRequest);
    

    
   
}




document.addEventListener('DOMContentLoaded', async function() {

    try {
    
        const response = await axios.get(`/get/FriendRequestList`);
        const { SenderData } = response.data;

        console.log('Mga nag Friend Request wa gi accept', SenderData)

       
        const FriendRequestContainer = document.querySelector('.FriendRequestContainer');
        const FriendRequest = document.createElement('div');
        FriendRequest.classList.add('FriendRequest');

        RenderFriendRequestList(SenderData, FriendRequest, FriendRequestContainer)
        
    
    } catch (error) {
        console.error(error);
        throw error
        
    }
   

});


const RenderFriendRequestList = (SenderData, FriendRequest, FriendRequestContainer) => {


    let html = ''
    
    for (const data of SenderData) {

        const SenderImage = data.senderImage !== 'NoImgProvided' ? data.senderImage : '/img/user_image.png';

        html += `

        <div class="htmlContainer">

            <h1><img src="${SenderImage}"></h1>

                <div class="SenderFullName">
                <h1>${data.senderName}</h1>
                </div>

                <div class="RequestBtn">
                    <button onclick="AcceptFriendRequest('${data.senderId}', '${data.UserAdded}')" id="ConfirmRequest">Confirm</button>
                    <button id="DeleteRequest">Delete</button>
                </div>    
                     
        </div>`;

      

    }

    FriendRequest.innerHTML = html;   
    FriendRequestContainer.appendChild(FriendRequest);
}



const AcceptFriendRequest = async (senderId, recipientId) => {

    try {

        socket.emit('AcceptFriendRequest', senderId, recipientId);
        
    } catch (error) {
        console.error(error);
        throw error;
    }

}


socket.on('AcceptedRequestNotif', (message) => {
    console.log(message)
})


socket.on('AlreadyFriend', (message) => {
    console.log(message)

})



   


