import {HookContext} from "@feathersjs/feathers";
import Knex from 'knex'
import app from "../../app";

// check that the godfather doesn't already gave the same rank to a godson
const checkUniqueRank = () => {
    return async (context : HookContext) => {
        const db: Knex = app.get('knexClient');
        const godfatherId: number = context.data['godfatherId'];
        const rank: number = context.data['rank'];
        const lines = db.from('rankings').select('godfatherId')
            .where({godfatherId : godfatherId}).andWhere({rank : rank});

        if (lines)
            throw Error('Godfather already voted for a godson with the same rank')


        return context;
    }
}

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
    all: [],
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
