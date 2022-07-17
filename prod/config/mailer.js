const nodeMailer = require('nodemailer');
const senderInfos = require('./senderInfo.json');

const mail = {
    sendGmail: function (params) {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
                user: senderInfos.user,
                pass: senderInfos.pass
            }
        });
        
        const mailOptions = {
            from: '"Market Kurly" <bbaekddo100@gmail.com>',
            to: params.email,
            subject: '마켓컬리 회원이 되신걸 환영합니다!',
            //language=HTML
            html: `
                <h2>마켓컬리에 오신걸 환영합니다</h2>
                <p>안녕하세요 ${params.name}님! 원하는 모든 상품을 찾고 주문해보세요</p>
                <img src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/yhD/image/F5foySLcw5qPprttQfavaWncYBA.png">
            `
        }
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent : ', info.response);
            }
        });
    }
}

module.exports = mail.sendGmail;
