const express = require('express');
const { urlencoded } = require('body-parser');
const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));
const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.all('/', (request, response) => {
    response.type('xml');
    const twiml = new VoiceResponse();
    twiml.say('Hello from the server.');
    const gather = twiml.gather({
        input: 'speech', // the speech from user
        action: '/results',
        language: 'en-GB',
        speechModel: 'phone_call',
        hints: 'love, hate',
        speechTimeout: 'auto'
    });
    gather.say('Say the name of your favorite love and hate song.');
    response.send(twiml.toString());
});

app.all('/results', (request, response) => {
    const userInput = request.body.SpeechResult;
    const confidence = request.body.confidence;
    const twiml = new VoiceResponse();

    if (userInput.includes('love')) {
        twiml.play('Use the Twilio Assest to upload your file');
    } else if (userInput.includes('hate')) {
        twiml.play('use the Twilio Assest to upload your file');
    } else {
        twiml.say("I didn't understand that.");
    }

    response.send(twiml.toString());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
