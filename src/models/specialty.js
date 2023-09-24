"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Specialty extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Specialty.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.TEXT,
            contentHTML: DataTypes.TEXT,
            contentMarkdown: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Specialty",
            tableName: "specialties",
        }
    );
    return Specialty;
};
