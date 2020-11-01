import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import setAuthor from '../../hooks/questions/set-author';
import checkModifyingQuestion from '../../hooks/questions/check-modifying-question';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [authenticate('jwt'), checkGodfather(), setAuthor()],
        update: [authenticate('jwt'), checkGodfather(), checkModifyingQuestion()],
        patch: [authenticate('jwt'), checkGodfather(), checkModifyingQuestion()],
        remove: [authenticate('jwt'), checkGodfather(), checkModifyingQuestion()]
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
