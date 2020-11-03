// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from "../../services/users/users.class";

// add author name to sent question
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const sentQuestion = context.result;
        const author: UserData = await context.app.service('users').get(sentQuestion['authorId']);
        sentQuestion['authorFirstname'] = author.firstname;
        sentQuestion['authorLastname'] = author.lastname;

        return context;
    };
};
