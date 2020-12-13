import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import checkRankRange from '../../hooks/rankings/check-rank-range';
import checkExistingGodson from '../../hooks/rankings/check-existing-godson';
import checkModifyingRanking from '../../hooks/rankings/check-modifying-ranking';
import setGodfather from '../../hooks/rankings/set-godfather';
import keepRankingForeignIds from '../../hooks/rankings/keep-ranking-foreign-ids';
import createIfNotExists from '../../hooks/rankings/create-if-not-exists';
import checkExpirationDate from '../../hooks/check-expiration-date';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    // godfathers-only features
    before: {
        all: [checkExpirationDate(), authenticate('jwt'), checkGodfather()],
        find: [],
        get: [],
        create: [checkExistingGodson(), checkRankRange(), setGodfather()],
        update: [createIfNotExists(), checkModifyingRanking(), checkRankRange(), keepRankingForeignIds()],
        patch: [createIfNotExists(), checkModifyingRanking(), checkRankRange(), keepRankingForeignIds()],
        remove: [checkModifyingRanking()]
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
