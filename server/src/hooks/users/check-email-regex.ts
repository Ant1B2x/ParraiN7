// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {NotAcceptable} from '@feathersjs/errors';

// I'm trusting Esteban for this one.
// Not anymore. I did it alllllllll over again. Was very hard. Love, Yvan.
const institutionalEmailRegexp =
    RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@etu\\.toulouse-inp\\.fr$');

// check that user has entered a conform institutional email
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        if (context.data['email'] && !institutionalEmailRegexp.test(context.data['email']))
            throw new NotAcceptable('Email does not respect the institutional convention!');

        return context;
    };
};
