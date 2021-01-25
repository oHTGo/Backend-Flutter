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
    try {
      await await container
        .resolve<ClientRepository>(ClientRepository)
        .create(
          'Pham Duc Binh',
          'I help people from F-Code',
          '0943620820',
          'google.com',
          mockUnexistedCurrentUser
        );
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.getCode()).toBe(404);
      expect(error.message).toBe('User is not exist');
    }
  });

  it('should fail because empty fullName', async () => {
    try {
      await await container
        .resolve<ClientRepository>(ClientRepository)
        .create(
          '',
          'I help people from F-Code',
          '0943620820',
          'google.com',
          mockExistedCurrentUser
        );
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      expect(error.getCode()).toBe(400);
      expect(error.message).toBe('fullName should not be empty');
    }
  });

  it('should fail because phone number is not VN', async () => {
    try {
      await await container
        .resolve<ClientRepository>(ClientRepository)
        .create(
          'Pham Duc Binh',
          'I help people from F-Code',
          '1234567890',
          'google.com',
          mockExistedCurrentUser
        );
      fail('succeeded');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequest);
      expect(error.getCode()).toBe(400);
      expect(error.message).toBe('phoneNumber must be a valid phone number');
    }
  });
});
