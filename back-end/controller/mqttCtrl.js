import { connect } from 'mqtt';

const mqttClient = connect('mqtt://192.168.104.154:1882', {
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
