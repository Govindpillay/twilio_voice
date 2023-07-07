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
        action: '/recording',
        transcribe: true,
        transcribeCallback: '/transcript'
    });
    response.send(twiml.toString());
});

app.all('/transcribe', (request, response) => {
    const transcriptionText = request.body.TranscriptionText;
    const transcriptionStatus = request.body.TranscriptionStatus;


    if (transcriptionStatus === 'completed') {
        twilioClient.messages
            .create({
                to: '+918096608507',
                from: '+19378979318',
                body: 'Here is your transcript - ' + transcriptionText
            }).then(message => {
                console.log(message.sid);
                response.log(200);
            }).catch(error => {
                console.log(error);
                response.log(500);
            })
    } else {
        console.log('transcription failed')
        response.send(200);
    }


})



app.all('/recording', (request, response) => {
    const recordingUrl = request.body.RecordingUrl;
    const recordingLength = request.body.RecordingDuration;
    twilioClient.messages
        .create({
            to: '+918096608507',
            from: '+19378979318',
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
