import {ClientController} from './../../../controllers/Client/index';
import {mockRequest, mockResponse, mockNext} from '../helpers';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser,
  mockUserFindOne
} from '../User/helpers.user';
import {NotFound} from '../../../helpers/errors.helper';
import {mockClientFind} from './helpers.client';

describe('Get all clients', () => {
  beforeAll(() => {
    mockUserFindOne();
    mockClientFind();
  });

  it('should succeed', async () => {
    const res: any = await ClientController.getAll(
      mockRequest({}, mockExistedCurrentUser),
      mockResponse,
      mockNext
    );

    expect(res.status).toBe('success');
    expect(res.message).toBe('Clients were gotten successfully');
    expect(res.data).toBeDefined();
  });

  it('should fail because unexisted user', async () => {
    const res: any = await ClientController.getAll(
      mockRequest({}, mockUnexistedCurrentUser),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('User is not exist'));
  });
});
