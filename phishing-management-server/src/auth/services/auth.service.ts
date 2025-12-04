import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const existing = await this.userModel.findOne({ email });
      if (existing) {
        throw new BadRequestException('User already exists');
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        email,
        password: hashed,
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(email: string, password: string) {
    try {
      if (!email || !password) {
        throw new BadRequestException('Email and password are required');
      }

      const user = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException('Invalid password');

      const token = this.jwtService.sign({ id: user._id, email: user.email });

      return { token };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException('Failed to login user');
    }
  }
}
