
const socket = io('http://localhost:3000/');


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



const emitOnlineUserId = async () => {

    const userId = await UserID(); 
    socket.emit('userOnline', userId);

}

emitOnlineUserId();



const SendMessageNavbarDiv = (ReciverImage, RecieverFullName) => {

    const MessagesNavbar = document.createElement('div');
    MessagesNavbar.classList.add('MessagesNavbar');
    
        let SendMessageNavUI = `  

            <div class="UserDetails">
                <img src="${ReciverImage}">

                <div class="Name_Online">
                    <h4>${RecieverFullName}</h4>        
                    <h4>Online</h4>
                </div>
        

            </div>
    

                <div class="NavIcons">

                      <i class="fa-solid fa-phone" id="Call"></i>
                      <i class="fa-solid fa-video" id="VideoCall"></i>
                      <i class="fa-solid fa-circle-info" id="ChatInfo"></i>

                </div>`;


        MessagesNavbar.innerHTML = SendMessageNavUI;

        return MessagesNavbar;

}


const SendMessageBodyDiv = () => {

    const sendMessageBodyDiv = document.createElement("div");
    sendMessageBodyDiv.classList.add("SendMessageBody");

    const ReciverMessageContainer = document.createElement("div");
    ReciverMessageContainer.classList.add("ReciverMessageContainer");

    const SenderMessageContainer = document.createElement("div");
    SenderMessageContainer.classList.add("SenderMessageContainer");


    sendMessageBodyDiv.appendChild(ReciverMessageContainer);
    sendMessageBodyDiv.appendChild(SenderMessageContainer);

    return sendMessageBodyDiv;


}


const MessageForm = () => {
 
    const MessageFormInput = document.createElement('form');
    MessageFormInput.action = '#';
    MessageFormInput.method = 'POST';
    MessageFormInput.id = 'MessageFormInput';
    
    let html = '';

    html += ` 
            <input type="text" id="messageInput" name="Message" placeholder="Type your message...">

                <div class="MessageFormActions">

                    <div class="emoji-picker" id="emoji-picker"><i class="fa-solid fa-face-smile"></i></div>

                    <button type="submit"><i class="fa-solid fa-location-arrow"></i></button>

                </div>`;

    MessageFormInput.innerHTML = html;

    return MessageFormInput;



}



const SenderMessageContainer = (message) => {

    const SenderMessageContainer = document.querySelector('.SenderMessageContainer');

    const SenderMessage = document.createElement('div');
    SenderMessage.classList.add('SenderMessage');

     
    SenderMessage.textContent = message;

    SenderMessageContainer.appendChild(SenderMessage);

}


const ReceiverMessageContainer = (message) => {

    const ReciverMessageContainer = document.querySelector('.ReciverMessageContainer');

    const ReciverMessage = document.createElement('div');
    ReciverMessage.classList.add('ReciverMessage');

    let html = ` 
            <h1>Time</h1>

            <p>${message}</p>`;


        ReciverMessage.innerHTML = html;
        ReciverMessageContainer.append(ReciverMessage);

}


const RenderMessageFromDB = async (FriendId) => {

    try {

        const user_id = await UserID();

        const response = await axios.get('/get/messages');

        const { messages } = response.data;


            for(const data of messages){

                const { MessagesInfo } = data;


                const message = MessagesInfo.find((data) => data.ReciverID === user_id || data.SenderID === user_id);

        
                console.log('Message data:', message);



                    if(message){

                      
                        if(FriendId === message.SenderID){

                            ReceiverMessageContainer(message.Message);
        
                        }
        

                        console.log('Receiver.ReciverID:', message.ReciverID);
                      

        
                        if(FriendId === message.ReciverID){
        
                            SenderMessageContainer(message.Message);
                        }

                    }

                    console.log('user_id', user_id)
               

            }


        
    } catch (error) {
        console.error(error);
        throw error;
    }

}






const SendMessage = (ReciverImage, RecieverFullName, RecieverId) => {
    
        console.log('ReciverId:', RecieverId)

        const Messages = document.querySelector('#Messages');

        const MessageUIcontainer = document.createElement('div');
        MessageUIcontainer.classList.add('MessageUIcontainer');

      

        const SendMessageNavbar = SendMessageNavbarDiv(ReciverImage, RecieverFullName);
        const SendMessageBody = SendMessageBodyDiv(); 
        const MessageFormInput = MessageForm();   


        MessageUIcontainer.appendChild(SendMessageNavbar);
        MessageUIcontainer.appendChild(SendMessageBody);
        MessageUIcontainer.appendChild(MessageFormInput);

            
        Messages.insertBefore(MessageUIcontainer, Messages.firstChild);


        removeOverflowingMessageBodyDiv(Messages);



        MessageFormInput.addEventListener('submit', async (e) => {
            e.preventDefault();

            const SenderID = await UserID(); 

            const formdata = new FormData(MessageFormInput);

            const Message = formdata.get('Message');

            SenderMessageContainer(Message);

            console.log('message:', Message)



            const SendMessageSuccess = socket.emit('SendMessage', RecieverId, SenderID, Message);

            if(SendMessageSuccess) MessageFormInput.reset(); 


        });

        RenderMessageFromDB(RecieverId);
           
}


const removeOverflowingMessageBodyDiv = (Messages) => {

    if(Messages.childElementCount === 2){

        const childToRemove = Messages.children[1];

        Messages.removeChild(childToRemove);
    }
    
}




socket.on('MessageRecived', (SenderID, messageInput) => {

    ReceiverMessageContainer(messageInput);


});




