const db = require("../models");

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const clinics = await db.Clinic.findAll();
            if (!clinics) clinics = [];
            resolve({
                errCode: 0,
                data: clinics,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.name ||
                !data.address ||
                !data.avatar ||
                !data.backgroundImage ||
                !data.contentMarkdown ||
                !data.contentHTML
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    avatar: data.avatar,
                    backgroundImage: data.backgroundImage,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                });

                resolve({
                    errCode: 0,
                    errMessage: "Creating clinic successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.id ||
                !data.name ||
                !data.address ||
                !data.avatar ||
                !data.backgroundImage ||
                !data.contentMarkdown ||
                !data.contentHTML
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                const clinic = await db.Clinic.findOne({
                    where: { id: data.id },
                    raw: false,
                });

                if (!clinic) {
                    resolve({
                        errCode: 2,
                        errMessage: "Clinic not found!",
                    });
                } else {
                    clinic.name = data.name;
                    clinic.address = data.address;
                    clinic.avatar = data.avatar;
                    clinic.backgroundImage = data.backgroundImage;
                    clinic.contentHTML = data.contentHTML;
                    clinic.contentMarkdown = data.contentMarkdown;

                    clinic.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Creating clinic successfully!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!clinicId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                const clinic = await db.Clinic.findOne({
                    where: { id: clinicId },
                    raw: false,
                });

                if (!clinic) {
                    resolve({
                        errCode: 2,
                        errMessage: "Clinic not found!",
                    });
                } else {
                    await clinic.destroy();
                    resolve({
                        errCode: 0,
                        errMessage: "Delete clinic successfully!",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: [
                        "name",
                        "address",
                        "avatar",
                        "backgroundImage",
                        "contentHTML",
                        "contentMarkdown",
                    ],
                });

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Info.findAll({
                        where: { clinicId: inputId },
                        attributes: ["doctorId", "provinceId"],
                    });

                    data.doctorClinic = doctorClinic;
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
    getAllClinic,
    createClinic,
    updateClinic,
    deleteClinic,
    getDetailClinicById,
};
