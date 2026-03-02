import { Controller, Post, Body, Res, Patch, Param, Get, Query } from '@nestjs/common';
import { Response } from 'express'; 
import { UserService } from './user.service';
import { LoginUserDto } from 'src/domain/DTO/login';
import { UsersDefinition } from 'src/domain/DTO/user';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response, 
  ) {
    const user = await this.userService.login(loginDto);
    console.log('i got hit');

    res.cookie('token', loginDto.tokenId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    console.log('cookie setted')

    return {
      message: 'User logged in successfully',
      user,
    };
  }

  @Post('register')
  registerUser(@Body() userData: UsersDefinition) {
    return this.userService.register(userData);
  }

  @Patch('delete/:id')
  deleteQuestion(
    @Param('id') id: any,
  ) {
    return this.userService.banUser(+id);
  }

  @Get()
  getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.userService.getAll({page, limit});
}

}
