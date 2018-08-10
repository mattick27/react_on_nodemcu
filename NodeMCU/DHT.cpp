#include <Arduino.h>
#include <ArduinoJson.h>
#include "DHT.h"
#include <Ethernet.h>
#include <ESP8266WiFi.h>
//Assign SSID
const char* ssid = "Network SSID";
const char* password = "Password";
WiFiServer server(80);

#define DHTPIN 5 	//DHT pin
#define DHTTYPE DHT21
DHT dht(DHTPIN, DHTTYPE);
const int sensor = 2;
int state;

JsonObject& prepareResponse(JsonBuffer& jsonBuffer, float hum1, float temp1,
		float gas1) {
	JsonObject& root = jsonBuffer.createObject();

	JsonArray& temp = root.createNestedArray("Temperature");
	temp.add(temp1);
	JsonArray& hum = root.createNestedArray("Humidity");
	hum.add(hum1);
	JsonArray& gas = root.createNestedArray("Gas");
	gas.add(gas1);

	return root;
}

void setup() {
	Serial.begin(115200);
	Serial.println("DHTxx test!");
	pinMode(sensor, INPUT_PULLUP); //door senser pin
	pinMode(A0, INPUT); 	//gas detected senser pin
	Serial.println();
	Serial.println();
	Serial.print("Connecting to ");
	Serial.println(ssid);
	WiFi.begin(ssid, password);
	while (WiFi.status() != WL_CONNECTED)
	{
		delay(500);
		Serial.print(".");
	}
	Serial.println("");
	Serial.println("WiFi connected");
	server.begin();
	Serial.println("Server started");
	Serial.println(WiFi.localIP());
	dht.begin();
}

void loop() {
	float vol;
	int senservalue = analogRead(A0);
	vol = (float) senservalue / 1024 * 5.0;
	state = digitalRead(sensor);

	if (state == HIGH) {
		//Serial.println("alert");

	} else {
	}
	float h = dht.readHumidity();
	float t = dht.readTemperature();
	float f = dht.readTemperature(true);
	// Check if any reads failed and exit early (to try again).
	if (isnan(h) || isnan(t) || isnan(f)) {
		Serial.println("Failed to read from DHT sensor!");
		return;
	}
	// Compute heat index in Fahrenheit (the default)
	float hif = dht.computeHeatIndex(f, h);
	// Compute heat index in Celsius (isFahreheit = false)
	float hic = dht.computeHeatIndex(t, h, false);
//	Serial.print("Humidity: ");
//	Serial.print(h);
//	Serial.print(" %\t");
//	Serial.print("Temperature: ");
//	Serial.print(t);
//	Serial.print(" *C ");
//	Serial.print("gas value");
//	Serial.print(vol, 1);

	WiFiClient client = server.available();
	if (!client) {
		return;
	}

	Serial.println("new client");
	while (!client.available()) {
		delay(1);
	}

	String req = client.readStringUntil('\r');
	Serial.println(req);
	client.flush();
	if (req.indexOf("/status") != -1) {
		StaticJsonBuffer<500> jsonBuffer;
		JsonObject& json = prepareResponse(jsonBuffer, h, t, vol);
		client.println("HTTP/1.1 200 OK");
		client.println("Content-Type: application/json");
		client.println("Connection: close");
		client.println();
		json.prettyPrintTo(client);
	}
	client.stop();
}
