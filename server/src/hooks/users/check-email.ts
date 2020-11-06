/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {Conflict, NotAcceptable} from '@feathersjs/errors';

// I'm trusting Esteban for this one.
// Not anymore. I did it alllllllll over again. Was very hard. Love, Yvan.
const institutionalEmailRegexp =
    RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@etu\\.toulouse-inp\\.fr$');

// check that user has entered a non-existant institutional email
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        if (context.data['email']) {
            if (!institutionalEmailRegexp.test(context.data['email']))
                throw new NotAcceptable('Email does not respect the institutional convention!');

            const emails = await context.app.service('users').find({
                query: {
                    email: context.data['email']
                }
            });
            if (emails.length > 0)
                throw new Conflict('A user already has this email!');
        }

        return context;
    };
};
