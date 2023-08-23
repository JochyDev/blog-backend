const { transporter } = require("../config/mailerconfig");

const sendConfirmationEmail = async (email, confirmationCode) => {
    const message = {
      from: 'joseluisjimenez1998@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Por favor confirma tu suscripción',
      html: `
    //   <p>Gracias por suscribirte a nuestro sitio web. Para confirmar tu suscripción y empezar a recibir nuestras notificaciones, por favor haz clic en el siguiente enlace:</p>
      // <p><a href="http://${process.env.BASE_URL}/api/subscribers/${confirmationCode}">Confirmar suscripción</a></p>
      <p>Si no te has suscrito a nuestro sitio web, por favor ignora este mensaje.</p>
      `,
    };
  
    await transporter.sendMail(message)
    
    return 'Gracias por suscribirte a nuestro boletín. Por favor revisa tu correo electrónico para confirmar tu suscripción'
}


module.exports = {
    sendConfirmationEmail
}

