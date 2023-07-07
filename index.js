require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);
client.calls.create({
    to: '+91#########', // The phone number where we want call
    from: '+19########', // The phone number through which a call will be made
    url: 'You can add the twiML URL here or you can set ngrok to forward your request from localhost to public'
})
    .then(call => console.log(call.sid));
