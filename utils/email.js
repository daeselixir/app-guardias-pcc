const nodemailer = require("nodemailer");

const emailRegister = async (data) => {
  const { email, firstName, token } = data;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "fsoto@tmpatagonia.cl",
      pass: "Yagan023",
    },
  });

  //Informacion email
  // TODO: Modificar diseño de email
  const info = await transport.sendMail({
    from: "Administrador 👌",
    to: email,
    subject: "Confirma tu cuenta email 💻",
    text: "Comprueba tu cuenta",
    html: `
            Hola : <h3> ${firstName.toUpperCase()} </h3> Comprueba tu cuenta en Inventory 😏</p>
                <p>Tu cuenta ya esta casi lista , solo debes comprobarla en el siguiente link</p>
                <a href='http://localhost:3500/api/v1/auth/confirmed-account/${token}'>comprobar cuenta</a>
    
                <p>Si tu no creaste esta cuenta , puedes ignorar el mensaje</p>
        `,
  });
};

module.exports = {
  emailRegister,
};
