import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit || 10;
    try {
        let doctors = await doctorService.getTopDoctorHome(Number(limit));
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};

module.exports = { getTopDoctorHome };
