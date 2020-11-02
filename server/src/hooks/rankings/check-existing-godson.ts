// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {RankingData} from '../../services/rankings/rankings.class';
import {UserData} from '../../services/users/users.class';

// check if the provided godsonId exists or not in users table
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const ranking: RankingData = context.data;
        await context.app.service('users').find({
            query: {
                id: ranking.godsonId
            }
        }).then((users: Array<UserData>) => {
            if(!users.length)
                throw new Error(`There's no user of id ${ranking.godsonId}!`);
        });

        const godson: UserData = context.app.service('users').get(ranking.godsonId);
        if (godson.isGodfather)
            throw new Error(`User of id ${godson.id} is godfather, not godson!`);

        return context;
    };
};
