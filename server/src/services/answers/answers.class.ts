import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

interface AnswerData {
    userId: number;
    questionId: number;
    content?: string;
}

export class Answers extends Service<AnswerData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'answers'
    });
  }
}
