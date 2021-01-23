import {validate} from 'class-validator';
import {injectable} from 'inversify';
import {User} from '../entities/User.entity';
import {BadRequest, DefaultError, NotFound} from '../helpers/errors.helper';
import {errorParser} from '../helpers/errors.helper';
import sendSuccess from '../helpers/success.helper';
import {Client} from '../entities/Client.entity';

@injectable()
export class ClientRepository {
  public async getAll(currentUser: any) {
    const user: any = await User.findOne({username: currentUser.username});
    if (!user) throw new NotFound('User is not exist');

    const clients: any = await Client.find({createdBy: user.id});
    if (!clients) throw new DefaultError('Database connection error');

    return sendSuccess('Clients were gotten successfully', clients);
  }

  public async create(
    fullName: string,
    description: string,
    phoneNumber: string,
    avatarUrl: string,
    currentUser: any
  ) {
    const user: User = await User.findOne({username: currentUser.username});
    if (!user) throw new NotFound('User is not exist');

    const client = new Client();
    client.fullName = fullName;
    client.description = description;
    client.phoneNumber = phoneNumber;
    client.avatarUrl = avatarUrl;
    client.createdBy = user;

    const validateErrors: any = await validate(client);
    if (validateErrors.length)
      throw new BadRequest(errorParser(validateErrors));
    await client.save();

    return sendSuccess('Client was created successfully');
  }

  public async getById(id: string, currentUser: any) {
    const user: any = await User.findOne({username: currentUser.username});
    if (!user) throw new NotFound('User is not exist');

    const client: any = await Client.findOne({
      id: id,
      createdBy: user.id
    });
    if (!client) throw new NotFound('Client is not found');
    return sendSuccess('Client was gotten successfully', client);
  }

  public async updateById(
    id: string,
    fullName: string,
    description: string,
    phoneNumber: string,
    avatarUrl: string,
    currentUser: any
  ) {
    const user: any = await User.findOne({username: currentUser.username});
    if (!user) throw new NotFound('User is not exist');

    const client: any = await Client.findOne({
      id: id,
      createdBy: user
    });
    if (!client) throw new NotFound('Client is not found');

    client.fullName = fullName;
    client.description = description;
    client.phoneNumber = phoneNumber;
    client.avatarUrl = avatarUrl;
    client.createdBy = user;

    const validateErrors: any = await validate(client);
    if (validateErrors.length)
      throw new BadRequest(errorParser(validateErrors));

    await client.save();

    return sendSuccess('Client was updated successfully');
  }

  public async deleteById(id: string, currentUser: any) {
    const user: any = await User.findOne({username: currentUser.username});
    if (!user) throw new NotFound('User is not exist');

    const client: any = await Client.findOne({
      id: id,
      createdBy: user
    });
    if (!client) throw new NotFound('Client is not found');
    await client.remove();

    return sendSuccess('Client was deleted successfully');
  }
}
