import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Account } from 'src/domain/entity/account.entity';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) { }

  async register(data: any) {
    const userRepo = this.dataSource.getRepository(Account);

    const existingUser = await userRepo.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const user = userRepo.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data?.lastName || undefined,
      headline: data?.headline || undefined,
      location: data?.location || undefined,
      profilePicture: data?.profilePicture || undefined,
      bio: data?.bio || undefined
    });

    await userRepo.save(user);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
    };
  }

  async login(data: { email: string, tokenId: string }) {
    try {
      const decodedToken = await adminAuth.verifyIdToken(data.tokenId);
      const email = decodedToken.email;
      if (!email) throw new UnauthorizedException('Invalid token, no email found');

      const userRepo = this.dataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) throw new NotFoundException('User not found');
      if (user.isBanned) throw new ForbiddenException('User is banned, please contact admin');

      return {
        message: 'User logged in successfully',
        user: {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }


  async getAll({
    page, limit
  }) {
    const userRepo = this.dataSource.getRepository(User);

    const [user, total] = await userRepo.createQueryBuilder('user').skip((page - 1) * limit).take(limit).getManyAndCount();
    console.log(user);
    return {
      user: user,
      total,
      page, limit, hasMore: page * limit < total
    };
  }

  async banUser(id: number) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({
      // where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isBanned = !user.isBanned;
    await userRepo.save(user);
  }
}
