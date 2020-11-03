// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {RankingData} from '../../services/rankings/rankings.class';
import {UserData} from '../../services/users/users.class';

// check that the provided rank is not redundant (a godfather shouldn't give the same rank to 2 godsons)
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const rank: number = context.data['rank'];
        if (rank) {
            const loggedUser: UserData = context.params.user;
            await context.app.service('ranks').find({
                query: {
                    godfatherId: loggedUser.id,
                    rank: rank
                }
            }).then((rankings: Array<RankingData>) => {
               if (rankings.length)
                   throw new Error(`User ${loggedUser.id} already gaved rank ${rank} to someone!`);
            });
        }

        return context;
    };
};
