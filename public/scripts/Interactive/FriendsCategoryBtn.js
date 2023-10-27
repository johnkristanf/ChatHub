const SearchFriends = document.querySelector('.SearchFriends');
const Lists = document.querySelector('.Lists');
const FriendRequestContainer = document.querySelector('.FriendRequestContainer');
const SearchListContainer = document.querySelector('.SearchListContainer');

const FriendList_Btn = () => {
    
    SearchFriends.style.display = 'none';
    FriendRequestContainer.style.visibility = 'hidden';
    SearchListContainer.style.display = 'none';

    Lists.style.display = 'block';
}

const SearchFriends_Btn = () => {
   

    Lists.style.display = 'none';
    FriendRequestContainer.style.visibility = 'hidden';

    SearchListContainer.style.display = 'block';
    SearchFriends.style.display = 'block';
}

const FriendRequest_Btn = () => {

    SearchFriends.style.display = 'none';
    Lists.style.display = 'none';
    SearchListContainer.style.display = 'none';

    FriendRequestContainer.style.visibility = 'visible';
}


const button = document.querySelector('#FriendList_Btn');

const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
});


button.dispatchEvent(clickEvent);

const ActiveCategoryBtn = () => {

    const FriendCategoryBtn = document.querySelectorAll('.FriendCategoryBtn button');

    FriendCategoryBtn.forEach((button) => {

    button.addEventListener('click', function() {
   
        FriendCategoryBtn.forEach((btn) => btn.classList.remove('activeBtn'));
    
        button.classList.add('activeBtn');

    });

    });


    FriendCategoryBtn[0].classList.add('activeBtn');

}

ActiveCategoryBtn();    