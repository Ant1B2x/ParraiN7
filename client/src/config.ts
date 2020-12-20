
export const institutionalEmailEnd = '@etu.toulouse-inp.fr';

const BACKEND_DICT: { [mode: string]: string } = {
    default: 'localhost:3030',
    production: 'https://api.ant1b2x.com'
};

let BACKEND_URL: string;
if (process.env.VUE_APP_MODE) {
    BACKEND_URL = BACKEND_DICT[process.env.VUE_APP_MODE];
} else {
    BACKEND_URL = BACKEND_DICT['default'];
}

export default BACKEND_URL;
