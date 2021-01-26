import {ClientRepository} from './../../../repositories/client.repository';
import {setupContainer} from '../../../helpers/container.helper';
import {mockUserFindOne} from '../User/helpers.user';
import {mockClientFind} from './helpers.client';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser
} from '../User/helpers.user';
import {NotFound} from '../../../helpers/errors.helper';

describe('Get all clients', () => {
  const container = setupContainer();

  beforeAll(() => {
    mockUserFindOne();
    mockClientFind();
  });

  it('should succeed', async () => {
    const res = await container
      .resolve<ClientRepository>(ClientRepository)
      .getAll(mockExistedCurrentUser);
    expect(res.status).toBe('success');
    expect(res.message).toBe('Clients were gotten successfully');
    expect(res.data).toBeDefined();
  });

  it('should fail because unexisted user', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .getAll(mockUnexistedCurrentUser)
    ).rejects.toEqual(new NotFound('User is not exist'));
  });
});
