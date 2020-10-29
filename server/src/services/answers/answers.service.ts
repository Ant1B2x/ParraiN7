// Initializes the `answers` service on path `/answers`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Answers } from './answers.class';
import createModel from '../../models/answers.model';
import hooks from './answers.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'answers': Answers & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/answers', new Answers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('answers');

  service.hooks(hooks);
}
