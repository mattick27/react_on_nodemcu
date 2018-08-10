#include <Arduino.h>
#include <ArduinoJson.h>
#include <Ethernet.h>
#include <ESP8266WiFi.h>

static const uint8_t d5 = 14;
static const uint8_t d6 = 12;
static const uint8_t d7 = 13;
int light[3] = { 0, 0, 0 };
//Assign SSID
const char* ssid = "Network SSID";
const char* password = "Password";
WiFiServer server(80);

JsonObject& prepareResponse(JsonBuffer& jsonBuffer) {
	JsonObject& root = jsonBuffer.createObject();

	JsonArray& led1 = root.createNestedArray("led1");
	led1.add(light[0]);
	JsonArray& led2 = root.createNestedArray("led2");
	led2.add(light[1]);
	JsonArray& led3 = root.createNestedArray("led3");
	led3.add(light[2]);

	return root;
}

void setup() {
	Serial.begin(115200);
	pinMode(d5, OUTPUT);
	pinMode(d6, OUTPUT);
	pinMode(d7, OUTPUT);
	digitalWrite(d5, HIGH);
	digitalWrite(d6, HIGH);
	digitalWrite(d7, HIGH);
	Serial.print("Connecting to ");
	Serial.println(ssid);
	WiFi.begin(ssid, password);           //เชื่อมต่อกับ AP
	while (WiFi.status() != WL_CONNECTED)     //รอการเชื่อมต่อ
	{
		delay(500);
		Serial.print(".");
	}
	Serial.println("");
	Serial.println("WiFi connected");     //แสดงข้อความเชื่อมต่อสำเร็จ
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
	if (req.indexOf("/led1off") != -1) {
		light[0] = 0;
		digitalWrite(d5, HIGH);
		Serial.println("LED1 OFF");

	} else if (req.indexOf("/led1on") != -1) {
		light[0] = 1;
		digitalWrite(d5, LOW);
		Serial.println("LED1 ON");

	} else if (req.indexOf("/led2off") != -1) {
		light[1] = 0;
		digitalWrite(d6, HIGH);
		Serial.println("LED2 OFF");

	} else if (req.indexOf("/led2on") != -1) {
		light[1] = 1;
		digitalWrite(d6, LOW);
		Serial.println("LED2 ON");

	} else if (req.indexOf("/led3off") != -1) {
		light[2] = 0;
		digitalWrite(d7, HIGH);
		Serial.println("LED3 OFF");

	} else if (req.indexOf("/led3on") != -1) {
		light[2] = 1;
		digitalWrite(d7, LOW);
		Serial.println("LED3 ON");

	}else if (req.indexOf("/status") != -1) {
		StaticJsonBuffer<500> jsonBuffer;
		JsonObject& json = prepareResponse(jsonBuffer);
		client.println("HTTP/1.1 200 OK");
		client.println("Content-Type: application/json");
		client.println("Connection: close");
		client.println();
		json.prettyPrintTo(client);

	}
}
