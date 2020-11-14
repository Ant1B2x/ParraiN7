
import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';

import socket from '@/socket-config';

const app = feathers();
app.configure(socketio(socket));
app.configure(auth({
    storage: window.localStorage,
    storageKey: 'access-token',
    path: '/authentication'
}));

export default app;
