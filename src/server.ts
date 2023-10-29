import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import CookieParser from 'cookie-parser';
import { Server } from 'socket.io'; 

import DataParser from './middleware/DataParser';
import StaticFiles from './middleware/static';
import template from './middleware/template';


import view_routes from './routes/view_routes';
import auth_routes from './routes/auth_routes';
import search_routes from './routes/search_routes';
import recover_routes from './routes/recover_routes';
import profile_routes from './routes/profile_routes';

import { FriendRequestSocket } from './middleware/socket/FriendRequest';


const app = express();
const server = http.createServer(app);


// KANANG CORS ORIGIN MA GAMIT NMO NA PAG MAG DEPLOY NAKAS VERCEL 
// ORIGIN PASABOT ANA DOMAIN SA CLIENT SIDE KAY LAHI BAYAG DOMAIN ANG 
// CLIENT SIDE OG SERVER SA VERCEL DEPLOYMENT

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000/'
    }
});



// MIDDLWARES
DataParser(app, express, bodyParser, CookieParser);
StaticFiles(app, express);
template(app);


// SOCKET
FriendRequestSocket(io)


// ROUTES
app.use(view_routes);
app.use(auth_routes);
app.use(search_routes);
app.use(recover_routes);
app.use(profile_routes);



// SERVER PORT
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server Port: http://localhost:${PORT}`);
})