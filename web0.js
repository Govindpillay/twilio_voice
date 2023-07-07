const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const app = express()
const port = 3000

const VoiceResponse = require('twilio').twiml.VoiceResponse
app.all('/', (request, response) => {
    response.type('xml')
    const twiml = new VoiceResponse()
    twiml.say('Hello from the server.');
    
    response.send(twiml.toString())
})
app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
})
