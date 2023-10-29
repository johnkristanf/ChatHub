
const Male = document.getElementById("Male");
const Female = document.getElementById("Female");
const UserBirthDay = document.getElementById('UserBirthDay');

Male.addEventListener("change", function () {

    if (Male.checked) {
      Female.checked = false;

    }

});

Female.addEventListener("change", function () {

    if (Female.checked) {
      Male.checked = false;

    }
});




const Bday_GenderForm = document.querySelector('#Bday-GenderForm');
const UpdateBday_GenderButton = document.querySelector('#Bday-GenderFormSaveChanges');

UpdateBday_GenderButton.style.opacity = .75;


const UpdateBday_GenderButtonState = () => {
   

    if ((Male.checked || Female.checked) && UserBirthDay.value) {
        UpdateBday_GenderButton.removeAttribute("disabled");
        UpdateBday_GenderButton.style.opacity = 1;
        

    } else {
        UpdateBday_GenderButton.setAttribute("disabled", "disabled");
        UpdateBday_GenderButton.style.opacity = .75;
       

    }

}



Male.addEventListener("change", UpdateBday_GenderButtonState);
Female.addEventListener("change", UpdateBday_GenderButtonState);
UserBirthDay.addEventListener("input", UpdateBday_GenderButtonState);




Bday_GenderForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    alertify.set('notifier','position', 'top-right');

            
        const formdata = new FormData(Bday_GenderForm);

        const male = formdata.get('GenderMale');
        const female = formdata.get('GenderFeMale');
        const birthday = formdata.get('UserBirthDay');

        const userData = {
            gender: male || female,
            birthday: birthday

        }


        const response = await axios.put('/update/bday_gender', userData);
        const { Bday_GenderUpdated } = response.data;


        if(Bday_GenderUpdated) alertify.success(Bday_GenderUpdated).dismissOthers();
    
    

});

