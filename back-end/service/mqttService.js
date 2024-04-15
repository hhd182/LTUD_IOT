import { connect } from 'mqtt';

const mqtt_server = "mqtt://192.168.238.154";
const mqtt_username = "hhd";
const mqtt_password = "hhd";
const device_topic = "allcontrol";
const light_topic = "lightcontrol";
const fan_topic = "fancontrol";
const status_light_topic = "lightstatus";
const status_fan_topic = "fanstatus";
const status_all_topic = "allstatus";

let ledState = false;
let fanState = false;

function handleConnect() {
    console.log('Connected to MQTT broker');
    client.subscribe(device_topic);
    client.subscribe(light_topic);
    client.subscribe(fan_topic);
    client.subscribe(status_light_topic);
    client.subscribe(status_fan_topic);
    client.subscribe(status_all_topic);
}

export function handleMessage(topic, message) {
    console.log('Message received:', message.toString());
    const payload = JSON.parse(message);

    if (topic === device_topic || topic === light_topic) {
        if (payload.light === "ON") {
            // Control light ON
            ledState = true;
            client.publish(status_light_topic, "ON");
        } else if (payload.light === "OFF") {
            // Control light OFF
            ledState = false;
            client.publish(status_light_topic, "OFF");
        }
    }

    if (topic === device_topic || topic === fan_topic) {
        if (payload.fan === "ON") {
            // Control fan ON
            fanState = true;
            client.publish(status_fan_topic, "ON");
        } else if (payload.fan === "OFF") {
            // Control fan OFF
            fanState = false;
            client.publish(status_fan_topic, "OFF");
        }
    }

    // Publish status to all topic
    const statusMsg = `Light: ${ledState ? "ON" : "OFF"}, Fan: ${fanState ? "ON" : "OFF"}`;
    client.publish(status_all_topic, statusMsg);
}

export function handleError(error) {
    console.error('MQTT error:', error);
}

export function handleClose() {
    console.log('MQTT connection closed');
}

// Connect to MQTT broker
const client = connect(mqtt_server, {
    username: mqtt_username,
    password: mqtt_password
});

export function autoConnect() {
    if (!client.connected) {
        client.connect();
    }
}

client.on('connect', handleConnect);
client.on('message', handleMessage);
client.on('error', handleError);
client.on('close', handleClose);
