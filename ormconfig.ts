module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "arjun.yadav",
  password: "awesome_password",
  database: "test",
  autoLoadEntities: true,
  synchronize: false,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migraitons/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
