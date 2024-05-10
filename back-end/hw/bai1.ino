#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>
#define DHTPIN D5
#define DHTTYPE DHT11
#define LIGHT_SENSOR_PIN A0
DHT_Unified dht(DHTPIN, DHTTYPE);

const char *ssid = "hh";
const char *password = "01082002c";
const char *mqtt_server = "192.168.146.154";
const char *mqtt_username = "hhd";
const char *mqtt_password = "hhd";

const char *data_topic = "datasensor";
const char *device_topic = "allcontrol";
const char *light_topic = "lightcontrol";
const char *fan_topic = "fancontrol";
const char *status_light_topic = "lightstatus";
const char *status_fan_topic = "fanstatus";
const char *status_all_topic = "allstatus";
WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
float temp, hum, light, dust;
bool ledState = LOW;
bool fanState = LOW;

void setup_wifi()
{
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(200);
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");

    char payloadStr[length + 1];
    for (int i = 0; i < length; i++)
    {
        payloadStr[i] = (char)payload[i];
    }
    payloadStr[length] = '\0';
    Serial.println(payloadStr);
    DynamicJsonDocument doc(256);
    deserializeJson(doc, payloadStr);
    String statusMsg = "";

    if (strcmp(topic, device_topic) == 0)
    {
        if (doc["light"] == "ON")
        {
            digitalWrite(D6, HIGH);
            ledState = HIGH;
            client.publish(status_light_topic, "ON");
        }
        else if (doc["light"] == "OFF")
        {
            digitalWrite(D6, LOW);
            ledState = LOW;
            client.publish(status_light_topic, "OFF");
        }
        if (doc["fan"] == "ON")
        {
            digitalWrite(D7, HIGH);
            fanState = HIGH;
            client.publish(status_fan_topic, "ON");
        }
        else if (doc["fan"] == "OFF")
        {
            digitalWrite(D7, LOW);
            fanState = LOW;
            client.publish(status_fan_topic, "OFF");
        }
        statusMsg = "Light: " + String(ledState == HIGH ? "ON" : "OFF") + ", Fan: " + String(fanState == HIGH ? "ON" : "OFF");
        client.publish(status_all_topic, statusMsg.c_str());
    }
    else if (strcmp(topic, light_topic) == 0)
    {
        if (strcmp(payloadStr, "ON") == 0)
        {
            digitalWrite(D6, HIGH);
            ledState = HIGH;
            client.publish(status_light_topic, "ON");
        }
        else if (strcmp(payloadStr, "OFF") == 0)
        {
            digitalWrite(D6, LOW);
            ledState = LOW;
            client.publish(status_light_topic, "OFF");
        }
        statusMsg = "Light: " + String(ledState == HIGH ? "ON" : "OFF") + ", Fan: " + String(fanState == HIGH ? "ON" : "OFF");
        client.publish(status_all_topic, statusMsg.c_str());
    }
    else if (strcmp(topic, fan_topic) == 0)
    {
        if (strcmp(payloadStr, "ON") == 0)
        {
            digitalWrite(D7, HIGH);
            fanState = HIGH;
            client.publish(status_fan_topic, "ON");
        }
        else if (strcmp(payloadStr, "OFF") == 0)
        {
            digitalWrite(D7, LOW);
            fanState = LOW;
            client.publish(status_fan_topic, "OFF");
        }
        statusMsg = "Light: " + String(ledState == HIGH ? "ON" : "OFF") + ", Fan: " + String(fanState == HIGH ? "ON" : "OFF");
        client.publish(status_all_topic, statusMsg.c_str());
    }
}
void reconnect()
{
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        String clientId = "ESP8266Client-";
        clientId += String(random(0xffff), HEX);
        if (client.connect(clientId.c_str(), mqtt_username, mqtt_password))
        {
            Serial.println("connected");
            client.subscribe(device_topic);
            client.subscribe(light_topic);
            client.subscribe(fan_topic);
            client.subscribe(status_light_topic);
            client.subscribe(status_fan_topic);
            client.subscribe(status_all_topic);
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}
void setup()
{
    pinMode(D6, OUTPUT);
    pinMode(D7, OUTPUT);
    dht.begin();
    sensor_t sensor;
    dht.temperature().getSensor(&sensor);
    dht.humidity().getSensor(&sensor);
    Serial.begin(115200);
    setup_wifi();
    client.setServer(mqtt_server, 1882);
    client.setCallback(callback);
}
void loop()
{
    if (!client.connected())
    {
        reconnect();
    }
    client.loop();
    unsigned long now = millis();
    if (now - lastMsg > 3000)
    {
        lastMsg = now;
        sensors_event_t event;
        dht.temperature().getEvent(&event);
        if (!isnan(event.temperature))
        {
            temp = event.temperature;
        }
        dht.humidity().getEvent(&event);
        if (!isnan(event.relative_humidity))
        {
            hum = event.relative_humidity;
        }
        int lightValue = analogRead(LIGHT_SENSOR_PIN);
        light = lightValue;

        // new sensor
        int dustValue = random(1, 101);
        dust = dustValue;

        String msgStr = "{\"temperature\":" + String(temp) + ",\"humidity\":" + String(hum) + ",\"light\":" + String((int)light) + ",\"dust\":" + String((int)dust) + "}";
        Serial.print(msgStr);
        Serial.print("\n");
        char msg[msgStr.length() + 1];
        msgStr.toCharArray(msg, sizeof(msg));
        client.publish(data_topic, msg);
        delay(5000);
    }
}