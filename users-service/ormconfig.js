module.exports = {
  url: process.env.DB_URL,
  database: process.env.DB_NAME,
  type: process.env.DB_TYPE,
  entities: ['src/infra/type-orm/entities/*.ts'],
  migrations: ['src/infra/type-orm/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/infra/type-orm/migrations'
  }
};
