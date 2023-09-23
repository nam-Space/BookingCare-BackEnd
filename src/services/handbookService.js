const db = require("../models");

let getAllHandBook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.HandBook.findAll();
            resolve({
                errCode: 0,
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let createNewHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.image ||
                !data.contentHTML ||
                !data.contentMarkdown ||
                !data.caption
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                await db.HandBook.create({
                    name: data.name,
                    image: data.image,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    caption: data.caption,
                });
                resolve({
                    errCode: 0,
                    errMessage: "Create handbook successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let editHandBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.id ||
                !data.name ||
                !data.image ||
                !data.contentHTML ||
                !data.contentMarkdown ||
                !data.caption
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let handbook = await db.HandBook.findOne({
                    where: { id: data.id },
                    raw: false,
                });
                if (handbook) {
                    handbook.name = data.name;
                    handbook.image = data.image;
                    handbook.contentHTML = data.contentHTML;
                    handbook.contentMarkdown = data.contentMarkdown;
                    handbook.caption = data.caption;
                    await handbook.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update handbook successfully!",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Handbook is not found!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteHandBook = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let handbook = await db.HandBook.findOne({
                    where: { id: inputId },
                    raw: false,
                });
                if (handbook) {
                    await handbook.destroy();

                    resolve({
                        errCode: 0,
                        errMessage: "Delete handbook successfully!",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: "Handbook is not found!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailHandbookById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let handbook = await db.HandBook.findOne({
                    where: { id: inputId },
                });

                if (!handbook) data = {};

                resolve({
                    errCode: 0,
                    data: handbook,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllHandBook,
    createNewHandBook,
    editHandBook,
    deleteHandBook,
    getDetailHandbookById,
};
