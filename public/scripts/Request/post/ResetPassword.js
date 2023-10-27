
const ResetPassword = () => {

    try {
        const NewPasswordForm = document.querySelector('.NewPasswordForm');

        NewPasswordForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            alertify.set('notifier','position', 'top-right');
            
            const formdata = new FormData(NewPasswordForm);

            const newPassword = formdata.get('NewPassword');

            const response = await axios.post('/password/reset', { newPassword: newPassword });
            const { PaswordResetSuccessfully, Errors } = response.data;

            console.log(response.data)

            if(Errors){
                alertify.error(Errors[0]).dismissOthers();
            }

            if(PaswordResetSuccessfully){
                window.location.href = '/auth';
            }


        })
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

ResetPassword();