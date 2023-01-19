import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: ('user' | 'admin')[]) => SetMetadata('roles', args);
