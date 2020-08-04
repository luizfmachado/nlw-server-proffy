import { getRepository } from 'typeorm';

import Connection from '../entities/Connection';

interface Request {
  userId: string;
}

class CreateCounterConnectionService {
  public async execute({ userId }: Request): Promise<void> {
    const connectionsRepository = getRepository(Connection);

    const connection = connectionsRepository.create({
      userId,
    });

    await connectionsRepository.save(connection);
  }
}

export default CreateCounterConnectionService;
