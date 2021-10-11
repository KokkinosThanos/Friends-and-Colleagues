const { QueryTypes } = require("sequelize");
const sequelize = require("../DB_proccess/MysqlProccess");

const Query = {
  friends: async () => {
    const FetchResult = await sequelize.query(" SELECT * FROM friends ", {
      type: QueryTypes.SELECT,
    });
    return FetchResult;
  },
};

const Mutation = {
  addFriend: async (_, input) => {
    try {
      const Friend = await sequelize.query(
        ` INSERT INTO friends (firstname, lastname, phone, age)
          VALUES ('${input.firstname}', '${input.lastname}', '${input.phone}', '${input.age}');
        `,
        { type: QueryTypes.INSERT }
      );
      // console.log(input.phone);
      return input
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  updateFriend: async (_, input) => {
    try {
      const Friend = await sequelize.query(
        ` UPDATE friends 
          SET 
              firstname='${input.firstname}',
              lastname='${input.lastname}', 
              phone='${input.phone}', 
              age='${input.age}'
          WHERE 
              id='${input.id}'; `, { type: QueryTypes.UPDATE }
      );
      return input;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteFriend: async (_, input) => {
    try {
      const Friend = await sequelize.query(
        `DELETE FROM friends WHERE id='${input.id}'; `, { type: QueryTypes.DELETE }
      );
      return input;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

module.exports = { Query, Mutation };
