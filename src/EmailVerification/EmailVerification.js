import { verificationEmailTemplate } from "../../Emails/VerificationEmailTemplate";

import { Resend } from "resend";


export async function sendVerificationEmail(email, name, verifyCode) {
    try {



        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Verification Code - Phantom Post',
            react: verificationEmailTemplate({ name, verifyCode })
        });

        return { success: true, message: "verification email send" }
    } catch (error) {

        console.log("verification email sending error", error);
        return { success: false, message: "verification email sending error" }
    }
}