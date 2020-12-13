import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import setAuthor from '../../hooks/questions/set-author';
import checkExistingAuthor from '../../hooks/questions/check-existing-author';
import checkModifyingQuestion from '../../hooks/questions/check-modifying-question';
import checkExpirationDate from '../../hooks/check-expiration-date';
import checkContentNotNull from '../../hooks/questions/check-content-not-null';
import keepQuestionForeignIds from "../../hooks/questions/keep-question-foreign-ids";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [checkExpirationDate()],
        find: [],
        get: [],
        create: [checkContentNotNull(), authenticate('jwt'), checkGodfather(), setAuthor()],
        update: [checkContentNotNull(), authenticate('jwt'), checkGodfather(), checkModifyingQuestion(), checkExistingAuthor(), keepQuestionForeignIds()],
        patch: [checkContentNotNull(), authenticate('jwt'), checkGodfather(), checkModifyingQuestion(), checkExistingAuthor(), keepQuestionForeignIds()],
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
