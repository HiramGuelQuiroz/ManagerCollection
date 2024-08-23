import nodemailer from "nodemailer";


const emailForgetPassword = async (datos) => {
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
        from: "Collections Manager",
        to: email,
        subject: "Restore your password",
        text: "Restore your password",
        html: `<p>Hello: ${name}, you have requested to reset your password.</p>
            <p>follow the link below to generate a new one: 
            <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Restore Password</a> </p>

            <p>If you did not create this account, you can ignore this message</p>
        `,
      });
     
};

export default emailForgetPassword;