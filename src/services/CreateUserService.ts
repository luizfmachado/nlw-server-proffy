import { getRepository } from 'typeorm';

import User from '../entities/User';

interface Request {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

class CreateClassService {
  public async execute({
    name,
    avatar,
    whatsapp,
    bio,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = usersRepository.create({
      name,
      avatar,
      whatsapp,
      bio,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateClassService;
