
const GetQrCode = async () => {

    try {
        let qrCodeContainer = document.querySelector('#qrCodeContainer');

        const response = await axios.get('/auth/qrcode');
        console.log(response);

        if(response){
            qrCodeContainer.src = response.data.qrCode;
        }
        
    } catch (error) {
        console.error(error);
        throw error;
        
    }

}

GetQrCode();