const nodemailer = require('nodemailer');
const { google } = require('googleapis');

class SendMail {

	subject = '';
	body = '';

	transporterSendMail(transporter, mailOptions) {
		return new Promise((resolve, reject) => {
			try {
				resolve(transporter.sendMail(mailOptions));
			} catch (error) {
				reject(error);
			}
		});
	}

	async sendMail() {
		let sendMailP = new Promise((resolve, reject) => {
			console.log('Configuring Transporter...');
			const transporter = nodemailer.createTransport({
				host: 'innovacion2.com',
				port: 465,
				secure: true,
				auth: {
					user: 'info@innovacion2.com',
					pass: 'JesusesDios.2022'
				},
				tls: {
					rejectUnauthorized: false
				}
			});

			console.log('Configuring Mailing Options...');
			const mailOptions = {
				from: `${this.subject} -- <info@innovacion2.com>`,
				to: 'info@innovacion2.com',
				subject: `${this.subject}`,
				html: `${this.body}`
			}

			console.log('Sending Mail...');
			this.transporterSendMail(transporter, mailOptions)
				.then(response => {
					console.log('Email sent succesfully');
					resolve(response);
				})
				.catch(error => {
					console.log(error);
					reject(error);
				})
		});

		let result = await sendMailP;
		return result;
	}

}

module.exports = SendMail;