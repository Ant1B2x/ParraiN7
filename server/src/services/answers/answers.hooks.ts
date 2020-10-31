import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodson from '../../hooks/check-godson';
import setUser from '../../hooks/answers/set-user';
import checkExistingQuestion from '../../hooks/answers/check-existing-question'
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [checkGodson(), setUser(), checkExistingQuestion()],
        update: [checkGodson()],
        patch: [checkGodson()],
        remove: [checkGodson()]
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
