import * as feathersAuthentication from '@feathersjs/authentication';
import checkGodfather from '../../hooks/check-godfather';
import setAuthor from '../../hooks/questions/set-author';
import checkExistingAuthor from '../../hooks/questions/check-existing-author';
import checkModifyingQuestion from '../../hooks/questions/check-modifying-question';
import showQuestionAuthor from '../../hooks/questions/show-question-author';
import showQuestionsAuthors from '../../hooks/questions/show-questions-authors';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

export default {
    before: {
        all: [],
        find: [],
        get: [],
        create: [authenticate('jwt'), checkGodfather(), setAuthor()],
        update: [authenticate('jwt'), checkGodfather(), checkModifyingQuestion(), checkExistingAuthor()],
        patch: [authenticate('jwt'), checkGodfather(), checkModifyingQuestion(), checkExistingAuthor()],
        remove: [authenticate('jwt'), checkGodfather(), checkModifyingQuestion()]
    },

    after: {
        all: [],
        find: [showQuestionsAuthors()],
        get: [showQuestionAuthor()],
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
