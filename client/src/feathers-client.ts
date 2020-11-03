/* eslint @typescript-eslint/no-var-requires: "off" */

import BACKEND_URL from '@/config';
import io from 'socket.io-client';
const feathers = require('@feathersjs/client'); // bug in feathers-client module

const socket = io(BACKEND_URL);

const app = feathers();
app.configure(feathers.socketio(socket));
app.configure(feathers.authentication({
    //storageKey: 'auth'
    storage: window.localStorage
}));

export default app;
