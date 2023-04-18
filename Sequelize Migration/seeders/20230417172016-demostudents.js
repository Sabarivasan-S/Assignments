'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('student', [
      {
        rollno:1,
        name:"name1",
        email:"name1@demoemail.com",
        phone:"1234835234"
      },
      {
        rollno:2,
        name:"name2",
        email:"name2@demoemail.com",
        phone:"1267835234"
      },
      {
        rollno:3,
        name:"name3",
        email:"name3@demoemail.com",
        phone:"1290835234"
      },
      {
        rollno:4,
        name:"name4",
        email:"name1@demoemail.com",
        phone:"1238935234"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('student', [
      {
        rollno:1,
        name:"name1",
        email:"name1@demoemail.com",
        phone:"1234835234"
      },
      {
        rollno:2,
        name:"name2",
        email:"name2@demoemail.com",
        phone:"1267835234"
      },
      {
        rollno:3,
        name:"name3",
        email:"name3@demoemail.com",
        phone:"1290835234"
      },
      {
        rollno:4,
        name:"name4",
        email:"name1@demoemail.com",
        phone:"1238935234"
      }
    ], {});
  }
};
