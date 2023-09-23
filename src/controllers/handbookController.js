import handbookService from "../services/handbookService";

let getAllHandBook = async (req, res) => {
    try {
        let info = await handbookService.getAllHandBook();
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let createNewHandBook = async (req, res) => {
    try {
        let info = await handbookService.createNewHandBook(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let editHandBook = async (req, res) => {
    try {
        let info = await handbookService.editHandBook(req.body);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let deleteHandBook = async (req, res) => {
    try {
        let info = await handbookService.deleteHandBook(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

let getDetailHandbookById = async (req, res) => {
    try {
        let info = await handbookService.getDetailHandbookById(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

module.exports = {
    getAllHandBook,
    createNewHandBook,
    editHandBook,
    deleteHandBook,
    getDetailHandbookById,
};
