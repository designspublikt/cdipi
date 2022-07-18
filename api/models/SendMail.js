const nodemailer = require('nodemailer');
const { google } = require('googleapis');

class SendMail {

	CLIENT_ID = '952921723563-h5tenjrnf34vesdoc2vitiqbhubjeun5.apps.googleusercontent.com';
	CLIENT_SECRET = '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';
	REDIRECT_URI = 'https://developers.google.com/oauthplayground';
	REFRESH_TOKEN = '1//04RmLEdtGuP9XCgYIARAAGAQSNwF-L9Ir9Y5rt1jJKbrGYmK3PA4QV4mU0PVVTqtXK-dOPUyWNaly-Un17teK7xyMxinmVQj8_Ug';

	fullname = '';
	email = '';
	message = '';

	getAccessToken() {
		let oAuth2Client = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET );
		oAuth2Client.setCredentials({refresh_token: this.REFRESH_TOKEN});

		return new Promise((resolve, reject) => {
			try {
				resolve(oAuth2Client.getAccessToken);
			} catch (error) {
				reject(error);
			}
		});
	}

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
			this.getAccessToken()
				.then(accessToken => {
					console.log('Configuring Transporter...');
					const transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							type: 'OAuth2',
							user: 'cdipi.innovacion@gmail.com',
							clientId: this.CLIENT_ID,
							clientSecret: this.CLIENT_SECRET,
							refreshToken: this.REFRESH_TOKEN,
							accessToken
						},
						tls: {
							rejectUnauthorized: false
						}
					});

					console.log('Configuring Mailing Options...');
					const mailOptions = {
						from: `Consulta Web -- <cdipi.innovacion2@gmail.com>`,
						to: 'info@innovacion2.com',
						subject: 'Consulta Web',
						html: `
							<p>Nombre: ${this.fullname}</p>
							<p>Email: ${this.email}</p>
							<p>Mensaje: ${this.message}</p>
						`
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
				})
				.catch(error => {
					reject(error);
				});
		});

		let result = await sendMailP;
		return result;
	}

}

module.exports = SendMail;