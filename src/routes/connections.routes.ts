import { Router } from 'express';
import { getRepository } from 'typeorm';

import Connection from '../entities/Connection';
import CreateCounterConnectionService from '../services/CreateCounterConnectionService';

const classesRouter = Router();

classesRouter.get('/connections', async (request, response) => {
  const connectionsRepository = getRepository(Connection);
  const totalConnections = await connectionsRepository.count();
  return response.json({ total: totalConnections });
});

classesRouter.post('/connections', async (request, response) => {
  const createConnection = new CreateCounterConnectionService();
  const { userId } = request.body;

  await createConnection.execute({
    userId,
  });

  return response.status(201).send();
});

export default classesRouter;
