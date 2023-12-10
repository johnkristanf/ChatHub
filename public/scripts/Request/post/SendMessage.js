
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



const SendMessageNavbarDiv = (ReciverImage, RecieverFullName, Activity) => {

    const MessagesNavbar = document.createElement('div');
    MessagesNavbar.classList.add('MessagesNavbar');
    
        let SendMessageNavUI = `  

            <div class="UserDetails">
                <img src="${ReciverImage}">

                <div class="Name_Online">
                    <h4>${RecieverFullName}</h4>        
                    <h4>${Activity}</h4>
                </div>
        

            </div>
    

                <div class="NavIcons">

                      <i class="fa-solid fa-phone" id="Call"></i>
                      <a href="/video/"><i class="fa-solid fa-video" id="VideoCall"></i></a>
                      <i class="fa-solid fa-circle-info" id="ChatInfo"></i>

                </div>`;


        MessagesNavbar.innerHTML = SendMessageNavUI;

        return MessagesNavbar;

}


const SendMessageBodyDiv = () => {

    const sendMessageBodyDiv = document.createElement("div");
    sendMessageBodyDiv.classList.add("SendMessageBody");

    sendMessageBodyDiv.scrollTop = sendMessageBodyDiv.scrollHeight

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

const formattedMessageDateAndTime = (timeStamp) => {


    const date = new Date(timeStamp);

    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, 
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;

}


const DynamicformattedMessageDateAndTime = () => {

    const date = new Date();

    const options = {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, 
    };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;

}





const SenderMessage = (message, timeStamp) => {

    const messageDate = formattedMessageDateAndTime(timeStamp)
    const SendMessageBody = document.querySelector('.SendMessageBody');


    const SenderMessageDiv = document.createElement('div');
    SenderMessageDiv.classList.add('SenderMessageDiv');


    const messageSent = document.createElement('p');
    messageSent.textContent = messageDate;


    SenderMessageDiv.append(message);
    SenderMessageDiv.append(messageSent); 
    SendMessageBody.append(SenderMessageDiv);

    if(SenderMessageDiv){

        if(message.length <= 40){

            SenderMessageDiv.style.width = "21%";
        }

        if(message.length >= 52){

            SenderMessageDiv.style.width = "45%";
        }


    }

    SendMessageBody.scrollTop = SendMessageBody.scrollHeight;
}


const RecieverMessage = (message, timeStamp) => {

    const messageDate = formattedMessageDateAndTime(timeStamp)

    const SendMessageBody = document.querySelector('.SendMessageBody');

    const RecieverMessageDiv = document.createElement('div');
    RecieverMessageDiv.classList.add('RecieverMessageDiv');

    const messageSent = document.createElement('p');
    messageSent.textContent = messageDate;


    RecieverMessageDiv.append(message);
    RecieverMessageDiv.append(messageSent); 
    SendMessageBody.append(RecieverMessageDiv);

    if(RecieverMessageDiv){

        if(message.length <= 19){
         
            RecieverMessageDiv.style.width = "21%";
        }

        if(message.length >= 52){
         
            RecieverMessageDiv.style.width = "40%";
        }


    }

    SendMessageBody.scrollTop = SendMessageBody.scrollHeight;

}

const NotifyUnreadMessages = async (messages) => {

    const user_id = await UserID();


    const unreadMessages = messages.filter((message) => message.MessageStatus === 'Unread');

    console.log('unreadMessages', unreadMessages)


    for(const data of unreadMessages){

        const { MessagesInfo } = data;


        const message = MessagesInfo.find((data) => data.ReciverID === user_id || data.SenderID === user_id);


        SendNotifToReciever(data.MessagesInfo[0].SenderID, data.MessagesInfo[0].ReciverID)
        ReciverIsOnline(data._id, data.MessagesInfo[0].ReciverID);

    }

}



const RenderMessageFromDB = async (FriendId) => {

    try {

        const user_id = await UserID();

        const response = await axios.get('/get/messages');

        const { messages } = response.data;

        NotifyUnreadMessages(messages);


            for(const data of messages){

                const { MessagesInfo } = data;

                
                const message = MessagesInfo.find((data) => data.ReciverID === user_id || data.SenderID === user_id);

                    if(message){

                       
                        if(FriendId === message.SenderID){
                            RecieverMessage(message.Message, message.timeStamp);


                        }                      

        
                        if(FriendId === message.ReciverID){
        
                            SenderMessage(message.Message, message.timeStamp);
                           

                        }

                    }
               

            }


        
    } catch (error) {
        console.error(error);
        throw error;
    }

}


const FetchFriendData = async (FriendID) => {

    const response = await axios.get(`/get/profile/${FriendID}`);
    const { FriendProfile } = response.data;

    return FriendProfile;


}


const RenderAlreadyFriendProfile = async (FriendID) => {

    const FriendProfile = await FetchFriendData(FriendID)
       

    const FriendsProfileContainer = document.querySelector('#ProfileContainer');

    const Profile = document.createElement('div');
    Profile.classList.add('Profile');


    for(const display of FriendProfile){

    const SenderImage = display.image !== 'NoImgProvided' ? `/img/userImages/${display.image}` : '/img/user_image.png';
    
    Profile.innerHTML = `

            <div class="ProfileHeader">
        
                <img src="${SenderImage}" style="width: 20%;" alt="">
                <h1 id="ProfileFullName">${display.fullname}</h1>
                <p>${display.username}</p>

                    <div class="social_media">
                         <i class="fa-brands fa-facebook"></i> 
                         <i class="fa-brands fa-x-twitter"></i>
                         <i class="fa-brands fa-google"></i>  
                    </div>


                    <button disabled id = "FriendTittle"><i class="fa-solid fa-user-check"></i> Friends </button>
                        
            </div>


                <div class="ProfileFooter">

                    <div class="ProfileInfo_container">

                        <ul>
                            <li>
                                <div class="Email">
                                   
                                    <h2>${display.email}</h2>
                                   
                                </div>

                            </li>

                            <li>
                                <div class="Birthday">
                                   
                                    <h2>${display.birthday}</h2>
                                    
                                </div>

                            </li>

                            <li>

                                <div class="Gender">
                                   
                                    <h2>${display.gender}</h2>
                                  
                                </div>
                
                            </li>

                        </ul>

                    </div>

                </div> `; 

    }

            FriendsProfileContainer.appendChild(Profile);


            if(FriendsProfileContainer.children.length === 2) {
                FriendsProfileContainer.removeChild(FriendsProfileContainer.children[0]);
            }
            
}





const SendMessage = (ReciverImage, RecieverFullName, RecieverId, Activity) => {
    
        const Messages = document.querySelector('#Messages');

        const MessageUIcontainer = document.createElement('div');
        MessageUIcontainer.classList.add('MessageUIcontainer');

      

        const SendMessageNavbar = SendMessageNavbarDiv(ReciverImage, RecieverFullName, Activity);
        const SendMessageBody = SendMessageBodyDiv(); 
        const MessageFormInput = MessageForm();   


        MessageUIcontainer.appendChild(SendMessageNavbar);
        MessageUIcontainer.appendChild(SendMessageBody);
        MessageUIcontainer.appendChild(MessageFormInput);

            
        Messages.insertBefore(MessageUIcontainer, Messages.firstChild);


        removeOverflowingMessageBodyDiv(Messages);
        RenderAlreadyFriendProfile(RecieverId)


        MessageFormInput.addEventListener('submit', async (e) => {
            e.preventDefault();

            const SenderID = await UserID(); 

            const formdata = new FormData(MessageFormInput);

            const Message = formdata.get('Message');


            SenderMessage(Message, DynamicformattedMessageDateAndTime());


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





socket.on('MessageRecived', async (SenderID, messages) => {

    const user_id = await UserID();


    for(const data of messages){

        const { MessagesInfo } = data;


        const message = MessagesInfo.find((data) => data.ReciverID === user_id || data.SenderID === user_id);

            if(message){

              
                if(SenderID === message.SenderID){
                    RecieverMessage(message.Message, message.timeStamp);

                }                      


                if(SenderID === message.ReciverID){

                    SenderMessage(message.Message, message.timeStamp);
                }

            }
       

    }

});


const SendNotifToReciever = (SenderID, RecieverId) => {

    socket.emit('SendNotif', SenderID, RecieverId);
    
}


socket.on('Notify', (SenderData, NumberOfMessages) => {

    console.log('SenderData', SenderData)

    const SenderImage = SenderData.image !== 'NoImgProvided' ? `/img/userImages/${SenderData.image}` : '/img/user_image.png';

    const ChatHubMessagesContainer = document.querySelector('.ChatHubMessagesContainer');
    const MessageNotify = document.createElement('div')
    MessageNotify.classList.add('MessageNotify');

   let html = '';


   html += `
            <div class="SenderName-NumMessages">
                <h1>${SenderData.fullname}</h1>
                <h1>${NumberOfMessages} new Messages</h1>
            </div>


            <div class="SenderImage">
                <img src="${SenderImage}" alt="">

            </div>`;


    MessageNotify.innerHTML = html;
    ChatHubMessagesContainer.append(MessageNotify);

    setTimeout(() => {
        MessageNotify.remove(); 
    }, 3000); 

});


const ReciverIsOnline = async (MessageId, RecieverId) => {

    console.log('MessageId', MessageId)
    console.log('RecieverId', RecieverId)


    if(RecieverId === await UserID()){
        socket.emit('ReciverIsOnline', MessageId)
    }
    
}




