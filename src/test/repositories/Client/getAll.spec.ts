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
    try {
      await container
        .resolve<ClientRepository>(ClientRepository)
        .getAll(mockUnexistedCurrentUser);
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.getCode()).toBe(404);
      expect(error.message).toBe('User is not exist');
    }
  });
});
