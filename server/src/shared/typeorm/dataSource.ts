import { DataSource } from 'typeorm';
import { CreateUserTable1718991698597 } from './migrations/1718991698597-CreateUserTable';
import { CreateActivitiesTable1719363847200 } from './migrations/1719363847200-CreateActivitiesTable';
import User from 'src/modules/user/typeorm/entities/User';
import 'dotenv/config';
import Activity from 'src/modules/activities/typeorm/entities/Activity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  username: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [User, Activity],
  migrations: [CreateUserTable1718991698597, CreateActivitiesTable1719363847200],
  synchronize: false,
  logging: false,
});
