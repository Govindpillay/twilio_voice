const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));
const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.all('/', (request, response) => {
    response.type('xml');
    const twiml = new VoiceResponse();
    twiml.say('Hello from the server.');
    const gather = twiml.gather({
        input: 'dtmf', //the tune from the phone button
        action: '/results'
    });
    gather.say('Press 1 for track 1 or Press 2 for track 2');
    response.send(twiml.toString());
});

app.all('/results', (request, response) => {
    const userInput = request.body.Digits;
    const twiml = new VoiceResponse();
    switch (request.body.Digits) {
        case '1':
            twiml.say('You selected option 1.');
            break;
        case '2':
            twiml.say('You selected option 2.');
            break;
        default:
            twiml.say("Sorry, I don't understand that choice.");
            const gather = twiml.gather({ input: 'dtmf' });
            gather.say('Press 1 for track 1 or Press 2 for track 2');
            break;
    }
    response.send(twiml.toString());
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
