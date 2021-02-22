import {ClientRepository} from './../../../repositories/client.repository';
import {setupContainer} from '../../../helpers/container.helper';
import {mockUserFindOne} from '../User/helpers.user';
import {mockClientFindOne, mockClientSave} from './helpers.client';
import {
  mockExistedCurrentUser,
  mockUnexistedCurrentUser
} from '../User/helpers.user';
import {BadRequest, NotFound} from '../../../helpers/errors.helper';

describe('Update client by Id', () => {
  const container = setupContainer();

  beforeAll(() => {
    mockUserFindOne();
    mockClientFindOne();
    mockClientSave();
  });

  it('should succeed', async () => {
    const res = await container
      .resolve<ClientRepository>(ClientRepository)
      .updateById(
        '1',
        'Pham Duc Binh',
        'I help people from F-Code',
        '0943620820',
        'google.com',
        mockExistedCurrentUser
      );
    expect(res.status).toBe('success');
    expect(res.message).toBe('Client was updated successfully');
  });

  it('should fail because unexisted user', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .updateById(
          '1',
          'Pham Duc Binh',
          'I help people from F-Code',
          '0943620820',
          'google.com',
          mockUnexistedCurrentUser
        )
    ).rejects.toEqual(new NotFound('User is not exist'));
  });

  it('should fail because unexisted client', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .updateById(
          '2',
          'Pham Duc Binh',
          'I help people from F-Code',
          '0943620820',
          'google.com',
          mockExistedCurrentUser
        )
    ).rejects.toEqual(new NotFound('Client is not found'));
  });

  it('should fail because empty fullName', async () => {
    expect(
      container
        .resolve<ClientRepository>(ClientRepository)
        .updateById(
          '1',
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
        .updateById(
          '1',
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
