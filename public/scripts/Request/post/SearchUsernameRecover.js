
const SearchUserName = () => {

    try {
        const IndentifyForm = document.querySelector('.IndentifyForm');

        IndentifyForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            alertify.set('notifier','position', 'top-right');

            const formdata = new FormData(IndentifyForm);

             const username = formdata.get('RecoverUsername');

              const response = await axios.post('/searchRecover/username', { username: username });
              const { AccountExist, AccountDontExist } = response.data;
           
            
                if(AccountExist){
                    window.location.href = '/recover/code';
                    return;
                }

                if(AccountDontExist){
                    alertify.error(`No Search Results Your search did not 
                    return any results. 
                    Please try again with other information.`).dismissOthers();
                   
                }
        });
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

SearchUserName();