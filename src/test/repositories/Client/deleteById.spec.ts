import {ClientRepository} from './../../../repositories/client.repository';
import {setupContainer} from '../../../helpers/container.helper';
import {mockUserFindOne} from '../User/helpers.user';
import {mockClientFindOne, mockClientRemove} from './helpers.client';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser
} from '../User/helpers.user';
import {NotFound} from '../../../helpers/errors.helper';

describe('Delete client by Id', () => {
  const container = setupContainer();

  beforeAll(() => {
    mockUserFindOne();
    mockClientFindOne();
    mockClientRemove();
  });

  it('should succeed', async () => {
    const res = await container
      .resolve<ClientRepository>(ClientRepository)
      .deleteById('1', mockExistedCurrentUser);
    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was deleted successfully');
  });

  it('should fail because unexisted user', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .deleteById('1', mockUnexistedCurrentUser)
    ).rejects.toEqual(new NotFound('User is not exist'));
  });

  it('should fail because unexisted client', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .deleteById('2', mockExistedCurrentUser)
    ).rejects.toEqual(new NotFound('Client is not found'));
  });
});
