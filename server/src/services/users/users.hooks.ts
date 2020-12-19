import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import checkUniqueEmail from '../../hooks/users/check-unique-email';
import checkEmailRegex from '../../hooks/users/check-email-regex';
import checkName from '../../hooks/users/check-name';
import unsetAdmin from '../../hooks/users/unset-admin';
import checkModifyingUser from '../../hooks/users/check-modifying-user';
import checkSettingAdminUser from '../../hooks/users/check-setting-admin-user';
import hideGodsonName from '../../hooks/users/hide-godson-name';
import hideGodsonsNames from '../../hooks/users/hide-godsons-names';
import sendToken from '../../hooks/users/send-token';
import hideToken from '../../hooks/users/hide-token';
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;
const {hashPassword, protect} = local.hooks;

export default {
    before: {
        all: [],
        find: [authenticate('jwt')],
        get: [authenticate('jwt')],
        create: [checkEmailRegex(), checkUniqueEmail(), checkName(), unsetAdmin(), hashPassword('password')],
        update: [authenticate('jwt'), checkModifyingUser(), checkSettingAdminUser(), checkEmailRegex(), checkName(), hashPassword('password')],
        patch: [authenticate('jwt'), checkModifyingUser(), checkSettingAdminUser(), checkEmailRegex(), checkName(), hashPassword('password')],
        remove: [authenticate('jwt'), checkModifyingUser()]
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            protect('password')
        ],
        find: [hideGodsonsNames(), hideToken()],
        get: [hideGodsonName(), hideToken()],
        create: [sendToken(), hideToken()],
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
