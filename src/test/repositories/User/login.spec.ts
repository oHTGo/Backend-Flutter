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
      .login('admin', 'password');
    expect(res.status).toBe('success');
    expect(res.message).toBe('Logged in successfully');
    expect(res.data).toBeDefined();
  });

  it('should fail because password is empty', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('admin', '');
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      expect(error.getCode()).toBe(400);
      expect(error.message).toBe('User or password is empty');
    }
  });

  it('should fail because username is empty', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('', 'password');
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      expect(error.getCode()).toBe(400);
      expect(error.message).toBe('User or password is empty');
    }
  });

  it('should fail because wrong password', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('admin', 'fakePassword');
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.getCode()).toBe(404);
      expect(error.message).toBe('Username or password is incorrect');
    }
  });

  it('should fail because unexisted username', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('fakeAdmin', 'password');
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.getCode()).toBe(404);
      expect(error.message).toBe('Username or password is incorrect');
    }
  });
});
