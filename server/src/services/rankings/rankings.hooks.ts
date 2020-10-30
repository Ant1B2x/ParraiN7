import * as feathersAuthentication from '@feathersjs/authentication';
import {HookContext} from "@feathersjs/feathers";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;

// check that a rank is between 1 and 5
const checkRankRange = () => {
    return async (context : HookContext) => {
        if (context.data['rank'] < 1 || context.data['rank'] > 5)
            throw new Error('Rank must be between 1 and 5');

        return context;
    }
}

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [checkRankRange()],
    update: [checkRankRange()],
    patch: [checkRankRange()],
    remove: []
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
