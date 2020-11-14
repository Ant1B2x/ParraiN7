
import io from 'socket.io-client';

const BACKEND_DICT: { [mode: string]: string } = {
    default: 'localhost:3030',
    production: 'https://parrain7.ant1b2x.com'
};

let socket: SocketIOClient.Socket;
let BACKEND_URL: string;

if (process.env.VUE_APP_MODE)
    BACKEND_URL = BACKEND_DICT[process.env.VUE_APP_MODE];
else
    BACKEND_URL = BACKEND_DICT['default'];

if (process.env.VUE_APP_MODE === 'production')
    socket = io(BACKEND_URL, { path: '/api/' } ); // add /api to socket if the mode is in production
else
    socket = io(BACKEND_URL);

export default socket;
