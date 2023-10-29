
const EmailForm = document.querySelector('#EmailForm');
const EmailInput = document.querySelector('#EmailInput');
const UpdateEmailButton = document.querySelector('#EmailFormSaveChanges');

UpdateEmailButton.style.opacity = .75;

const defaultEmailInputValue = EmailInput.value;

EmailInput.addEventListener("input", function () {
   

    if (EmailInput.value !== defaultEmailInputValue) {
        UpdateEmailButton.removeAttribute("disabled");
        UpdateEmailButton.style.opacity = 1;
        

    } else {
        UpdateEmailButton.setAttribute("disabled", "disabled");
        UpdateEmailButton.style.opacity = .75;
       

    }
});


EmailForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    alertify.set('notifier','position', 'top-right');


    alertify.confirm('Update Email', 
        
        'If you update your email you will need to verify again on your next login', 
    
        async function(){ 
            
            const formdata = new FormData(EmailForm);

            const email = formdata.get('Email');

            const response = await axios.put('/update/email', { UpdatedEmail: email });
            const { EmailUpdated } = response.data;


            if(EmailUpdated) alertify.success(EmailUpdated).dismissOthers();

        }, 
    
        function(){ 
            alertify.error('Cancel')

        }
      
    );

    
    
    

})

