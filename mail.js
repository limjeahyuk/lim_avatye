const nodemailer = require('nodemailer');
const senderInfo = require('./config/senderInfo.json');

//메일 발송 객체
const mailSender = {
    sendGmail: function (params) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            prot: 587,
            host: 'smtp.gmail.com',
            // secure가 false 이고 requireTLS가 true이면 nodemailer는 서버가 지원을 알리지 않더라도 starttls를 사용하려고 시도.
            // 연결을 암호화 할 수 없으면 메세지 전송 x
            secure: false,
            requireTLS: true,
            auth: {
                user: senderInfo.user,
                pass: senderInfo.pass
            }
        });

        var mailOptions = {
            from: senderInfo.user,
            to: params.toEmail,
            subject: params.subject,
            text: params.text
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('email sent : ' + info.response);
            }
        });
    }
}

module.exports = mailSender;