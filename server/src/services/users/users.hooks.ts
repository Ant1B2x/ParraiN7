import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;
const {hashPassword, protect} = local.hooks;

const institutionalEmailRegexp = RegExp('^.*@etu\.toulouse-inp\.fr');
function check_email(email : string) : void {
    if (!institutionalEmailRegexp.test(email))
        throw new Error('Email does not respect instutional email regexp');
}

/*function unset_admin(isAdmin : boolean) : void {
    isAdmin = false;
}*/

export default {
    before: {
        // all: [authenticate('jwt')], TODO : implement authentication
        all: [],
        find: [],
        get: [],
        create: [check_email('email'), hashPassword('password')],
        update: [hashPassword('password')],
        patch: [hashPassword('password')],
        remove: []
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            protect('password')
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
