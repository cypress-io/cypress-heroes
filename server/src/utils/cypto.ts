import * as bcrypt from 'bcrypt';

export async function generatePasswordHash(password: string) {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function validatePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
