import { Sequelize, DataTypes }  from "sequelize"

export const UserModel = () => {

  const sequelize = new Sequelize()

  return sequelize.define(
    "UserModel",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      email:{
        type:DataTypes.STRING,
        allowNull:false
      },
      phoneNumber:{
        type:DataTypes.BIGINT
      }
    },
    {
      // Other model options go here
    }
  );
}


// `sequelize.define` also returns the model
// console.log(UserModel === sequelize.models.User); // true
