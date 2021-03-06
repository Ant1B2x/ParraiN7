import {Application} from '../declarations';
import users from './users/users.service';
import questions from './questions/questions.service'
import answers from './answers/answers.service';
import rankings from './rankings/rankings.service'
import addConstraints from '../models/add-constraints';
import addAdminUser from '../models/add-admin-user';
import tokens from './tokens/tokens.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(users);
    app.configure(questions);
    app.configure(answers);
    app.configure(rankings);
    app.configure(tokens);

    addConstraints(app).then();
    addAdminUser(app).then();
}
