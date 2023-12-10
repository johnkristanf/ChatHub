

export const VideoCallSocket = (io: any) => {

    try {


        io.on('connection', async (socket: any)  => {
        
            socket.on('video-call', (ROOM_ID: string, UserID: string) => {

                socket.join(ROOM_ID);

                const roomSocket = socket.to(ROOM_ID);
                roomSocket.emit('user-connected', UserID);


                socket.on('disconnect', () => {
                    socket.to(ROOM_ID).emit('user-disconnected', UserID);
                })

            })


        });

          
    } catch (error) {
        console.error(error);
        throw error
    }

}


