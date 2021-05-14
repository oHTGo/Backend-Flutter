import {UserRepository} from '../../../repositories/user.repository';
import {setupContainer} from '../../../helpers/container.helper';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';
import {mockUserFindOne} from './helpers.user';

describe('Login user', () => {
  const container = setupContainer();

  beforeAll(() => {
    mockUserFindOne();
  });

  it('should success', async () => {
    const res = await container
      .resolve<UserRepository>(UserRepository)
      .login('admin', 'password', '');
    expect(res.status).toBe('success');
    expect(res.message).toBe('Logged in successfully');
    expect(res.data).toBeDefined();
  });

  it('should fail because password is empty', async () => {
    expect(
      container.resolve<UserRepository>(UserRepository).login('admin', '', '')
    ).rejects.toEqual(new BadRequest('User or password is empty'));
  });

  it('should fail because username is empty', async () => {
    expect(
      container
        .resolve<UserRepository>(UserRepository)
        .login('', 'password', '')
    ).rejects.toEqual(new BadRequest('User or password is empty'));
  });

  it('should fail because wrong password', async () => {
    expect(
      container
        .resolve<UserRepository>(UserRepository)
        .login('admin', 'fakePassword', '')
    ).rejects.toEqual(new NotFound('Username or password is incorrect'));
  });

  it('should fail because unexisted username', async () => {
    expect(
      container
        .resolve<UserRepository>(UserRepository)
        .login('fakeAdmin', 'password', '')
    ).rejects.toEqual(new NotFound('Username or password is incorrect'));
  });
});
