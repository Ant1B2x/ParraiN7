// Initializes the `rankings` service on path `/rankings`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Rankings } from './rankings.class';
import createModel from '../../models/rankings.model';
import hooks from './rankings.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'rankings': Rankings & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rankings', new Rankings(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rankings');

  service.hooks(hooks);
}
