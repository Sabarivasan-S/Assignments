Important:
 In config/config.json file add the user credentials who has privilege to create database
 To add database create privilege to user:
  (i)CREATE ROLE createdb; (or) CREATE ROLE CREATEDB; (avoid if role already exists)
  (ii)GRANT createdb TO <username> or GRANT CREATEDB TO <username> 
  
Steps to migrate:
1.database creation: sequelize-cli db:create
2.migration : sequelize-cli db:migrate
3.seed: sequelize-cli db:seed:all

Script to run:
 1.to run test: npm run test
 2.to run test with coverage: npm run coverage
 3.to start server: npm run start (it will start both the servers)
 
