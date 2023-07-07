const express = require('express')
const { twiml } = require('twilio')
const app = express()
const port = 3000
const VoiceResponse = require('twilio').twiml.VoiceResponse
app.all('/', (request, response) => {
    response.type('xml')
    const twiml = new VoiceResponse()
    twiml.say('Hello from the server.')
    const now = new Date()
    if (now.getHours() > 17) {//if time is now 17:00
        twiml.say("The is closed")
    } else {
        twiml.say('The office is open')
    }
    response.send(twiml.toString())
})
app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
})
