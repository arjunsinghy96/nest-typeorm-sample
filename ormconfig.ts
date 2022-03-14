module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "arjun.yadav",
  password: "awesome_password",
  database: "test",
  autoLoadEntities: true,
  synchronize: false,
  migrationRun: false,
  entities: ["src/**/*.entity.ts"],
  migrations: [__dirname + "/src/migrations/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
  },
  logging: "all",
  logger: "simple-console"
};
