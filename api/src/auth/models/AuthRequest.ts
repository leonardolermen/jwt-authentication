import { Request } from 'express';
import { User } from '../../users/user.entity';

export interface AuthRequest extends Request {
  user: User;
}