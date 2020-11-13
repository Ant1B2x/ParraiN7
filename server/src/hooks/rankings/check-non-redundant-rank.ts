// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {RankingData} from '../../services/rankings/rankings.class';
import {UserData} from '../../services/users/users.class';
import {Conflict, Forbidden, NotAcceptable} from "@feathersjs/errors";
import {log} from "winston";

// check that the provided rank is not redundant (a godfather shouldn't give the same rank to 2 godsons)
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const godsonId: number = context.data['godsonId'];
        if (!godsonId)
            throw new NotAcceptable('You have to provide a godsonId!');

        const rank: number = context.data['rank'];
        if (rank) {
            const loggedUser = context.params.user;

            if (!loggedUser)
                throw new Forbidden('You have to be logged in!');

            const rankings: Array<RankingData> = await context.app.service('rankings').find({
                query: {
                    godfatherId: loggedUser.id,
                    rank: rank
                },
                user: loggedUser
            });
            if (rankings.length && rankings[0].godsonId !== godsonId)
                throw new Conflict(`User ${loggedUser.id} already gaved rank ${rank} to someone!`);
        }

        return context;
    };
};
