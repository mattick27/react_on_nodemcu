#include <Arduino.h>
#include <ArduinoJson.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>

const char* ssid = "Network SSID";
const char* password = "Password";
WiFiServer server(80);

static const uint8_t d1 = 5;
static const uint8_t d2 = 4;
int relay1 = d2;
int relay2 = d1;
int i = 0;

bool readRequest(WiFiClient& client) {
	bool currentLineIsBlank = true;
	while (client.connected()) {
		if (client.available()) {
			char c = client.read();
			if (c == '\n' && currentLineIsBlank) {
				return true;
			} else if (c == '\n') {
				currentLineIsBlank = true;
			} else if (c != '\r') {
				currentLineIsBlank = false;
			}
		}
	}
	return false;
}

JsonObject& prepareResponse(JsonBuffer& jsonBuffer) {
	JsonObject& root = jsonBuffer.createObject();

	JsonArray& analogValues = root.createNestedArray("Curtain");
	analogValues.add(i);

	return root;
}

void writeResponse(WiFiClient& client, JsonObject& json) {
	client.println("HTTP/1.1 200 OK");
	client.println("Content-Type: application/json");
	client.println("Connection: close");
	client.println();

	json.prettyPrintTo(client);
}

void stop() {
	digitalWrite(relay1, LOW);
	digitalWrite(relay2, LOW);
	delay(500);
}

void open() {
	digitalWrite(relay1, LOW);
	digitalWrite(relay2, HIGH);
	i = 1;
	delay(25000);	//30000
	stop();
}
void close() {
	digitalWrite(relay2, LOW);
	digitalWrite(relay1, HIGH);
	i = 0;
	delay(25000);
	stop();
}

void setup() {
	Serial.begin(115200);
	pinMode(relay1, OUTPUT);
	pinMode(relay2, OUTPUT);
	digitalWrite(relay1, LOW);
	digitalWrite(relay2, LOW);
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
	if (req.indexOf("/curtainoff") != -1) {
		Serial.println("curtain OFF");
		String web = "HTTP/1.1 200 OK\r\nContent-Type: application/xml\r\n\r\n";
		web += "<?xml version=\"1.0\" encoding='UTF-8'?>\r\n";
		web += "<wtf>\r\n";
		web += "<your-fucking-curtain-status>";
		web += "Curtain off";
		web += "</your-fucking-curtain-status>\r\n";
		web += "<your-fucking-i-variable>";
		web += i;
		web += "</your-fucking-i-variable>\r\n";
		web += "</wtf>\r\n";
		client.print(web);
		client.stop();
		close();
		Serial.println("finished");

	} else if (req.indexOf("/curtainon") != -1) {
		Serial.println("curtain ON");
		String web = "HTTP/1.1 200 OK\r\nContent-Type: application/xml\r\n\r\n";
		web += "<?xml version=\"1.0\" encoding='UTF-8'?>\r\n";
		web += "<wtf>\r\n";
		web += "<your-fucking-curtain-status>";
		web += "Curtain On";
		web += "</your-fucking-curtain-status>\r\n";
		web += "<your-fucking-i-variable>";
		web += i;
		web += "</your-fucking-i-variable>\r\n";
		web += "</wtf>\r\n";
		client.print(web);
		client.stop();
		open();
		Serial.println("finished");

	} else if (req.indexOf("/status") != -1) {
		StaticJsonBuffer<500> jsonBuffer;
		JsonObject& json = prepareResponse(jsonBuffer);
		client.println("HTTP/1.1 200 OK");
		client.println("Content-Type: application/json");
		client.println("Connection: close");
		client.println();
		json.prettyPrintTo(client);
		client.stop();
	} else
		stop();
	digitalWrite(relay1, LOW);
	digitalWrite(relay2, LOW);
}

