import {UserRepository} from './../../repositories/user.repository';
import {User} from '../../entities/User.entity';
import {setupContainer} from '../../helpers/container.helper';

describe('User Repositories', () => {
  const container = setupContainer();
  const user = new User();

  beforeAll(() => {
    const mockUser = {
      id: 'a705ea76-9f91-4e4c-913c-66db91f8a014',
      username: 'admin',
      password: '$2a$10$BDv/Ov8A5tVyK.G3M1BaXOI3eq/9xcICsUeHLfwMEvdSZdYTo9t5O',
      fullName: 'F-Code'
    };

    Object.keys(mockUser).forEach((key) => {
      user[key] = mockUser[key];
    });

    const result: Promise<User> = new Promise((resolve, reject) => {
      return resolve(user);
    });

    jest.spyOn(User, 'findOne').mockImplementation(() => result);
  });

  it('should login successfully', async () => {
    const res = await container
      .resolve<UserRepository>(UserRepository)
      .login('admin', 'password');
    expect(res.status).toBe('success');
    expect(res.message).toBe('Logged in successfully');
    expect(res.data.accessToken).toBeDefined();
  });
});
