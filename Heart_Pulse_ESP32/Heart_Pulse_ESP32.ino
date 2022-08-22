#include <WiFi.h>
#include <FirebaseESP32.h> 

#define R1 26
#define R2 27
#define R3 14
#define R4 12

//Rule Base
float suhu [3];
 
#define FIREBASE_HOST "aerochair-37e9e-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "Bf4658OdwvrMIAsPTmAnT5IqUu9opkMQqbuj1uHz"
#define WIFI_SSID "6"
#define WIFI_PASSWORD ""

FirebaseData firebaseData;
FirebaseJson json;

unsigned long previousMillisGetHR = 0; //--> will store the last time Millis (to get Heartbeat) was updated.
unsigned long previousMillisHR = 0; //--> will store the last time Millis (to get BPM) was updated.
const long intervalGetHR = 10; //--> Interval for reading heart rate (Heartbeat) = 10ms.
const long intervalHR = 10000; //--> Interval for obtaining the BPM value based on the sample is 10 seconds.
const int PulseSensorHRWire = 34; //--> PulseSensor connected to ANALOG PIN 0 (A0 / ADC 0).
int Threshold = 2400; //--> Determine which Signal to "count as a beat" and which to ignore.
int cntHB = 0; //--> Variable for counting the number of heartbeats.
boolean ThresholdStat = true; //--> Variable for triggers in calculating heartbeats.
int BPMval = 0; //--> Variable to hold the result of heartbeats calculation.


void GetHeartRate() {

  unsigned long currentMillisGetHR = millis();

  if (currentMillisGetHR - previousMillisGetHR >= intervalGetHR) {
    previousMillisGetHR = currentMillisGetHR;

    int PulseSensorHRVal = analogRead(PulseSensorHRWire);

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
    json.set("/BPM", BPMval);
    cntHB = 0;
  }

}

void setup() {
  // put your setup code here, to run once:
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
 
  /*
  This option allows get and delete functions (PUT and DELETE HTTP requests) works for device connected behind the
  Firewall that allows only GET and POST requests.
  
  Firebase.enableClassicRequest(firebaseData, true);
  */
 
  //String path = "/data";
  
 
  Serial.println("------------------------------------");
  Serial.println("Connected...");
  
  Serial.println("Please wait 10 seconds to get the BPM Value");
}

void loop() {

  GetHeartRate(); //--> Calling the GetHeartRate() subroutine
  Firebase.updateNode(firebaseData,"/ESP32",json);

  if (BPMval <= 60) setMotor(0);
  else if (BPMval > 60 && BPMval < 80) setMotor(1);
  else if (BPMval > 80) setMotor(2);
}
