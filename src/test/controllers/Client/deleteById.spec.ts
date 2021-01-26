import {Client} from './../../../entities/Client.entity';
import {ClientController} from './../../../controllers/Client/index';
import {mockRequest, mockResponse, mockNext} from '../helpers';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser,
  mockUserFindOne
} from '../User/helpers.user';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';
import {mockClientFindOne, mockClientRemove} from './helpers.client';

describe('Delete client By Id', () => {
  beforeAll(() => {
    mockUserFindOne();
    mockClientFindOne();
    mockClientRemove();
  });

  it('should succeed', async () => {
    const res: any = await ClientController.deleteById(
      mockRequest({}, mockExistedCurrentUser, {clientId: '1'}),
      mockResponse,
      mockNext
    );

    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was deleted successfully');
  });

  it('should fail because unexisted user', async () => {
    const res: any = await ClientController.deleteById(
      mockRequest({}, mockUnexistedCurrentUser, {clientId: '1'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('User is not exist'));
  });

  it('should fail because unexisted client', async () => {
    const res: any = await ClientController.deleteById(
      mockRequest({}, mockExistedCurrentUser, {clientId: '2'}),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('Client is not found'));
  });
});
