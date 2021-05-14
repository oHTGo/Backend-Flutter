import {ICurrentUser} from '../../../interfaces/User.interface';
import {User} from '../../../entities/User.entity';

// mock object data
const mockUserData = [
  {
    id: '1',
    username: 'admin',
    password: '$2a$10$BDv/Ov8A5tVyK.G3M1BaXOI3eq/9xcICsUeHLfwMEvdSZdYTo9t5O',
    fullName: 'F-Code'
  }
];

// mock object
const mockExistedCurrentUser: ICurrentUser = {
  userId: '1',
  username: 'admin',
  iat: 1234567890,
  exp: 9876543210,
  iss: 'local'
};
const mockUnexistedCurrentUser = {
  userId: '2',
  username: 'fakeAdmin',
  iat: 1234567890,
  exp: 9876543210,
  iss: 'local'
};
const mockUser = new User();

mockUserData.forEach((data) => {
  Object.keys(data).forEach((key) => {
    mockUser[key] = data[key];
  });
});

const resFoundOneUser: Promise<User> = new Promise((resolve) => {
  return resolve(mockUser);
});
const resNotFoundOneUser: Promise<User> = new Promise((resolve) => {
  return resolve(null);
});

const mockUserFindOne = (): void => {
  User.findOne = jest.fn().mockImplementation(({username}) => {
    if (username === 'admin') return resFoundOneUser;
    return resNotFoundOneUser;
  });
};

export {
  mockUser,
  mockExistedCurrentUser,
  mockUnexistedCurrentUser,
  mockUserFindOne
};
