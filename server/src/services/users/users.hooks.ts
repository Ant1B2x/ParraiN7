import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import checkEmail from '../../hooks/users/check-email';
import unsetAdmin from '../../hooks/users/unset-admin';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;
const {hashPassword, protect} = local.hooks;

export default {
    before: {
        all: [],
        find: [authenticate('jwt')],
        get: [authenticate('jwt')],
        create: [checkEmail(), unsetAdmin(), hashPassword('password')],
        update: [authenticate('jwt'), hashPassword('password')],
        patch: [authenticate('jwt'), hashPassword('password')],
        remove: [authenticate('jwt')]
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
