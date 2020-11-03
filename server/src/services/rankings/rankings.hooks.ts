import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import checkRankRange from '../../hooks/rankings/check-rank-range';
import checkExistingGodson from '../../hooks/rankings/check-existing-godson';
import checkModifyingRanking from '../../hooks/rankings/check-modifying-ranking';
import setGodfather from '../../hooks/rankings/set-godfather';
import keepRankingForeignIds from '../../hooks/rankings/keep-ranking-foreign-ids';
import checkNonRedundantRank from '../../hooks/rankings/check-non-redundant-rank';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    // godfathers-only features
    before: {
        all: [authenticate('jwt'), checkGodfather()],
        find: [],
        get: [],
        create: [checkExistingGodson(), checkRankRange(), checkNonRedundantRank(), setGodfather()],
        update: [checkModifyingRanking(), checkRankRange(), checkNonRedundantRank(), keepRankingForeignIds()],
        patch: [checkModifyingRanking(), checkRankRange(), checkNonRedundantRank(), keepRankingForeignIds()],
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
