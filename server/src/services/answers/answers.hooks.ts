import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodson from '../../hooks/check-godson';
import setGodson from '../../hooks/answers/set-godson';
import checkExistingQuestion from '../../hooks/answers/check-existing-question';
import keepAnswerForeignIds from '../../hooks/answers/keep-answer-foreign-ids';
import checkModifyingAnswer from '../../hooks/answers/check-modifying-answer';
import showAnswerForeigns from '../../hooks/answers/show-answer-foreigns';
import showAnswersForeigns from '../../hooks/answers/show-answers-foreigns';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt')],
        find: [],
        get: [],
        create: [checkGodson(), checkExistingQuestion(), setGodson()],
        update: [checkGodson(), checkModifyingAnswer(), keepAnswerForeignIds()],
        patch: [checkGodson(), checkModifyingAnswer(), keepAnswerForeignIds()],
        remove: [checkGodson(), checkModifyingAnswer()]
    },

    after: {
        all: [],
        find: [/*showAnswersForeigns()*/],
        get: [/*showAnswerForeigns()*/],
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
