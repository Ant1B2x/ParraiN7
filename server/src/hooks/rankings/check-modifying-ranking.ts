// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {RankingData} from '../../services/rankings/rankings.class';

// check that a ranking can only be modified by its godfather
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const ranking: RankingData = context.app.service('rankings').get(context.id);
        const loggedUser: UserData = context.params.user;
        if (ranking.godfatherId !== loggedUser.id)
            throw new Error(`User ${loggedUser.email} can't modify ranking ${ranking.id}!`);

        return context;
    };
};
