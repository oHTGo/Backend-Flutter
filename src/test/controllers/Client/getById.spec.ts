import {ClientController} from './../../../controllers/Client/index';
import {mockRequest, mockResponse, mockNext} from '../helpers';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser,
  mockUserFindOne
} from '../User/helpers.user';
import {NotFound} from '../../../helpers/errors.helper';
import {mockClientFindOne} from './helpers.client';

describe('Get client By Id', () => {
  beforeAll(() => {
    mockUserFindOne();
    mockClientFindOne();
  });

  it('should succeed', async () => {
    const res: any = await ClientController.getById(
      mockRequest({}, mockExistedCurrentUser, {clientId: '1'}),
      mockResponse,
      mockNext
    );

    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was gotten successfully');
  });

  it('should fail because unexisted user', async () => {
    const res: any = await ClientController.getById(
      mockRequest({}, mockUnexistedCurrentUser, {clientId: '1'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('User is not exist'));
  });

  it('should fail because unexisted client', async () => {
    const res: any = await ClientController.getById(
      mockRequest({}, mockExistedCurrentUser, {clientId: '2'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('Client is not found'));
  });
});
