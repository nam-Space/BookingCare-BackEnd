import db from "../models";
import { sendSimpleEmail } from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
    return `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
};

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.doctorId ||
                !data.timeType ||
                !data.date ||
                !data.fullName ||
                !data.language ||
                !data.timeString ||
                !data.selectedGender ||
                !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let token = uuidv4();

                await sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token),
                });

                const [user, created] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                        gender: data.selectedGender,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        firstName: data.fullName,
                    },
                });

                // const bookingData = await db.Booking.findOne({
                //     where: {
                //         patientId: user.id,
                //         date: data.date,
                //         timeType: data.timeType,
                //     },
                // });
                // if (bookingData) {
                //     resolve({
                //         errCode: 2,
                //         errMessage:
                //             "Medical appointment is duplicated! Unable to schedule",
                //     });
                // } else {
                await db.Booking.findOrCreate({
                    where: {
                        patientId: user.id,
                        date: data.date,
                        timeType: data.timeType,
                        doctorId: data.doctorId,
                    },
                    defaults: {
                        statusId: "S1",
                        doctorId: data.doctorId,
                        patientId: user.id,
                        date: data.date,
                        timeType: data.timeType,
                        token: token,
                    },
                });
                resolve({
                    errCode: 0,
                    errMessage: "Appointment successful!",
                });
                // }
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter",
                });
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: "S1",
                    },
                    raw: false,
                });
                if (appointment) {
                    appointment.statusId = "S2";
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update appointment successfully!",
                    });
                } else {
                    resolve({
                        errCode: 2,
                        errMessage:
                            "Appointment has been activated or does not exist",
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment,
};
