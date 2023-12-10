const socket = io('http://localhost:3000/');


const VideoGrid = document.getElementById('video-grid');

const MyPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});


const peers = new Map();


const MyVideo = document.createElement('video');
MyVideo.muted = true;


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true

}).then(stream => {

    addVideoStream(MyVideo, stream);

    socket.on('user-connected', (UserID) => {
        console.log('user-connected', UserID)
        connectToNewUser( UserID, stream);
    });
    
});


socket.on('user-disconnected', UserID => {
    console.log('disconnected USer', UserID);

    if(peers.get(UserID)) peers.get(UserID).close();
})


MyPeer.on('open', (id) => {
    socket.emit('video-call', ROOM_ID, id);

})

const connectToNewUser = ( UserID, stream) => {
    const call = MyPeer.call(UserID, stream);

    const video = document.createElement('video');

    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
    });

    call.on('close', () => {
        video.remove();
    });

    peers.set(UserID, call);

   
}


const addVideoStream = (video, stream) => {

    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });

    VideoGrid.append(video);

}