const db = require("../models");

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const specialties = await db.Specialty.findAll();
            if (!specialties) specialties = [];
            resolve({
                errCode: 0,
                data: specialties,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.imageBase64 ||
                !data.contentMarkdown ||
                !data.contentHTML
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                });

                resolve({
                    errCode: 0,
                    errMessage: "Creating specialty successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.id ||
                !data.name ||
                !data.imageBase64 ||
                !data.contentMarkdown ||
                !data.contentHTML
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                const specialty = await db.Specialty.findOne({
                    where: { id: data.id },
                    raw: false,
                });

                if (!specialty) {
                    resolve({
                        errCode: 2,
                        errMessage: "Creating specialty failed!",
                    });
                } else {
                    specialty.name = data.name;
                    specialty.image = data.imageBase64;
                    specialty.contentHTML = data.contentHTML;
                    specialty.contentMarkdown = data.contentMarkdown;

                    specialty.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Creating specialty successfully!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!specialtyId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                const specialty = await db.Specialty.findOne({
                    where: { id: specialtyId },
                    raw: false,
                });

                if (!specialty) {
                    resolve({
                        errCode: 2,
                        errMessage: "Specialty not found!",
                    });
                } else {
                    await specialty.destroy();
                    resolve({
                        errCode: 0,
                        errMessage: "Delete specialty successfully!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ["contentHTML", "contentMarkdown", "image"],
                });

                if (data) {
                    let doctorSpecialty = [];
                    if (location === "ALL") {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: inputId },
                            attributes: ["doctorId", "provinceId"],
                        });
                    } else {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location,
                            },
                            attributes: ["doctorId", "provinceId"],
                        });
                    }

                    data.doctorSpecialty = doctorSpecialty;
                } else {
                    data = {};
                }

                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllSpecialty,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    getDetailSpecialtyById,
};
