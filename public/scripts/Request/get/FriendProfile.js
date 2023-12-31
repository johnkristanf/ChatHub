const FriendsProfileContainer = document.querySelector('#FriendsProfileContainer');



const GetFriendProfile = async (user_id) => {

    try {

        const response = await axios.get(`/get/profile/${user_id}`);
        const { FriendProfile } = response.data;


        RenderProfileUI(FriendProfile, FriendsProfileContainer)

   
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}



const RenderProfileUI = async (FriendProfile, FriendsProfileContainer) => {

    console.log('FriendProfile:', FriendProfile)

    for(const display of FriendProfile){
        
        if(display._id === await UserID()){

            RenderSearchedOwnProfileUI(display);

            return;

        } 

        for(const data of display.friends){

            if(data === await UserID()){

                RenderAlreadyFriendProfile(display);

                return;
            }

        }

        RenderSearchedUserUI(display, FriendsProfileContainer)
           
        

    }

}


const RenderSearchedOwnProfileUI = (display) => {

    const Profile = document.createElement('div');
    Profile.classList.add('Profile');

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

                    <button disabled id = "OwnProfileTittle"><i class="fa-solid fa-user"></i> You </button>
                        
            </div>


                <div class="ProfileFooter">

                    <div class="ProfileInfo_container">

                        <ul>
                            <li>
                                <div class="Email">
                                    <h1>Email:</h1>
                                    <h2>${display.email}</h2>
                                    <i class="fa-solid fa-envelope"></i>
                                </div>

                            </li>

                            <li>
                                <div class="Birthday">
                                    <h1>Birthday:</h1>
                                    <h2>${display.birthday}</h2>
                                    <i class="fa-solid fa-calendar"></i>
                                </div>

                            </li>

                            <li>

                                <div class="Gender">
                                    <h1>Gender:</h1>
                                    <h2>${display.gender}</h2>
                                    <i class="fa-solid fa-mars-and-venus"></i>
                                </div>
                
                            </li>

                        </ul>

                    </div>

                </div> `; 


            FriendsProfileContainer.appendChild(Profile);


            if(FriendsProfileContainer.children.length === 2) {
                FriendsProfileContainer.removeChild(FriendsProfileContainer.children[0]);
            }


}



const RenderSearchedUserUI = (display, FriendsProfileContainer) => {

    const Profile = document.createElement('div');
    Profile.classList.add('Profile');

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


                        <button class="add_friend" onclick="AddFriend('${display._id}')" ><i class="fa-solid fa-user-plus"></i> Add Friend</button>
                        
            </div>


                <div class="ProfileFooter">

                    <div class="ProfileInfo_container">

                        <ul>
                            <li>
                                <div class="Email">
                                    <h1>Email:</h1>
                                    <h2>${display.email}</h2>
                                    <i class="fa-solid fa-envelope"></i>
                                </div>

                            </li>

                            <li>
                                <div class="Birthday">
                                    <h1>Birthday:</h1>
                                    <h2>${display.birthday}</h2>
                                    <i class="fa-solid fa-calendar"></i>
                                </div>

                            </li>

                            <li>

                                <div class="Gender">
                                    <h1>Gender:</h1>
                                    <h2>${display.gender}</h2>
                                    <i class="fa-solid fa-mars-and-venus"></i>
                                </div>
                
                            </li>

                        </ul>

                    </div>

                </div> `; 


            FriendsProfileContainer.appendChild(Profile);


            if(FriendsProfileContainer.children.length === 2) {
                FriendsProfileContainer.removeChild(FriendsProfileContainer.children[0]);
            }

}


const RenderAlreadyFriendProfile = (display) => {


    const Profile = document.createElement('div');
    Profile.classList.add('Profile');

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
                                    <h1>Email:</h1>
                                    <h2>${display.email}</h2>
                                    <i class="fa-solid fa-envelope"></i>
                                </div>

                            </li>

                            <li>
                                <div class="Birthday">
                                    <h1>Birthday:</h1>
                                    <h2>${display.birthday}</h2>
                                    <i class="fa-solid fa-calendar"></i>
                                </div>

                            </li>

                            <li>

                                <div class="Gender">
                                    <h1>Gender:</h1>
                                    <h2>${display.gender}</h2>
                                    <i class="fa-solid fa-mars-and-venus"></i>
                                </div>
                
                            </li>

                        </ul>

                    </div>

                </div> `; 


            FriendsProfileContainer.appendChild(Profile);



            if(FriendsProfileContainer.children.length === 2) {
                FriendsProfileContainer.removeChild(FriendsProfileContainer.children[0]);
            }

    

       
            
}






const RenderOwnProfileUI = async () => {

    const userID = await UserID();

    const response = await axios.get(`/get/profile/${userID}`);
    const { FriendProfile } = response.data;


    const Profile = document.createElement('div');
    Profile.classList.add('Profile');


    for(const display of FriendProfile) {

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
                    
                <button disabled id = "OwnProfileTittle"><i class="fa-solid fa-user"></i> You </button>
        </div>

          


            <div class="ProfileFooter">

                <div class="ProfileInfo_container">

                    <ul>
                        <li>
                            <div class="Email">
                                <h1>Email:</h1>
                                <h2>${display.email}</h2>
                                <i class="fa-solid fa-envelope"></i>
                            </div>

                        </li>

                        <li>
                            <div class="Birthday">
                                <h1>Birthday:</h1>
                                <h2>${display.birthday}</h2>
                                <i class="fa-solid fa-calendar"></i>
                            </div>

                        </li>

                        <li>

                            <div class="Gender">
                                <h1>Gender:</h1>
                                <h2>${display.gender}</h2>
                                <i class="fa-solid fa-mars-and-venus"></i>
                            </div>
            
                        </li>

                    </ul>

                </div>

            </div> `; 


        FriendsProfileContainer.appendChild(Profile);


    }
   
}

RenderOwnProfileUI()