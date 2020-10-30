import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import {HookContext} from "@feathersjs/feathers";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;
const {hashPassword, protect} = local.hooks;

// check that user has entered an institutional email
const institutionalEmailRegexp = RegExp('^.*@etu\.toulouse-inp\.fr');
const checkEmail = () => {
    return async (context : HookContext) => {
        if (!institutionalEmailRegexp.test(context.data['email']))
            throw new Error('Email does not respect institutional email regexp');

        return context;
    }
}

// a user shouldn't be admin by default
const unsetAdmin = () => {
    return async (context : HookContext) => {
        context.data['isAdmin'] = false;
    }
}

export default {
    before: {
        all: [],
        find: [authenticate('jwt')],
        get: [authenticate('jwt')],
        create: [checkEmail(), unsetAdmin(), hashPassword('password')],
        update: [authenticate('jwt'), hashPassword('password')],
        patch: [authenticate('jwt'), hashPassword('password')],
        remove: [authenticate('jwt')]
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            protect('password')
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
