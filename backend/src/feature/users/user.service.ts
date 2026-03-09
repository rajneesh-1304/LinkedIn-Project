import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EducationDto } from 'src/domain/DTO/education';
import { ExperienceDto } from 'src/domain/DTO/experience';
import { Profile } from 'src/domain/DTO/profile';
import { Education } from 'src/domain/entity/education.entity';
import { Experience } from 'src/domain/entity/experience.entity';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';
import { PublisherService } from './publisher.service';
import { Outbox } from 'src/domain/entity/outbox.entity';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource, private readonly publisherService: PublisherService) { }

  async register(data: any) {
    const userRepo = this.dataSource.getRepository(User);

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
      // if (user.isBanned) throw new ForbiddenException('User is banned, please contact admin');

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        profilePicture: user.profilePicture,
        email: user.email,
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


  async updateProfile(id: string, userData: Profile, file: Express.Multer.File) {
    const userRepo = this.dataSource.getRepository(User);
    const imageUrls = `http://localhost:3001/uploads/${file?.filename}`;
    await userRepo.update(
      { id },
      {
        firstName: userData.firstName,
        lastName: userData.lastName ?? null,
        headline: userData.headline ?? null,
        location: userData.location ?? null,
        profilePicture: imageUrls ?? null,
        bio: userData.bio ?? null,
      }
    );
    return {
      message: 'User updated successfully',
    };
  }

  async addEducation(id: string, userData: EducationDto) {
    const userRepo = this.dataSource.getRepository(User);
    const educRepo = this.dataSource.getRepository(Education);
    if (new Date(userData.startDate) > new Date(userData.endDate)) {
      throw new ConflictException('Start date cannot be after end date');
    }
    const user = await userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');
    const edu = educRepo.create({
      instituteName: userData.instituteName,
      degreeName: userData.degreeName,
      Grade: userData.Grade,
      startDate: userData.startDate,
      endDate: userData.endDate,
      user
    })
    await educRepo.save(edu);
    return {
      message: 'Education details added successfully'
    }
  }

  async addExperience(id: string, userData: ExperienceDto) {
    const userRepo = this.dataSource.getRepository(User);
    const expRepo = this.dataSource.getRepository(Experience);
    if (new Date(userData.startDate) > new Date(userData.endDate)) {
      throw new ConflictException('Start date cannot be after end date');
    }
    const user = await userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    const edu = expRepo.create({
      company: userData.company,
      position: userData.position,
      location: userData.location,
      startDate: userData.startDate,
      endDate: userData.endDate,
      user
    })
    await expRepo.save(edu);
    return {
      message: 'Experience details added successfully'
    }
  }

  async banUser(id: number) {
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({
      // where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // user.isBanned = !user.isBanned;
    await userRepo.save(user);
  }

  async getProfile(id: string){
    if(!id){
      throw new NotFoundException('Id not provided');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return {
      user
    }
  }

  async getEducation(id: string){
    if(!id){
      throw new NotFoundException('Id not provided');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const educRepo = this.dataSource.getRepository(Education);
    const edu = await educRepo.find({where : {user : {id}}});
    return {
      edu
    }
  }

  async getExperience(id: string){
    if(!id){
      throw new NotFoundException('Id not provided');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const experienceRepo = this.dataSource.getRepository(Experience);
    const exp = await experienceRepo.find({where : {user : {id}}});
    return {
      exp
    }
  }

  async createPost(id, data){
    const outboxRepo =this.dataSource.getRepository(Outbox);
    const outboxMsg = outboxRepo.create({
      id: id,
      message:data,
      status:'PENDING'
    })
    await outboxRepo.save(outboxMsg);
    this.publisherService.publish(data);
  }
  
}
