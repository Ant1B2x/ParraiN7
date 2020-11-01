import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodson from '../../hooks/check-godson';
import setGodson from '../../hooks/answers/set-godson';
import checkExistingQuestion from '../../hooks/answers/check-existing-question';
import keepForeignIds from '../../hooks/answers/keep-foreign-ids';
import checkModifyingAnswer from '../../hooks/answers/check-modifying-answer';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [checkGodson(), checkExistingQuestion(), setGodson()],
        update: [checkGodson(), checkModifyingAnswer(), keepForeignIds()],
        patch: [checkGodson(), checkModifyingAnswer(), keepForeignIds()],
        remove: [checkGodson(), checkModifyingAnswer()]
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
