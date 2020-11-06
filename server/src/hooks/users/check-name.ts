/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {BadRequest} from "@feathersjs/errors";


// I'm trusting Esteban for this one.
// Not anymore. I did it alllllllll over again. Was very hard. Love, Yvan.
const nameRegEx =
    RegExp('^\\w+$');

export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (!nameRegEx.test(context.data['firstname']) || !nameRegEx.test(context.data['lastname']))
            throw new BadRequest('Firstname and/or lastname does not respect the expected format!');

        return context;
    };
};
