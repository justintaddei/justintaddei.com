import { STATUS_CODES } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { clearLine } from 'readline'

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // hostname
    secure: true, // TLS requires secureConnection to be false
    port: 465, // port for secure SMTP
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.ZOHO_APP_PASSWORD
    }
})

const verifyRecaptcha = async (token: string) => {
    const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
    ).then((r) => r.json())

    return res.success
}

const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, message } = req.body as { [key: string]: string }

    const verified = await verifyRecaptcha(req.body['g-recaptcha-token'])
    if (!verified) {
        res.status(400).json({
            success: false,
            message:
                'Sorry, google recaptcha detected suspicious behavior and the form cannot be completed at this time.'
        })
        return
    }

    if (!name) return res.status(200).json({ success: false, message: 'Please enter your name' })
    if (!email) return res.status(200).json({ success: false, message: 'Please enter your email' })
    if (!message) return res.status(200).json({ success: false, message: 'Please enter a message' })

    // setup e-mail data, even with unicode symbols
    const mailOptions = {
        from: `"Justin Taddei" <${process.env.EMAIL_ADDRESS}>`, // sender address (who sends)
        to: process.env.EMAIL_ADDRESS, // list of receivers (who receives)
        replyTo: email,
        subject: `Website form submission from ${name}`, // Subject line
        html: `
        <h1>Inquiry</h1>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: <a href="mailto:${email}">${email}</a></li>
        </ul>
        <h2>Message:</h2>
        <p>${message}</p>
    `
    }
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.error(error)
            return res.status(500).json({ success: false, message: 'Failed to send. Please try again.' })
        }
        res.status(200).json({ success: true, message: 'Message sent' })
    })
}

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') post(req, res)
    else res.status(401).send(STATUS_CODES[401])
}

export const config = {
    api: {
        externalResolver: true
    }
}
