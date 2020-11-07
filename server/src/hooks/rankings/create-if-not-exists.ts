// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {RankingData} from '../../services/rankings/rankings.class';
import {UserData} from '../../services/users/users.class';
import {Conflict} from "@feathersjs/errors";

// create the rank if it's unexistant
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        try {
            await context.app.service('rankings').get(context.id, {
                user: context.params.user
            });
        } catch (err) {
            await context.app.service('rankings').create(context.data, {
                user: context.params.user
            });
        }

        return context;
    };
};
