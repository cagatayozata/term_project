// ############# LIBRARIES ############### //

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>
#include <LiquidCrystal.h>

// ############# VARIABLES ############### //

const int serial = 9600;
const char* ssid = "***";
const char* password = "***";
const char* serverName = "***";

unsigned long timerDelay = 5000;

// ############# OBJECTS ############### //

LiquidCrystal lcd(12, 11, 10, 9, 8, 7);

// ############# PROTOTYPES ############### //

void initSerial();
void initWiFi();

// ############## SETUP ################# //

void setup() {
  initSerial();
  initWiFi();
  lcd.begin(16, 2);
}

// ############### LOOP ################# //

void loop() {

  if(WiFi.status()== WL_CONNECTED){
    
    WiFiClient client;
    HTTPClient http;
    
    // Send request
    http.useHTTP10(true);
    http.begin(client, "http://localhost:4000/api/board/");
    http.GET();
    DynamicJsonDocument doc(2048);
    deserializeJson(doc, http.getStream());

    const char* title = doc["title"];
    const char* message = doc["message"];
        
    lcd.print(title);
    delay(3000);
    lcd.setCursor(0,1);
    lcd.print(message); 
    delay(3000); 
    lcd.clear();
    lcd.blink();
    delay(4000); 

    // Disconnect
    http.end();
      
    delay(timerDelay);
    
  }
  else {
    Serial.println("WiFi Disconnected");
  }
    
}

// ############### OTHER ################# //

void initSerial() {
  Serial.begin(serial);
}

void initWiFi() {
  delay(100);
  Serial.println("Connecting" + String(ssid));
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to " + String(ssid) + " | IP => ");
  Serial.println(WiFi.localIP());
}
