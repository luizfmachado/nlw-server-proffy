import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateClasses1596546432221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'cost',
            type: 'decimal',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'classes',
      new TableForeignKey({
        name: 'classesId',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classes', 'classesId');
    await queryRunner.dropTable('classes');
  }
}
