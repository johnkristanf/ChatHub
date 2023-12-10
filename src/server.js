"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const DataParser_1 = __importDefault(require("./middleware/DataParser"));
const static_1 = __importDefault(require("./middleware/static"));
const template_1 = __importDefault(require("./middleware/template"));
const view_routes_1 = __importDefault(require("./routes/view_routes"));
const auth_routes_1 = __importDefault(require("./routes/auth_routes"));
const search_routes_1 = __importDefault(require("./routes/search_routes"));
const recover_routes_1 = __importDefault(require("./routes/recover_routes"));
const profile_routes_1 = __importDefault(require("./routes/profile_routes"));
const messages_routes_1 = __importDefault(require("./routes/messages_routes"));
const call_routes_1 = __importDefault(require("./routes/call_routes"));
const FriendRequest_1 = require("./middleware/socket/FriendRequest");
const SendMessage_1 = require("./middleware/socket/SendMessage");
const VideoCall_1 = require("./middleware/socket/VideoCall");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// KANANG CORS ORIGIN MA GAMIT NMO NA PAG MAG DEPLOY NAKAS VERCEL 
// ORIGIN PASABOT ANA DOMAIN SA CLIENT SIDE KAY LAHI BAYAG DOMAIN ANG 
// CLIENT SIDE OG SERVER SA VERCEL DEPLOYMENT
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000/'
    }
});
// MIDDLWARES
(0, DataParser_1.default)(app, express_1.default, body_parser_1.default, cookie_parser_1.default);
(0, static_1.default)(app, express_1.default);
(0, template_1.default)(app);
// SOCKET
(0, FriendRequest_1.FriendRequestSocket)(io);
(0, SendMessage_1.SendMessage)(io);
(0, VideoCall_1.VideoCallSocket)(io);
// ROUTES
app.use(view_routes_1.default);
app.use(auth_routes_1.default);
app.use(search_routes_1.default);
app.use(recover_routes_1.default);
app.use(profile_routes_1.default);
app.use(messages_routes_1.default);
app.use(call_routes_1.default);
// SERVER PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server Port: http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map