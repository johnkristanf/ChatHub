function clearFormInputFields(form) {

    for (const element of form.elements) {

        if (element.type !== 'submit') {
            element.value = '';
        }
    }
}


const SignUp = async () => {

    try {
        const SignUpForm = document.querySelector('#SignUpForm');

        SignUpForm.addEventListener('submit', async (event) => {
            event.preventDefault();
           

            alertify.set('notifier','position', 'top-right');


            const formData = new FormData(SignUpForm);
           
            const fullname = formData.get('SignUpFullName');
            const username = formData.get('SignUpUsername');
            const email = formData.get('SignUpEmail');
            const password = formData.get('SignupPassword');
            const birthDay = formData.get('BirthDay');
            const female = formData.get('Female');
            const male = formData.get('Male');

            const UserData = {
                fullname: fullname,
                username: username,
                email: email,
                password: password,
                birthday: birthDay,
                gender: female || male

            }

            const response = await axios.post('/auth/signup', UserData);
            const { Success, Errors, SuccessMessage } = response.data

            if(Errors){
                alertify.error(Errors[0]).dismissOthers();
                console.log(Errors)
            }


            if(Success){
                alertify.success(SuccessMessage).dismissOthers();
                clearFormInputFields(SignUpForm);

            }



        })
        
    } catch (error) {
        console.error(error);
        throw error;
    }

}

SignUp();