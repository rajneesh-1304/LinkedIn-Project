import { IsString, IsEmail, IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class UsersDefinition {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  headline: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsEmail()
  @IsNotEmpty()
  bio: string;

  // @IsString()
  // @IsNotEmpty()
  // role: string;
}
