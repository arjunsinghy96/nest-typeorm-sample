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
  migrations: ["dist/src/migraitons/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
