const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'travis.j.s.taylor@gmail.com',
        subject:'thanks for joining in!',
        text:`welcome to the app, ${name}. Let me know how it goes!`
    })  
}

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'travis.j.s.taylor@gmail.com',
        subject:'sorry to see you go',
        text:`why you cancel ${name}???`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancelEmail
}