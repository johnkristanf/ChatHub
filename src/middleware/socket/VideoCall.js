"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallSocket = void 0;
const VideoCallSocket = (io) => {
    try {
        io.on('connection', async (socket) => {
            socket.on('video-call', (ROOM_ID, UserID) => {
                socket.join(ROOM_ID);
                const roomSocket = socket.to(ROOM_ID);
                roomSocket.emit('user-connected', UserID);
                socket.on('disconnect', () => {
                    socket.to(ROOM_ID).emit('user-disconnected', UserID);
                });
            });
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.VideoCallSocket = VideoCallSocket;
//# sourceMappingURL=VideoCall.js.map