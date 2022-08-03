module.exports = [
  {
    'name': 'default',
    'type': process.env.DB_TYPE,
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'username': process.env.DB_USER,
    'password': process.env.DB_PWD,
    'database': process.env.DB_NAME,
    'synchronize': true,
    'migrationsRun': false,
    'logging': false,
    'entities': [
      'src/entities/*.ts',
    ],
    'migrations': [
      'src/database/migrations/**/*.ts',
    ],
    'seeds': ['src/database/seeds/**/*{.ts,.js}'],
    'factories': ['src/database/factories/**/*{.ts,.js}'],
    'cli': {
      'entitiesDir': 'src/entities',
      'migrationsDir': 'src/database/migrations',
      'subscribersDir': 'src/subscriber',
    },
  }];
