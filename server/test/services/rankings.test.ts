import assert from 'assert';
import app from '../../src/app';

describe('\'rankings\' service', () => {
  it('registered the service', () => {
    const service = app.service('rankings');

    assert.ok(service, 'Registered the service');
  });
});
