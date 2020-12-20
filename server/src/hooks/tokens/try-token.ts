// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {Forbidden, NotAcceptable, NotFound} from "@feathersjs/errors";
import {UserData} from "../../services/users/users.class";
import {TokenData} from "../../services/tokens/tokens.class";

// check that a sent token is correct, in order to delete it
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        const loggedUser: UserData = context.params.user;
        if (loggedUser && !loggedUser.isAdmin)
            throw new Forbidden('Only admins can delete tokens!')

        const email: string = context.params.query?.email;
        const token: number = Number(context.params.query?.token);

        if (!email || !token)
            throw new NotAcceptable('You have to supply email and token in order to delete token');

        const user: UserData = (await context.app.service('users').find({
            query: {
                email: email
            }
        }))[0];

        if (!user)
            throw new NotFound('This user does not exists');

        const storedToken: TokenData = (await context.app.service('tokens').find({
            query: {
                userId: user.id
            }
        }))[0];

        if (!storedToken || storedToken.token !== token)
            if (!loggedUser || !loggedUser.isAdmin)
                throw new NotAcceptable('This token is invalid!');

        context.id = storedToken.id;
        delete context.params.query;

        return context;
    };
};
