import {inject} from 'inversify';
import {
  controller,
  httpGet,
  BaseHttpController,
  requestParam,
  httpPost,
  requestBody,
  request,
  httpPut,
  httpDelete
} from 'inversify-express-utils';
import {ClientRepository} from '../repositories/client.repository';
import {TYPES} from '../constants/types';
import {Request} from 'express';
import {IClient} from '../interfaces/Client.interface';
import * as envConfig from '../config';

@controller('/clients', TYPES.TokenCheckerMiddleware)
export class ClientController extends BaseHttpController {
  constructor(
    @inject(TYPES.ClientRepository) private clientRepository: ClientRepository
  ) {
    super();
  }

  @httpGet('/')
  public async getAll(@request() request: Request) {
    return this.clientRepository.getAll(request.currentUser);
  }

  @httpPost('/')
  public async create(
    @requestBody() client: IClient,
    @request() request: Request
  ) {
    return this.clientRepository.create(
      client.fullName,
      client.description,
      client.phoneNumber,
      client.avatarUrl,
      request.currentUser
    );
  }

  @httpGet('/:id')
  public async getById(
    @requestParam('id') id: string,
    @request() request: Request
  ) {
    return this.clientRepository.getById(id, request.currentUser);
  }

  @httpPut('/:id')
  public async updateById(
    @requestParam('id') id: string,
    @requestBody() client: IClient,
    @request() request: Request
  ) {
    return this.clientRepository.updateById(
      id,
      client.fullName,
      client.description,
      client.phoneNumber,
      client.avatarUrl,
      request.currentUser
    );
  }

  @httpDelete('/:id')
  public async deleteById(
    @requestParam('id') id: string,
    @request() request: Request
  ) {
    return this.clientRepository.deleteById(id, request.currentUser);
  }
}
