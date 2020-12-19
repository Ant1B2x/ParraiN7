import * as authentication from '@feathersjs/authentication';
import checkAdmin from '../../hooks/check-admin';
import checkToken from '../../hooks/tokens/check-token';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [checkAdmin()],
        get: [checkAdmin()],
        create: [checkAdmin()],
        update: [checkAdmin()],
        patch: [checkAdmin()],
        remove: [checkToken()]
    },

    after: {
        all: [],
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
