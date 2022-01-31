import sgMail from '@sendgrid/mail'

// go thro their docs 
class SendGridHelper { 
    
    static async sendConfirmationMail (token, userEmail) {
        const server = process.env.SERVER || 'https://localhost:1338/';
    
          sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

          const msg  = {
    
            to: userEmail,
            from : `${process.env.Company_Email}`,
            templateId: `${process.env.WELCOME_MAIL_ID}`,
      
            dynamic_template_data: {

              link:`${process.env.FRONTEND_URL}verification/${token}`
            }

          }

            sgMail.send(msg).then(() => {}, error => {
              console.error(error);
           
              if (error.response) {
                console.error(error.response.body)
              }
            });

            server();
      }

      static async sendOrderConfirmation(){

      }

      static async sendPasswordResetEmail(){

      }

    
}

export default SendGridHelper;