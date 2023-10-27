

const verifyCode = () => {

    try {

        const RecoveryCodeForm = document.querySelector('.RecoveryCodeForm');

        RecoveryCodeForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            alertify.set('notifier','position', 'top-right');
            
            const formdata = new FormData(RecoveryCodeForm);

            const code = formdata.get('RecoverCode');

            const response = await axios.post('/input/code', { recoverCode: code });
            const { validCode } = response.data;

            if(validCode){
                window.location.href = '/password/reset'
                return;
            }

            if(response.data === "Error Verifying Recovery Code"){

                alertify.error(`The Code you entered doesn’t match your code. Please try again.`)
                .dismissOthers();
               
            }

        });
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

verifyCode();