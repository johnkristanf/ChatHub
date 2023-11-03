
const getMessageList = async () => {

    try {
        const response = await axios.get('/get/friendsID');
        const { listID } = response.data


        for(const data of listID){

            const getListResponse = await axios.post(`/get/friends/list`, { 
                friendIDArray: data.friends 
            });

            const { friendData } = getListResponse.data;

            RenderMessageListUI(friendData);

        }

        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

getMessageList();




const RenderMessageListUI = (friendData) => {


    const ListsContainer = document.querySelector('.ListsContainer');

    const container = document.createElement('div');
    container.classList.add('container');


    let html = '';

    
    for (const data of friendData) {

      

        const Image = data.image !== 'NoImgProvided' ? `/img/userImages/${data.image}` : '/img/user_image.png';


        html += `

                <div class="Lists" onclick="SendMessage('${Image}', '${data.fullname}', '${data._id}')">

                    <img src="${Image}">

                    <div class="Name_LastChat">
                        <h1>${data.fullname}</h1>
                        <h1>Last Chat</h1>

                    </div>

                </div>`;
                

        container.innerHTML = html;        

    }

    
        ListsContainer.append(container);


        const firstChild = container.children[0];

        if(firstChild) firstChild.click();
                   

}