require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let getBodyHTMLEmail = (dataSend) => {
        if (dataSend.language === "vi") {
            return `
                <h1>Xin chào ${dataSend.patientName}!</h1>
                <p>Bạn nhận được email này đã đặt lịch khám bệnh online trên trang Booking Care</p>
                <p>Thông tin đặt lịch khám bệnh:</p>
                <p><strong>Thời gian: ${dataSend.time}</strong></p>
                <p><strong>Bác sĩ: ${dataSend.doctorName}</strong></p>
                <p>Nếu các thông tin trên là không đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
                <p><a href=${dataSend.redirectLink} target="_blank">Click here</a></p>
                <p>Xin chân thành cảm ơn.</p>
            `;
        } else {
            return `
                <h1>Dear ${dataSend.patientName}!</h1>
                <p>You received this email to schedule an online medical examination on the Booking Care page</p>
                <p>Information to book an appointment:</p>
                <p><strong>Time: ${dataSend.time}</strong></p>
                <p><strong>Doctor: ${dataSend.doctorName}</strong></p>
                <p>If the above information is not true, please click on the link below to confirm and complete the medical appointment procedure.</p>
                <p><a href=${dataSend.redirectLink} target="_blank">Click here</a></p>
                <p>Thank you very much.</p>
            `;
        }
    };

    // send mail with defined transport object

    const info = await transporter.sendMail({
        from: `${
            dataSend.language === "vi"
                ? "Nguyễn Viết Nam👻"
                : "Nam Nguyễn Viết👻"
        } <${process.env.EMAIL_APP}>`, // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello world", // plain text body
        html: getBodyHTMLEmail(dataSend),
    });
};

let sendAttachment = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let getBodyHTMLEmailRemedy = (dataSend) => {
        if (dataSend.language === "vi") {
            return `
                <h1>Xin chào ${dataSend.patientName}!</h1>
                <p>Bạn nhận được email này đã đặt lịch khám bệnh online thành công</p>
                <p>Thông tin đơn thuốc được gửi trong file đính kèm</p>
                
                <p>Xin chân thành cảm ơn.</p>
            `;
        } else {
            return `
                <h1>Dear ${dataSend.patientName}!</h1>
                <p>You have received this email and have successfully scheduled an online medical examination</p>
                <p>Prescription information is sent in the attached file:</p>

                <p>Thank you very much.</p>
            `;
        }
    };

    // send mail with defined transport object

    const info = await transporter.sendMail({
        from: `${
            dataSend.language === "vi"
                ? "Nguyễn Viết Nam👻"
                : "Nam Nguyễn Viết👻"
        } <${process.env.EMAIL_APP}>`, // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        attachments: [
            {
                filename: `Invoice-${dataSend.patientName}.png`,
                content: dataSend.imageBase64.split("base64,")[1],
                encoding: "base64",
            },
        ],
        html: getBodyHTMLEmailRemedy(dataSend),
    });
};

module.exports = { sendSimpleEmail, sendAttachment };
