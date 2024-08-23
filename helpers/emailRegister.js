import nodemailer from "nodemailer";//is a popular library for Node.js used to send emails from web applications


const emailRegister = async (datos) => {//credencials
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        
      });

      const {email, name, token}= datos;
      //Enviar el email
      const info = await transport.sendMail({
        from: "Collections manager",
        to: email,
        subject: "Check your account on Collections manager",
        text: "Check your account on Collections manager",
        html: `<p>Hola: ${name}, Check your account on Collections manager.</p>
            <p>Your account is ready; you just need to verify it at the following link: Verify Account.
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Check account</a> </p>

            <p>If you did not create this account, you can ignore this message</p>
        `,
      });
     
};

export default emailRegister;