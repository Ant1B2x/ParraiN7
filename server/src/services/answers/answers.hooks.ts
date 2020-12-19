import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodson from '../../hooks/check-godson';
import setGodson from '../../hooks/answers/set-godson';
import checkExistingQuestion from '../../hooks/answers/check-existing-question';
import keepAnswerForeignIds from '../../hooks/answers/keep-answer-foreign-ids';
import checkModifyingAnswer from '../../hooks/answers/check-modifying-answer';
import checkExpirationDate from '../../hooks/check-expiration-date';
import checkValidatedEmail from '../../hooks/check-validated-email';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [authenticate('jwt'), checkValidatedEmail()],
        find: [],
        get: [],
        create: [checkExpirationDate(), checkGodson(), checkExistingQuestion(), setGodson()],
        update: [checkExpirationDate(), checkGodson(), checkModifyingAnswer(), keepAnswerForeignIds()],
        patch: [checkExpirationDate(), checkGodson(), checkModifyingAnswer(), keepAnswerForeignIds()],
        remove: [checkExpirationDate(), checkGodson(), checkModifyingAnswer()]
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
