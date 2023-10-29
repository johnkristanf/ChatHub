const PasswordForm = document.querySelector('#PasswordForm');
const UpdatePasswordButton = document.querySelector('#PasswordFormSaveChanges');

UpdatePasswordButton.style.opacity = 0.75;

const CurrentPassword = document.querySelector('#CurrentPassword');
const NewPassword = document.querySelector('#NewPassword');

function updateButtonState() {

  if (CurrentPassword.value && NewPassword.value) {

    UpdatePasswordButton.removeAttribute("disabled");
    UpdatePasswordButton.style.opacity = 1;

  } else {

    UpdatePasswordButton.setAttribute("disabled", "disabled");
    UpdatePasswordButton.style.opacity = 0.75;

  }

}

CurrentPassword.addEventListener('input', updateButtonState);
NewPassword.addEventListener('input', updateButtonState);


PasswordForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  alertify.set('notifier', 'position', 'top-right');

    const formdata = new FormData(PasswordForm);

    const CurrentPasswordValue = formdata.get('CurrentPassword');
    const NewPasswordValue = formdata.get('NewPassword');

    const response = await axios.put('/update/password', {
      CurrentPassword: CurrentPasswordValue,
      NewPassword: NewPasswordValue

    });

    const { PasswordUpdated } = response.data;


    if (PasswordUpdated) alertify.success(PasswordUpdated).dismissOthers();

});


