// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {RankingData} from '../../services/rankings/rankings.class';
import {UserData} from '../../services/users/users.class';
import {NotAcceptable, NotFound} from "@feathersjs/errors";

// check if the provided godsonId exists or not in users table
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const ranking: RankingData = context.data;

        const users: Array<UserData> = await context.app.service('users').find({
            query: {
                id: ranking.godsonId
            }
        });
        if(!users.length)
            throw new NotFound(`There's no user of id ${ranking.godsonId}!`);

        const godson: UserData = await context.app.service('users').get(ranking.godsonId);
        if (godson.isGodfather)
            throw new NotAcceptable(`User of id ${godson.id} is godfather, not godson!`);

        return context;
    };
};
