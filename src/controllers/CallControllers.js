"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCallUIController = exports.StartVideoCallController = void 0;
const uuid_1 = require("uuid");
const StartVideoCallController = (request, response) => {
    try {
        if (request.user.Authenticated()) {
            response.status(200).redirect(`/video/${(0, uuid_1.v4)()}`);
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Starting Video Call');
    }
};
exports.StartVideoCallController = StartVideoCallController;
const VideoCallUIController = (request, response) => {
    try {
        if (request.user.Authenticated()) {
            response.status(200).render('MainPage/Messages/partials/VideoCall', { roomID: request.params.room });
        }
    }
    catch (error) {
        console.error(error);
        response.status(500).send('Error Making Video Call UI');
    }
};
exports.VideoCallUIController = VideoCallUIController;
//# sourceMappingURL=CallControllers.js.map