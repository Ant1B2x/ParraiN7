// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from "../../services/users/users.class";
import {QuestionData} from "../../services/questions/questions.class";

// add users and questions to sent answers
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        for (let sentAnswer of context.result) {
            const user: UserData = await context.app.service('users').get(sentAnswer['userId']);
            const question: QuestionData = await context.app.service('questions').get(sentAnswer['questionId']);

            sentAnswer['user'] = user;
            sentAnswer['question'] = question;
        }

        return context;
    };
};