import {Client} from './../../../entities/Client.entity';
import {ClientController} from './../../../controllers/Client/index';
import {mockRequest, mockResponse, mockNext} from '../helpers';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser,
  mockUserFindOne
} from '../User/helpers.user';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';
import {mockClientFindOne, mockClientSave} from './helpers.client';

describe('Update client By Id', () => {
  beforeAll(() => {
    mockUserFindOne();
    mockClientFindOne();
    mockClientSave();
  });

  it('should succeed', async () => {
    const res: any = await ClientController.updateById(
      mockRequest(
        {
          fullName: 'Pham Duc Binh',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockExistedCurrentUser,
        {clientId: '1'}
      ),
      mockResponse,
      mockNext
    );

    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was updated successfully');
  });

  it('should fail because unexisted user', async () => {
    const res: any = await ClientController.updateById(
      mockRequest(
        {
          fullName: 'Pham Duc Binh',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockUnexistedCurrentUser,
        {clientId: '1'}
      ),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('User is not exist'));
  });

  it('should fail because unexisted client', async () => {
    const res: any = await ClientController.updateById(
      mockRequest(
        {
          fullName: 'Pham Duc Binh',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockExistedCurrentUser,
        {clientId: '2'}
      ),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('Client is not found'));
  });

  it('should fail because empty fullName', async () => {
    const res: any = await ClientController.updateById(
      mockRequest(
        {
          fullName: '',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockExistedCurrentUser,
        {clientId: '1'}
      ),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new BadRequest('fullName should not be empty'));
  });

  it('should fail because phone number is not VN', async () => {
    const res: any = await ClientController.create(
      mockRequest(
        {
          fullName: 'Pham Duc Binh',
          description: 'I help people from F-Code',
          phoneNumber: '1234567890',
          avatarUrl: 'google.com'
        },
        mockExistedCurrentUser,
        {clientId: '1'}
      ),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(
      new BadRequest('phoneNumber must be a valid phone number')
    );
  });
});
