import {create} from 'domain';
import {Client} from '../../../entities/Client.entity';

const mockClientData = [
  {
    id: '1',
    fullName: 'Pham Duc Binh',
    description: 'I help people from F-Code',
    phoneNumber: '0943620820',
    avatarUrl: 'google.com',
    createBy: '1'
  },
  {
    id: '2',
    fullName: 'Tran Trung Kien',
    description: 'I am helped by people who help people from F-Code',
    phoneNumber: '0783329134',
    avatarUrl: 'pornhub.com',
    createBy: '1'
  },
  {
    id: '3',
    fullName: 'Nguyen Nhat Huy',
    description: 'I have a girlfriend',
    phoneNumber: '0355279240',
    avatarUrl: 'youtube.com',
    createBy: '1'
  }
];
const mockClients = [];
const mockClient = new Client();

mockClientData.forEach((data) => {
  Object.keys(data).forEach((key) => {
    mockClient[key] = data[key];
  });
  mockClients.push(mockClient);
});

// Client.findOne
const resFindOneClient: Promise<Client> = new Promise((resolve) => {
  return resolve(mockClient);
});
const resNotFoundOneClient: Promise<Client> = new Promise((resolve) => {
  return resolve(null);
});

const mockClientFindOne = (): void => {
  Client.findOne = jest.fn().mockImplementation(({id}) => {
    if (id === '1') return resFindOneClient;
    return resNotFoundOneClient;
  });
};

// Client.find
const resFindClients: Promise<Client[]> = new Promise((resolve) => {
  return resolve(mockClients);
});
const resNotFoundClients: Promise<Client[]> = new Promise((resolve) => {
  return resolve(null);
});

const mockClientFind = (): void => {
  Client.find = jest.fn().mockImplementation(({createdBy}) => {
    if (createdBy.username === 'admin') return resFindClients;
    return resNotFoundClients;
  });
};

// Client.save
const resSaveClient: Promise<Client> = new Promise((resolve) => {
  return resolve(mockClient);
});
const resNotSavedClient: Promise<Client> = new Promise((resolve) => {
  return resolve(null);
});

const mockClientSave = (): void => {
  Client.save = jest.fn().mockImplementation(({username}) => {
    if (username === 'admin') return resSaveClient;
    return resNotSavedClient;
  });
};

// Client.remove
const resRemoveClient: Promise<Client> = new Promise((resolve) => {
  return resolve(mockClient);
});
const resNotRemovedClient: Promise<Client> = new Promise((resolve) => {
  return resolve(null);
});

const mockClientRemove = (): void => {
  Client.remove = jest.fn().mockImplementation(({username}) => {
    if (username === 'admin') return resRemoveClient;
    return resNotRemovedClient;
  });
};

export {
  mockClient,
  mockClients,
  mockClientFind,
  mockClientFindOne,
  mockClientSave,
  mockClientRemove
};
