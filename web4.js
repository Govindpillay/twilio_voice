const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const twilio = require('twilio');
const app = express();
const port = 3000;

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);
app.use(urlencoded({ extended: false }));
const VoiceResponse = twilio.twiml.VoiceResponse;
app.all('/', (request, response) => {
    response.type('xml');
    const twiml = new VoiceResponse();
    twiml.record({
        action: '/recording'
    });
    response.send(twiml.toString());
});
app.post('/recording', (request, response) => {
    const recordingUrl = request.body.RecordingUrl;
    const recordingLength = request.body.RecordingDuration;
    twilioClient.messages
        .create({
            to: '+918########', // To phone number where you want to send the message
            from: '+19#######', // the From phone number which you want to use
            body: 'Here is your recording - ' + recordingUrl + '. It is ' + recordingLength + ' seconds long.'
        })
        .then(message => {
            console.log(message.sid);
            response.sendStatus(200);
        })
        .catch(error => {
            console.log(error);
            response.sendStatus(500);
        });
});
app.listen(port, () => {
    console.log('Example app listening at http://localhost:' + port);
});
