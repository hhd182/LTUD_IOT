import { connect } from 'mqtt';

const mqttClient = connect('http://localhost:1882', {
    username: 'hhd',
    password: 'hhd'
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('error', (error) => {
    console.error('MQTT error:', error);
});


export default mqttClient;
