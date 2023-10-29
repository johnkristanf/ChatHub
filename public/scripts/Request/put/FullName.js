
const FullNameForm = document.querySelector('#FullNameForm');
const FullNameInput = document.querySelector('#FullNameInput');
const UpdateFullNameButton = document.querySelector('#FullNameFormSaveChanges');
UpdateFullNameButton.style.opacity = .75;

const defaultFullNameInputValue = FullNameInput.value;

FullNameInput.addEventListener("input", function () {
   

    if (FullNameInput.value !== defaultFullNameInputValue) {
        UpdateFullNameButton.removeAttribute("disabled");
        UpdateFullNameButton.style.opacity = 1;
        

    } else {
        UpdateFullNameButton.setAttribute("disabled", "disabled");
        UpdateFullNameButton.style.opacity = .75;
       

    }
});


FullNameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    alertify.set('notifier','position', 'top-right');

    const formdata = new FormData(FullNameForm);

    const fullname = formdata.get('FullName');

    const response = await axios.put('/update/fullname', { UpdatedFullName: fullname });
    const { FullNameUpdated } = response.data;


    if(FullNameUpdated) alertify.success(FullNameUpdated).dismissOthers();
    
    

})

