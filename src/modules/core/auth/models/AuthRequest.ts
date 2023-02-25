import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

export class AuthRequest extends Request {
  user: User;
}
