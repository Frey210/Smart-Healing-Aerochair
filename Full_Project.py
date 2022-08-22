import pyrebase
import cv2
import numpy as np
import dlib
from imutils import face_utils
import imutils
from scipy.spatial import distance as dist

#Initialize Firebase
firebaseConfig={"apiKey": "AIzaSyAIapKgF8yGfiGt4RALifBAPe_Dd2u6N1k",
    "authDomain": "aerochair09.firebaseapp.com",
    "databaseURL": "https://aerochair09-default-rtdb.firebaseio.com",
    "projectId": "aerochair09",
    "storageBucket": "aerochair09.appspot.com",
    "messagingSenderId": "541771150374",
    "appId": "1:541771150374:web:bd70b5359fee4afbe422e7",
    "measurementId": "G-JV3JV843GS"}

firebase=pyrebase.initialize_app(firebaseConfig)

db=firebase.database()

db.child("Raspberry pi 4").child("Mata").set({"state":"Normal"})
db.child("Raspberry pi 4").child("Mulut").set({"state":"Normal"})

def calculate_EAR(eye):
	A = dist.euclidean(eye[1], eye[5])
	B = dist.euclidean(eye[2], eye[4])
	C = dist.euclidean(eye[0], eye[3])

	EAR = (A + B) / (2.0 * C)

	return EAR
def calculate_lip(lips):
	dist1 = dist.euclidean(lips[2], lips[6]) 
	dist2 = dist.euclidean(lips[0], lips[4]) 

	LAR = float(dist1/dist2)

	return LAR

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]

counter = 0
eyes_ear = 0.2
eyes_per_frame = 48
counter = 0
counter1 = 0
lip_LAR = 0.4
lip_per_frame = 30

cap = cv2.VideoCapture(1)

detector = dlib.get_frontal_face_detector() 
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat") 

while True:
	_, frame = cap.read()
	frame = imutils.resize(frame, width = 500)
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
	faces = detector(gray)

	for (i, face) in enumerate(faces):
		lips = [60,61,62,63,64,65,66,67]
		point = predictor(gray, face)
		points = face_utils.shape_to_np(point)
		lip_point = points[lips]
		LAR = calculate_lip(lip_point) 
		(x, y, w, h) = face_utils.rect_to_bb(face)
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
		cv2.putText(frame, "ATC on Duty", (x - 10, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
		leftEye = points[lStart:lEnd]
		rightEye = points[rStart:rEnd]
		leftEAR = calculate_EAR(leftEye)
		rightEAR = calculate_EAR(rightEye)
		EAR = (leftEAR + rightEAR) / 2.0

		leftEyeHull = cv2.convexHull(leftEye)
		rightEyeHull = cv2.convexHull(rightEye)
		cv2.drawContours(frame, [leftEyeHull], -1, (0, 0, 255), 1)
		cv2.drawContours(frame, [rightEyeHull], -1, (0, 0, 255), 1)
		lip_hull = cv2.convexHull(lip_point)
		cv2.drawContours(frame, [lip_hull], -1, (0, 255, 0), 1)
	   
		if EAR < eyes_ear:
			counter += 1
			if counter > eyes_per_frame:
				cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
				db.child("Raspberry pi 4").child("Mata").update({"state":"Tidur"})

		else:
			counter=0
			db.child("Raspberry pi 4").child("Mata").update({"state":"Normal"})

		cv2.putText(frame, "Eye Distance: {:.2f}".format(EAR), (300, 30),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
		
		if LAR > lip_LAR:
			counter1 += 1
			if counter1 > lip_per_frame:
				cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
				db.child("Raspberry pi 4").child("Mulut").update({"state":"Ngantuk"})
		else:
			counter1 = 0
			db.child("Raspberry pi 4").child("Mulut").update({"state":"Normal"})
		cv2.putText(frame, "LAR: {:.2f}".format(LAR), (300, 60),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2) 
	cv2.imshow("Sleepy detection", frame)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

cap.release()
cv2.destroyAllWindows
