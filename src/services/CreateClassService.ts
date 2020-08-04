import { getRepository } from 'typeorm';

import Class from '../entities/Class';
import ClassSchedule from '../entities/ClassSchedule';
import hoursToMinute from '../utils/hoursToMinute';

interface RequestSchedule {
  weekDay: number;
  from: string;
  to: string;
}

interface Request {
  subject: string;
  cost: number;
  schedule: RequestSchedule[];
  userId: string;
}

class CreateClassService {
  public async execute({
    subject,
    cost,
    schedule,
    userId,
  }: Request): Promise<void> {
    const classesRepository = getRepository(Class);
    const classScheduleRepository = getRepository(ClassSchedule);

    const classes = classesRepository.create({
      subject,
      cost,
      userId,
    });

    await classesRepository.save(classes);

    const classId = classes.id;

    const classSchedules = schedule.map(scheduleItem => {
      return {
        classId,
        weekDay: scheduleItem.weekDay,
        from: hoursToMinute(scheduleItem.from),
        to: hoursToMinute(scheduleItem.to),
      };
    });

    await classScheduleRepository.save(classSchedules);
  }
}

export default CreateClassService;
