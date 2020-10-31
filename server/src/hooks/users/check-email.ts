// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';

// I'm trusting Esteban for this one
const institutionalEmailRegexp =
    RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@etu\.toulouse-inp\.fr$');

// check that user has entered an institutional email
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (!institutionalEmailRegexp.test(context.data['email']))
            throw new Error('Email does not respect institutional email regexp!');

        return context;
    };
};
