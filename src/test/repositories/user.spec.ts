import {UserRepository} from '../../repositories/user.repository';
import {User} from '../../entities/User.entity';
import {setupContainer} from '../../helpers/container.helper';
import {BadRequest, NotFound} from '../../helpers/errors.helper';

describe('User Repositories', () => {
  const container = setupContainer();
  const user = new User();

  beforeAll(() => {
    const mockUserData = {
      id: '1',
      username: 'admin',
      password: '$2a$10$BDv/Ov8A5tVyK.G3M1BaXOI3eq/9xcICsUeHLfwMEvdSZdYTo9t5O',
      fullName: 'F-Code'
    };
    Object.keys(mockUserData).forEach((key) => {
      user[key] = mockUserData[key];
    });

    const foundUser: Promise<User> = new Promise((resolve) => {
      return resolve(user);
    });
    const notFoundUser: Promise<User> = new Promise((resolve) => {
      return resolve(null);
    });

    User.findOne = jest.fn().mockImplementation(({username}) => {
      console.log(username);
      if (username == 'admin') return foundUser;
      return notFoundUser;
    });
  });

  it('should login successfully', async () => {
    const res = await container
      .resolve<UserRepository>(UserRepository)
      .login('admin', 'password');
    expect(res.status).toBe('success');
    expect(res.message).toBe('Logged in successfully');
    expect(res.data.accessToken).toBeDefined();
  });

  it('should login failed because password is empty', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('admin', '');
      fail('fail');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      expect(error.getCode()).toBe(400);
      expect(error.message).toBe('User or password is empty');
    }
  });

  it('should login failed because username is empty', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('', 'password');
      fail('fail');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      expect(error.getCode()).toBe(400);
      expect(error.message).toBe('User or password is empty');
    }
  });

  it('should login failed because wrong password', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('admin', 'pass');
      fail('fail');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.getCode()).toBe(404);
      expect(error.message).toBe('Username or password is incorrect');
    }
  });

  it('should login failed because unexisted username', async () => {
    try {
      await container
        .resolve<UserRepository>(UserRepository)
        .login('ad', 'password');
      fail('fail');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.getCode()).toBe(404);
      expect(error.message).toBe('Username or password is incorrect');
    }
  });
});
