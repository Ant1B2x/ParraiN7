// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {LengthRequired} from "@feathersjs/errors";

// ensure that question content is not null
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (context.data['content'] !== undefined) {
            const content: string = context.data['content'].trim();
            if (!content)
                throw new LengthRequired('Question content cannot be empty!')
        }

        return context;
    };
};
