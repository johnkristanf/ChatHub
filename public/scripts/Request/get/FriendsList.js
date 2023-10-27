
const getFriendsList = async () => {

    try {
        const response = await axios.get('/get/friendsID');
        const { listID } = response.data

        console.log(response.data);

        for(const data of listID){

            const getListResponse = await axios.post(`/get/friends/list`, { 
                friendIDArray: data.friends 
            });

            console.log(getListResponse.data)

        }

        
    } catch (error) {
        console.error(error);
        throw error;
    }
}

getFriendsList();