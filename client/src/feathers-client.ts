
import BACKEND_URL from '@/config';
import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io(BACKEND_URL);
const app = feathers();
app.configure(socketio(socket));
app.configure(auth({
    storage: window.localStorage,
    storageKey: 'access-token',
    path: '/authentication'
}));

export default app;
