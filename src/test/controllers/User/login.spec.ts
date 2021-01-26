import {UserController} from '../../../controllers/User';
import {mockRequest, mockResponse, mockNext} from '../helpers';
import {mockUserFindOne} from './helpers.user';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';

describe('User login', () => {
  beforeAll(() => {
    mockUserFindOne();
  });

  it('should succeed', async () => {
    const res: any = await UserController.login(
      mockRequest({username: 'admin', password: 'password'}),
      mockResponse,
      mockNext
    );

    expect(res.status).toBe('success');
    expect(res.message).toBe('Logged in successfully');
    expect(res.data).toBeDefined();
  });

  it('should fail because empty username', async () => {
    const res: any = await UserController.login(
      mockRequest({username: '', password: 'password'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new BadRequest('User or password is empty'));
  });

  it('should fail because empty password', async () => {
    const res: any = await UserController.login(
      mockRequest({username: 'admin', password: ''}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new BadRequest('User or password is empty'));
  });

  it('should fail because wrong password', async () => {
    const res: any = await UserController.login(
      mockRequest({username: 'admin', password: 'fakePassword'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('Username or password is incorrect'));
  });

  it('should fail because unexisted username', async () => {
    const res: any = await UserController.login(
      mockRequest({username: 'admin', password: 'fakePassword'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('Username or password is incorrect'));
  });
});
