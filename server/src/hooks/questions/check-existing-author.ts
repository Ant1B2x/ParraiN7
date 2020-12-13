// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {NotFound} from "@feathersjs/errors";
import {QuestionData} from "../../services/questions/questions.class";

// check if the provided authorId exists or not in users table
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const newData: QuestionData = context.data;
        if (newData['authorId']) {

            const users: Array<UserData> = await context.app.service('users').find({
                query: {
                    id: newData.authorId
                }
            });
            if (!users.length)
                throw new NotFound(`There's no user of id ${newData.authorId}!`);

        }

        return context;
    };
};
