import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import checkRankRange from '../../hooks/rankings/check-rank-range';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    // godfathers-only features
    before: {
        all: [authenticate('jwt'), checkGodfather()],
        find: [],
        get: [],
        create: [checkRankRange()],
        update: [checkRankRange()],
        patch: [checkRankRange()],
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
