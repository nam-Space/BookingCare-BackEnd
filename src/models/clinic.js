"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Clinic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Clinic.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            avatar: DataTypes.TEXT,
            backgroundImage: DataTypes.TEXT,
            contentHTML: DataTypes.TEXT,
            contentMarkdown: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Clinic",
            tableName: "clinics",
        }
    );
    return Clinic;
};
