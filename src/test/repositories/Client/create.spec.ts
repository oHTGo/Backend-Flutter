import {ClientRepository} from './../../../repositories/client.repository';
import {setupContainer} from '../../../helpers/container.helper';
import {mockUserFindOne} from '../User/helpers.user';
import {mockClientSave} from './helpers.client';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser
} from '../User/helpers.user';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';

describe('Creat client', () => {
  const container = setupContainer();

  beforeAll(() => {
    mockUserFindOne();
    mockClientSave();
  });

  it('should succeed', async () => {
    const res = await container
      .resolve<ClientRepository>(ClientRepository)
      .create(
        'Pham Duc Binh',
        'I help people from F-Code',
        '0943620820',
        'google.com',
        mockExistedCurrentUser
      );
    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was created successfully');
  });

  it('should fail because unexisted user', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .create(
          'Pham Duc Binh',
          'I help people from F-Code',
          '0943620820',
          'google.com',
          mockUnexistedCurrentUser
        )
    ).rejects.toEqual(new NotFound('User is not exist'));
  });

  it('should fail because empty fullName', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .create(
          '',
          'I help people from F-Code',
          '0943620820',
          'google.com',
          mockExistedCurrentUser
        )
    ).rejects.toEqual(new BadRequest('fullName should not be empty'));
  });

  it('should fail because phone number is not VN', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .create(
          'Pham Duc Binh',
          'I help people from F-Code',
          '1234567890',
          'google.com',
          mockExistedCurrentUser
        )
    ).rejects.toEqual(
      new BadRequest('phoneNumber must be a valid phone number')
    );
  });
});
