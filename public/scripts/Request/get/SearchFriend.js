

const SearchFriend = () => {

  try {

    const SearchFriendsForm = document.querySelector('#SearchFriendsForm');
    const SearchListContainer = document.querySelector('.SearchListContainer');
    let noSearchResultMessage = null;

    SearchFriendsForm.addEventListener('submit', async (event) => {

      event.preventDefault();

      const formData = new FormData(SearchFriendsForm);
      const fullname = formData.get('SearchFullname');


      const response = await axios.get(`/search/friend/${fullname}`);
      const { searchResponseData } = response.data;

      console.log('searchResponseData:', searchResponseData)

      

      if(SearchResponseUndefined(searchResponseData, SearchListContainer, SearchFriendsForm)){
        return;

      } else {

        if(noSearchResultMessage) {

            noSearchResultMessage.remove();
            noSearchResultMessage = null;
 
        }
 
    
        RenderUserProfile(searchResponseData, SearchListContainer,SearchFriendsForm);
      
      }


    });


  } catch (error) {
    console.error(error);
    throw error;

  }


};

SearchFriend();


const SearchResponseUndefined = (searchResponseData, SearchListContainer, SearchFriendsForm) => {

  if (searchResponseData === 'Undefined') {

    noSearchResultMessage = document.createElement('h1');
    noSearchResultMessage.textContent = 'No Results Found';

   
    while (SearchListContainer.firstChild) {
      SearchListContainer.removeChild(SearchListContainer.firstChild);

    }

    SearchFriendsForm.appendChild(noSearchResultMessage);

    if(SearchFriendsForm.children.length === 3){
      const removedEntry = SearchFriendsForm.children[1];
      SearchFriendsForm.removeChild(removedEntry);
      
    }

    return true;

  }

}


const RenderUserProfile = (searchResponseData, SearchListContainer, SearchFriendsForm) => {


  for (const display of searchResponseData) {

       
    const searchListItem = document.createElement('div');
    searchListItem.classList.add('SearchList');


    searchListItem.onclick = async function () {
      await GetFriendProfile(display._id);

    };



    const image = display.image !== 'NoImgProvided' ? `/img/userImages/${display.image}` : '/img/user_image.png';

    searchListItem.innerHTML = `
      <img src="${image}">

      <div class="NamesData">
        <h1>${display.fullname}</h1>
        <h1>${display.email}</h1>
        
      </div> `;

    SearchListContainer.appendChild(searchListItem);
    

    if (SearchListContainer.children.length === 3) {
      const removedEntry = SearchListContainer.children[0];
      SearchListContainer.removeChild(removedEntry);

    }


    const h1Element = SearchFriendsForm.querySelector("h1");

      if (h1Element) {
          h1Element.remove();
      }

  }

}
