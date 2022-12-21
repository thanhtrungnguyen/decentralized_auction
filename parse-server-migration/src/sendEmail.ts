import nodemailer from "nodemailer"

export const sendEmail = async (content: any) => {
	const transport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "dap.auction@gmail.com",
			pass: "bcwxkbmvgrlcjeio",
		},
	});

	const options = {
		from: process.env.MAIL_FROM_ADDRESS,
		to: "trungnthe141289@fpt.edu.vn",
		subject: "Moralis parse-server",
		text: content,
	};
	console.log("Starting send email...")
	const result = await transport.sendMail(options);
	console.log("Email sent...", result);
	return result;
};