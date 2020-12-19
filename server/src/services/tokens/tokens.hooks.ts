import * as authentication from '@feathersjs/authentication';
import checkAdmin from '../../hooks/check-admin';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [checkAdmin()],
        update: [checkAdmin()],
        patch: [checkAdmin()],
        remove: []
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
