
const Login = () => {

    try {
        const LoginForm = document.querySelector('#LoginForm');

        LoginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            alertify.set('notifier','position', 'top-right');

            const formData = new FormData(LoginForm);
           
            const username = formData.get('LoginUsername');
            const password = formData.get('LoginPassword');
            

            const UserData = {
                username: username,
                password: password,
              
            }

            const response = await axios.post('/auth/login', UserData);
            const { Errors, InvalidLoginCredentials, NeedVerification,  LoginSuccess} = response.data


            if(Errors){
                alertify.error(Errors[0]).dismissOthers();
            }

            if(InvalidLoginCredentials){
                alertify.error(InvalidLoginCredentials).dismissOthers();
        
            }
            

            if(NeedVerification){
                window.location.href = '/account/verify';

            }

            if(LoginSuccess){
                window.location.href = 'https://chathub-server-m2ol.onrender.com/account/messages';

            }


           


            



        });
        
    } catch (error) {
        console.error(error);
        throw error;
        
    }

}

Login();