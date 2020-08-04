import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateClassSchedule1596547587486
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classSchedule',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'weekDay',
            type: 'integer',
          },
          {
            name: 'from',
            type: 'integer',
          },
          {
            name: 'to',
            type: 'integer',
          },
          {
            name: 'classId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'classSchedule',
      new TableForeignKey({
        name: 'classScheduleId',
        columnNames: ['classId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classSchedule', 'classScheduleId');
    await queryRunner.dropTable('classSchedule');
  }
}
