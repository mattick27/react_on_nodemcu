#include <Arduino.h>
#include <ArduinoJson.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>
static const uint8_t d4 = 2;

//Assign SSID
const char* ssid = "Network SSID";
const char* password = "Password";
WiFiServer server(80);

int buttonState = 0;
int sensorPin = A0;
int moisture = 0;
int pump = d4;

JsonObject& prepareResponse(JsonBuffer& jsonBuffer) {
	JsonObject& root = jsonBuffer.createObject();

	JsonArray& analogValues = root.createNestedArray("pump");
	analogValues.add(buttonState);

	return root;
}

void setup() {
	Serial.begin(115200);
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
	pinMode(sensorPin, INPUT);
	pinMode(pump, OUTPUT);
	digitalWrite(pump,HIGH);
}
void loop() {

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
	if (req.indexOf("/pumpon") != -1) {
		digitalWrite(pump, LOW);
		Serial.println("pump ON");
		String web = "HTTP/1.1 200 OK\r\nContent-Type: application/xml\r\n\r\n";
		web += "<?xml version=\"1.0\" encoding='UTF-8'?>\r\n";
		web += "<wtf>\r\n";
		web += "<your-fucking-pump-status>";
		web += "Pump On";
		web += "</your-fucking-pump-status>\r\n";
		web += "</wtf>\r\n";
		client.print(web);
		client.stop();

	} else if (req.indexOf("/pumpoff") != -1) {
		digitalWrite(pump, HIGH);
		Serial.println("pump OFF");
		String web = "HTTP/1.1 200 OK\r\nContent-Type: application/xml\r\n\r\n";
		web += "<?xml version=\"1.0\" encoding='UTF-8'?>\r\n";
		web += "<wtf>\r\n";
		web += "<your-fucking-pump-status>";
		web += "Pump Off";
		web += "</your-fucking-pump-status>\r\n";
		web += "</wtf>\r\n";
		client.print(web);
		client.stop();

	} else if (req.indexOf("/status") != -1) {
		StaticJsonBuffer<500> jsonBuffer;
		JsonObject& json = prepareResponse(jsonBuffer);
		client.println("HTTP/1.1 200 OK");
		client.println("Content-Type: application/json");
		client.println("Connection: close");
		client.println();
		json.prettyPrintTo(client);
		client.stop();
	}



}
