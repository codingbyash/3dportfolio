// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const DIALOGFLOW_API = require('../helper_functions/dialogflow_api'); // Adjust the path as needed

router.get('/website', async (req, res) => {
    let text = req.query.text;
    let sessionId = req.query.mysession;

    console.log('A request came.');
    console.log(`Query text --> ${text}`);
    console.log(`Session id --> ${sessionId}`);

    try {
        let intentData = await DIALOGFLOW_API.detectIntent('en', text, sessionId);

        res.setHeader('Access-Control-Allow-Origin', '*');

        if (intentData.status === 1) {
            res.send(intentData.text);
        } else {
            res.send('Chatbot is having a problem. Try again after some time.');
        }
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
