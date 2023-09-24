import clinicService from "../services/clinicService";

let getAllClinic = async (req, res) => {
    try {
        let info = await clinicService.getAllClinic();
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server " + error,
        });
    }
};

let createClinic = async (req, res) => {
    try {
        let info = await clinicService.createClinic(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server " + error,
        });
    }
};

let updateClinic = async (req, res) => {
    try {
        let info = await clinicService.updateClinic(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server " + error,
        });
    }
};

let deleteClinic = async (req, res) => {
    try {
        let info = await clinicService.deleteClinic(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server " + error,
        });
    }
};

let getDetailClinicById = async (req, res) => {
    try {
        let info = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server " + error,
        });
    }
};

module.exports = {
    getAllClinic,
    createClinic,
    updateClinic,
    deleteClinic,
    getDetailClinicById,
};
