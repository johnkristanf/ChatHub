const UserNameForm = document.querySelector('#UserNameForm');
const UserNameInput = document.querySelector('#UserNameInput');
const UpdateUserNameButton = document.querySelector('#UserNameFormSaveChanges');

UpdateUserNameButton.style.opacity = .75;

const defaultUserNameInputValue = UserNameInput.value;

UserNameInput.addEventListener("input", function () {
   

    if (UserNameInput.value !== defaultUserNameInputValue) {
        UpdateUserNameButton.removeAttribute("disabled");
        UpdateUserNameButton.style.opacity = 1;
        

    } else {
        UpdateUserNameButton.setAttribute("disabled", "disabled");
        UpdateUserNameButton.style.opacity = .75;
       

    }
});


UserNameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    alertify.set('notifier','position', 'top-right');

    const formdata = new FormData(UserNameForm);

    const username = formdata.get('UserName');

    const response = await axios.put('/update/username', { UpdatedUserName: username });
    const { UserNameUpdated } = response.data;


    if(UserNameUpdated) alertify.success(UserNameUpdated).dismissOthers();
    
    

})

