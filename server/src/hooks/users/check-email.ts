/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {Conflict, NotAcceptable} from "@feathersjs/errors";
import app from '../../app';

// I'm trusting Esteban for this one.
// Not anymore. I did it alllllllll over again. Was very hard. Love, Yvan.
const institutionalEmailRegexp =
    RegExp('^\\w+\\.\\w+@etu\\.toulouse-inp\\.fr$');

export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const testEmail = await context.app.service('users').find({
            query: {
                email: context.data['email']
            }
        });
        if (testEmail.length > 0)
            throw new Conflict('A user already has this email!');
        if (!institutionalEmailRegexp.test(context.data['email']))
            throw new NotAcceptable('Email does not respect the institutional convention!');

        return context;
    };
};
