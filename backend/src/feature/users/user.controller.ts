import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { LoginUserDto } from 'src/domain/DTO/login';
import { UsersDefinition } from 'src/domain/DTO/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { productImageStorage } from 'src/infra/multer/multer';
import { EducationDto } from 'src/domain/DTO/education';
import { Profile } from 'src/domain/DTO/profile';
import { ExperienceDto } from 'src/domain/DTO/experience';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.login(loginDto);

    res.cookie('token', loginDto.tokenId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return {
      message: 'User logged in successfully',
      user,
    };
  }

  @Post('register')
  registerUser(@Body() userData: UsersDefinition) {
    return this.userService.register(userData);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: productImageStorage,
    }),
  )
  updateProfile(
    @Param('id') id: string,
    @Body() userData: Profile,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userService.updateProfile(id, userData, file);
  }

  @Get()
  getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.getAll({ page, limit });
  }

  @Post('education/:id')
  addEducation(
    @Param('id') id: string,
    @Body() userData: EducationDto,
  ){
    return this.userService.addEducation(id, userData);
  }

  @Post('experience/:id')
  addExperience(
    @Param('id') id: string,
    @Body() userData: ExperienceDto,
  ){
    return this.userService.addExperience(id, userData);
  }

}
