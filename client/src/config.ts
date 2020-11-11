
const BACKEND_DICT: { [mode: string]: string } = {
    default: 'localhost:3030',
    production: 'parrai-n-7-app.feathersjs.com'
};

let BACKEND_URL: string;
if (process.env.VUE_APP_MODE) {
    BACKEND_URL = BACKEND_DICT[process.env.VUE_APP_MODE];
} else {
    BACKEND_URL = BACKEND_DICT['default'];
}

export default BACKEND_URL;
