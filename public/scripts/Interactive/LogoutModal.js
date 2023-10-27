
const Logout = () => {
    
    try {
        const SideBarLogout = document.querySelector('#Logout');
        const LogoutModal = document.querySelector('.LogoutModal');
        const CancelLogout = document.querySelector('#CancelLogout');

        SideBarLogout.addEventListener('click', () => {

            LogoutModal.classList.add('ShowLogOutModal');

        });

        CancelLogout.addEventListener('click', () => {
            LogoutModal.classList.remove('ShowLogOutModal');
        })
        
    } catch (error) {
        console.error(error);
        throw error;
        
    }
}

Logout();