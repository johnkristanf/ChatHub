
const getFriendsList = async () => {

    try {
        const response = await axios.get('/get/friendsID');
        const { listID } = response.data

        console.log(response.data);

        for(const data of listID){

            const getListResponse = await axios.post(`/get/friends/list`, { 
                friendIDArray: data.friends 
            });

            const { friendData } = getListResponse.data;

            console.log(getListResponse.data);

            RenderFriendListUI(friendData);

        }

        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

getFriendsList();



const RenderFriendListUI = (friendData) => {

    const FriendListContainer = document.querySelector('.FriendListContainer');

    const FriendList = document.createElement('div');
    FriendList.classList.add('FriendList');

    let html = ''
    
    for (const data of friendData) {

        const SenderImage = data.image !== 'NoImgProvided' ? data.image : '/img/user_image.png';

        html += `

        <div class="htmlContainer">

            <h1><img src="${SenderImage}"></h1>

                <div class="SenderFullName">
                <h1>${data.fullname}</h1>
                </div>

                <div class="RequestBtn">
                    <button id = "MessageBtn" >Message</button>
                </div>    
                     
        </div>`;

      

    }

    FriendList.innerHTML = html;   
    FriendListContainer.appendChild(FriendList);
}