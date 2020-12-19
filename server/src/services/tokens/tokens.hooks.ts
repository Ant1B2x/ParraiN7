import * as authentication from '@feathersjs/authentication';
import checkAdmin from '../../hooks/check-admin';
import tryToken from '../../hooks/tokens/try-token';
import checkTokenLength from '../../hooks/tokens/check-token-length';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = authentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [checkAdmin()],
        get: [checkAdmin()],
        create: [checkAdmin(), checkTokenLength()],
        update: [checkAdmin()],
        patch: [checkAdmin()],
        remove: [tryToken()]
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
