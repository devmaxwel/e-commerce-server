import sendEmail from '@sendgrid/mail'

sendEmail.setApiKey(process.env.SEND_GRID_API_KEY);

export const sendMail=(message)=>{
     try {
         await sendEmail.send(message)
      
     } catch (err) {
        console.log(err.message);
     }
}

sendMail({
    to:"",
    from:"",
    subject:"",
    message:""
});