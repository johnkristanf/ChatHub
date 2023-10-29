
const ProfilePictureForm = document.querySelector('#ProfilePictureForm');
const UpdateProfilePictureButton = document.querySelector('#ProfilePictureFormSaveChanges');
const fileInput = document.getElementById('fileInput');

UpdateProfilePictureButton.style.opacity = 0.75;



fileInput.addEventListener('change', () => {

    if (fileInput.files.length > 0) {

        UpdateProfilePictureButton.removeAttribute("disabled");
        UpdateProfilePictureButton.style.opacity = 1;
    
    } else {
    
        UpdateProfilePictureButton.setAttribute("disabled", "disabled");
        UpdateProfilePictureButton.style.opacity = 0.75;
    
    }
    

})

  




ProfilePictureForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  alertify.set('notifier', 'position', 'top-right');


    console.log('fileInput.files:', fileInput.files[0])

    const formdata = new FormData();
    formdata.append('ProfilePicture', fileInput.files[0]);

    console.log('formdata:', formdata)
  
    const response = await axios.put('/update/profile_picture', formdata, 
        {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
        }
    );

    const { ProfilePictureUpdated } = response.data;


    if (ProfilePictureUpdated) alertify.success(ProfilePictureUpdated).dismissOthers();

});


