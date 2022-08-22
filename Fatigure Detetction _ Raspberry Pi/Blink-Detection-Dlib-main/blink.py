import cv2
import numpy as np
import dlib
# from playsound import playsound
from imutils import face_utils
from scipy.spatial import distance as dist

def calculate_EAR(eye):
	A = dist.euclidean(eye[1], eye[5])
	B = dist.euclidean(eye[2], eye[4])
	C = dist.euclidean(eye[0], eye[3])

	EAR = (A + B) / (2.0 * C)

	return EAR

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_68_IDXS["right_eye"]

counter = 0
eyes_ear = 0.2
eyes_per_frame = 48

cap = cv2.VideoCapture(0)

detector = dlib.get_frontal_face_detector() 
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat") 

while True:
	_, frame = cap.read()
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
	faces = detector(gray)

	for (i, face) in enumerate(faces):
		point = predictor(gray, face)
		points = face_utils.shape_to_np(point)
		leftEye = points[lStart:lEnd]
		rightEye = points[rStart:rEnd]
		leftEAR = calculate_EAR(leftEye)
		rightEAR = calculate_EAR(rightEye)
		EAR = (leftEAR + rightEAR) / 2.0

		leftEyeHull = cv2.convexHull(leftEye)
		rightEyeHull = cv2.convexHull(rightEye)
		cv2.drawContours(frame, [leftEyeHull], -1, (0, 0, 255), 1)
		cv2.drawContours(frame, [rightEyeHull], -1, (0, 0, 255), 1)
	   
		if EAR < eyes_ear:
			counter += 1
			if counter > eyes_per_frame:
				cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
				# playsound("bangun.mp3")
		else:
			counter = 0
            
		cv2.putText(frame, "Eye Distance: {:.2f}".format(EAR), (300, 30),
		cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

	cv2.imshow("Blink Detection", frame)
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

cap.release()
cv2.destroyAllWindows
