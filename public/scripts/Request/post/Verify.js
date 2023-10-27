

const Verify = async () => {

    try {
        const VerifyForm = document.querySelector('.VerifyForm');

        VerifyForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(VerifyForm);

            const VerificationCode = formData.get('VerificationCode');

            const response = await axios.post('/account/verify', { VerificationCode: VerificationCode});

            if(response.data.VerifiedSuccess){
                window.location.href = '/account/messages';

            }

        })
        
    } catch (error) {
        console.error(error);
        throw error;
        
    }
}

Verify();