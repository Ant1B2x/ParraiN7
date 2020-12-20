import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import setAuthor from '../../hooks/questions/set-author';
import checkExistingAuthor from '../../hooks/questions/check-existing-author';
import checkModifyingQuestion from '../../hooks/questions/check-modifying-question';
import checkExpirationDate from '../../hooks/check-expiration-date';
import checkContentNotNull from '../../hooks/questions/check-content-not-null';
import keepQuestionForeignIds from "../../hooks/questions/keep-question-foreign-ids";
import checkValidatedEmail from '../../hooks/check-validated-email';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [checkExpirationDate(), authenticate('jwt'), checkValidatedEmail(), checkContentNotNull(), checkGodfather(), setAuthor()],
        update: [checkExpirationDate(), authenticate('jwt'), checkValidatedEmail(), checkContentNotNull(), checkGodfather(), checkModifyingQuestion(), checkExistingAuthor(), keepQuestionForeignIds()],
        patch: [checkExpirationDate(), authenticate('jwt'), checkValidatedEmail(), checkContentNotNull(), checkGodfather(), checkModifyingQuestion(), checkExistingAuthor(), keepQuestionForeignIds()],
        remove: [checkExpirationDate(), authenticate('jwt'), checkValidatedEmail(), checkGodfather(), checkModifyingQuestion()]
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
