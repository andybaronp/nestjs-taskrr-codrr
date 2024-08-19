import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/users.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersProjectsEntity } from '../entities/usersProjects.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersProjectsEntity)
    private readonly userProjectRepository: Repository<UsersProjectsEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository.save(body);
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se ha podido registrar el usuario',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      //guarda el error
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: ' No existen usuarios',
        });
      }
      return users;
    } catch (error) {
      // ejecuta el error
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('users')
        .where({ id })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se ha podido encontrar el usuario',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<{ message: string; result: boolean } | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update({ id }, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se ha podido actualizar el usuario',
        });
      }
      return {
        message: 'Usuario actualizado correctamente',
        result: true,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(
    id: string,
  ): Promise<{ message: string; result: boolean } | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);

      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: ' No se ha podido borrar el usuario',
        });
      }
      return {
        message: 'Usuario borrado correctamente',
        result: true,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToProject(body: UserToProjectDTO) {
    try {
      const relacion: UsersProjectsEntity =
        await this.userProjectRepository.save(body);
      if (!relacion) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se ha podido registrar el usuario',
        });
      }
      return relacion;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
