import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { LoginUserDto } from 'src/domain/DTO/login';
import { UsersDefinition } from 'src/domain/DTO/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { productImageStorage } from 'src/infra/multer/multer';
import { EducationDto } from 'src/domain/DTO/education';
import { Profile } from 'src/domain/DTO/profile';
import { ExperienceDto } from 'src/domain/DTO/experience';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';

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
      maxAge: 1000 * 60 * 60 * 8,
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

  @UseGuards(FirebaseAuthGuard)
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

  @UseGuards(FirebaseAuthGuard)
  @Post('education/:id')
  addEducation(
    @Param('id') id: string,
    @Body() userData: EducationDto,
  ){
    return this.userService.addEducation(id, userData);
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('experience/:id')
  addExperience(
    @Param('id') id: string,
    @Body() userData: ExperienceDto,
  ){
    return this.userService.addExperience(id, userData);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('profile/:id')
  getProfile(@Param('id') id: string){
    return this.userService.getProfile(id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('education/:id')
  getEducation(@Param('id') id: string){
    return this.userService.getEducation(id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('experience/:id')
  getExperience(@Param('id') id: string){
    return this.userService.getExperience(id);
  }

}
