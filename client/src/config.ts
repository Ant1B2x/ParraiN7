
const BACKEND_DICT: { [mode: string]: string } = {
    default: 'localhost:3030',
    production: 'parrai-n-7-app.feathersjs.com'
};

const BACKEND_URL: string = BACKEND_DICT[ process.env.VUE_APP_MODE ] || BACKEND_DICT['default'];

export default BACKEND_URL;
