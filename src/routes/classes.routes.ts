import { getRepository } from 'typeorm';
import { Router } from 'express';

import hoursToMinute from '../utils/hoursToMinute';

import Class from '../entities/Class';

import CreateUserService from '../services/CreateUserService';
import CreateClassService from '../services/CreateClassService';

const classesRouter = Router();

classesRouter.get('/classes', async (request, response) => {
  const classesRepository = getRepository(Class);
  const { weekDay, subject, time } = request.query;

  if (!weekDay || !subject || !time) {
    return response.status(400).json({ error: 'Missing query params.' });
  }
  const timeInMinutes = hoursToMinute(time as string);

  const classes = await classesRepository.find({
    where: { subject },
    relations: ['schedules', 'userId'],
  });

  const classesFiltred = classes.filter(classItem => {
    const existsDay = classItem.schedules.filter(schedule => {
      return (
        schedule.weekDay === Number(weekDay) &&
        schedule.from >= timeInMinutes &&
        schedule.to > timeInMinutes
      );
    });

    return existsDay.length > 0;
  });

  return response.json(classesFiltred);
});

classesRouter.post('/classes', async (request, response) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

  const createUser = new CreateUserService();
  const createClass = new CreateClassService();

  const user = await createUser.execute({
    name,
    avatar,
    whatsapp,
    bio,
  });

  await createClass.execute({
    subject,
    cost,
    schedule,
    userId: user.id,
  });

  return response.json(user);
});

export default classesRouter;
