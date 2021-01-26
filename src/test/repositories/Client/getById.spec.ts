import {ClientRepository} from './../../../repositories/client.repository';
import {setupContainer} from '../../../helpers/container.helper';
import {mockUserFindOne} from '../User/helpers.user';
import {mockClientFindOne} from './helpers.client';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser
} from '../User/helpers.user';
import {NotFound} from '../../../helpers/errors.helper';

describe('Get client by Id', () => {
  const container = setupContainer();

  beforeAll(() => {
    mockUserFindOne();
    mockClientFindOne();
  });

  it('should succeed', async () => {
    const res = await container
      .resolve<ClientRepository>(ClientRepository)
      .getById('1', mockExistedCurrentUser);
    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was gotten successfully');
    expect(res.data).toBeDefined();
  });

  it('should fail because unexisted user', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .getById('1', mockUnexistedCurrentUser)
    ).rejects.toEqual(new NotFound('User is not exist'));
  });

  it('should fail because unexisted client', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .getById('2', mockExistedCurrentUser)
    ).rejects.toEqual(new NotFound('Client is not found'));
  });
});
