import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dto/user.dto";
import { Repository } from "typeorm";
import { PasswordService } from "./password/password.service";
import { User } from "./user.entity";



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name: username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async isUserExists(name: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
  }

  
  async create(userDto: UserDto): Promise<User> {
    const userPayload = {
      name: userDto.username.toLowerCase(),
      passwordHash: await this.passwordService.generate(userDto.password),
    };

    let newUser = this.userRepository.create(userPayload);
    newUser = await this.updateUser(newUser);

    return await this.updateUser(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(newUser: User): Promise<User> {
    return await this.userRepository.save(newUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async checkUserPassword(
    user: User,
    requestPassword: string,
  ): Promise<boolean> {
    return this.passwordService.compare(requestPassword, user.password);
  }

  
  
}