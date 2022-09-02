#include <WiFi.h>
#include <FirebaseESP32.h>

#define R1 26
#define R2 27
#define R3 14
#define R4 12

#define FIREBASE_HOST "aerochair-26ee4-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "BZnLuRlLjJC0JOYB4j3KAvQc7aWPWjJ9aX10GAVM"
#define WIFI_SSID "Aerochair"
#define WIFI_PASSWORD ""

FirebaseData firebaseData;
FirebaseJson json;

unsigned long previousMillisGetHR = 0; //--> will store the last time Millis (to get Heartbeat) was updated.
unsigned long previousMillisHR = 0; //--> will store the last time Millis (to get BPM) was updated.
unsigned long previousMillis_STO = 0;
const long intervalGetHR = 10; //--> Interval for reading heart rate (Heartbeat) = 10ms.
const long intervalHR = 10000; //--> Interval for obtaining the BPM value based on the sample is 10 seconds.
const int PulseSensorHRWire = 34; //--> PulseSensor connected to ANALOG PIN 0 (A0 / ADC 0).
int Threshold = 2000; //--> Determine which Signal to "count as a beat" and which to ignore.
int cntHB = 0; //--> Variable for counting the number of heartbeats.
boolean ThresholdStat = true; //--> Variable for triggers in calculating heartbeats.
int BPMval = 0; //--> Variable to hold the result of heartbeats calculation.


void setup() {
  pinMode(R1, OUTPUT);
  pinMode(R2, OUTPUT);
  pinMode(R3, OUTPUT);
  pinMode(R4, OUTPUT);

  Serial.begin(115200);
  delay(500);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(firebaseData, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(firebaseData, "tiny");
  Serial.println("------------------------------------");
  Serial.println("Connected...");

  Serial.println("Please wait 10 seconds to get the BPM Value");
}

void loop() {
  unsigned long currentMillisGetHR = millis();

  if (currentMillisGetHR - previousMillisGetHR >= intervalGetHR) {
    previousMillisGetHR = currentMillisGetHR;

    int PulseSensorHRVal = analogRead(PulseSensorHRWire);
    Serial.print("pulse : ");
    Serial.println(PulseSensorHRVal);

    if (PulseSensorHRVal > Threshold && ThresholdStat == true) {
      cntHB++;
      ThresholdStat = false;

    }

    if (PulseSensorHRVal < Threshold) {
      ThresholdStat = true;

    }
  }

  unsigned long currentMillisHR = millis();

  if (currentMillisHR - previousMillisHR >= intervalHR) {
    previousMillisHR = currentMillisHR;

    BPMval = cntHB * 6; //--> The taken heart rate is for 10 seconds. So to get the BPM value, the total heart rate in 10 seconds x 6.
    Serial.print("BPM : ");
    Serial.println(BPMval);
    cntHB = 0;
  }
  unsigned long currentMillis_STO = millis();
  if (currentMillis_STO - previousMillis_STO >= 10000) {
    previousMillis_STO = currentMillis_STO;
    json.set("/BPM", BPMval);
    Firebase.updateNode(firebaseData, "/ESP32", json);
  }

  // Motor Controll
  if (BPMval <= 70) {
    digitalWrite(R1, HIGH);
    digitalWrite(R2, HIGH);
    digitalWrite(R3, HIGH);
    digitalWrite(R4, HIGH);
  }
  else if (BPMval > 70 && BPMval <= 90) {
    digitalWrite(R1, LOW);
    digitalWrite(R2, LOW);
    digitalWrite(R3, LOW);
    digitalWrite(R4, LOW);
  }
  else if (BPMval > 100) {
    digitalWrite(R1, LOW);
    digitalWrite(R2, HIGH);
    digitalWrite(R3, HIGH);
    digitalWrite(R4, LOW);
  }
}
