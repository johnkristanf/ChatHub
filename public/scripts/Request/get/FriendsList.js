
const getFriendsList = async () => {

    try {
        const response = await axios.get('/get/friendsID');
        const { listID } = response.data


        for(const data of listID){

            const getListResponse = await axios.post(`/get/friends/list`, { 
                friendIDArray: data.friends 
            });

            const { friendData } = getListResponse.data;

            RenderFriendListUI(friendData);

        }

        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

getFriendsList();



const RenderFriendListUI = (friendData) => {

    console.log('friendDatdfsdfa:', friendData)

    const FriendListContainer = document.querySelector('.FriendListContainer');

    const FriendList = document.createElement('div');
    FriendList.classList.add('FriendList');

    let html = ''
    
    for (const data of friendData) {

        console.log('data:', data)

        const SenderImage = data.image !== 'NoImgProvided' ? data.image : '/img/user_image.png';

        html += `

        <div class="htmlContainer">

            <h1><img src="${SenderImage}"></h1>

                <div class="SenderFullName">
                <h1>${data.fullname}</h1>
                </div>

                <div class="RequestBtn">
                    <button  style="display: flex; align-items: center; gap: 7px;" id = "MessageBtn"><i class="fa-solid fa-message"></i>Message</button>

                    <button  style="display: flex; align-items: center; gap: 7px;"  id = "UnfriendBtn"><i class="fa-solid fa-user-xmark"></i> Unfriend</button>
                </div>    
                     
        </div>`;


        FriendList.innerHTML = html;   
        FriendListContainer.appendChild(FriendList);

    

    }

    document.querySelector('.htmlContainer').addEventListener('click', () => {
        RenderAlreadyFriendProfile(friendData)
    })

   
   
}


