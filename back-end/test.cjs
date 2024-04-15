const express = require('express');
const mqtt = require('mqtt');

const app = express();
const mqttClient = mqtt.connect('mqtt://localhost:1882', {
    username: 'hhd',
    password: 'hhd'
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('error', (error) => {
    console.error('MQTT error:', error);
});

app.get('/control/:device/:action', (req, res) => {
    const { device, action } = req.params;
    let topic, message;

    if (device === 'light' || device === 'fan') {
        topic = `${device}control`;
        message = action.toUpperCase();
        mqttClient.publish(topic, message);
        res.send(`Published to topic ${topic}: ${message}`);
    } else {
        res.status(400).send('Invalid device');
    }
});

app.listen(3000, () => {
    console.log('Express server is running on port 3000');
});
