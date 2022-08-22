import cv2
import numpy as np
import dlib
from imutils import face_utils

cap = cv2.VideoCapture(1)

detector = dlib.get_frontal_face_detector() 
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat") 

while True:
    _, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    faces = detector(gray)

    for (i, face) in enumerate(faces):
	    point = predictor(gray, face)
	    points = face_utils.shape_to_np(point)
        
	    for (x, y) in points :
		    cv2.circle(frame, (x, y), 1, (0, 0, 255), 3)
            
    cv2.imshow("Facial landmark", frame )
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows
