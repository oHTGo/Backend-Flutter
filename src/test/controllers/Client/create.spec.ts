import {ClientController} from './../../../controllers/Client/index';
import {mockRequest, mockResponse, mockNext} from '../helpers';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser,
  mockUserFindOne
} from '../User/helpers.user';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';
import {mockClientSave} from './helpers.client';

describe('Create client', () => {
  beforeAll(() => {
    mockUserFindOne();
    mockClientSave();
  });

  it('should succeed', async () => {
    const res: any = await ClientController.create(
      mockRequest(
        {
          fullName: 'Pham Duc Binh',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockExistedCurrentUser
      ),
      mockResponse,
      mockNext
    );

    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was created successfully');
  });

  it('should fail because unexisted user', async () => {
    const res: any = await ClientController.create(
      mockRequest(
        {
          fullName: 'Pham Duc Binh',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockUnexistedCurrentUser
      ),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(new NotFound('User is not exist'));
  });

  it('should fail because empty fullName', async () => {
    const res: any = await ClientController.create(
      mockRequest(
        {
          fullName: '',
          description: 'I help people from F-Code',
          phoneNumber: '0943620820',
          avatarUrl: 'google.com'
        },
        mockExistedCurrentUser
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
        mockExistedCurrentUser
      ),
      mockResponse,
      mockNext
    );

    expect(res).toEqual(
      new BadRequest('phoneNumber must be a valid phone number')
    );
  });
});
