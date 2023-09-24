"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class HandBook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    HandBook.init(
        {
            name: DataTypes.STRING,
            image: DataTypes.TEXT,
            contentHTML: DataTypes.TEXT,
            contentMarkdown: DataTypes.TEXT,
            caption: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "HandBook",
            tableName: "handbooks",
        }
    );
    return HandBook;
};
