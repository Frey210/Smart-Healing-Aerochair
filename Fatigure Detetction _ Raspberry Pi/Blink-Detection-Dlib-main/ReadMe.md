# How it's works
1. First import the libaray that we need
````
import cv2
import numpy as np
import dlib
from playsound import playsound
from imutils import face_utils
from scipy.spatial import distance as dist
````
2. Connect the webcam to the program 
````
cap = cv2.VideoCapture(0)
while True:
    _, frame = cap.read()
    cv2.imshow('Blink detection', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
````
3. Make the program to target or detect the face
````
detector = dlib.get_frontal_face_detector() 
````
4. Insert the libary that we need
````
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat") 
````
5. Calculate the coordinates/indexes for the vertical eye and horizontal eye (x,y)
````
def calculate_EAR(eye):
	A = dist.euclidean(eye[1], eye[5]) # for horizontal
	B = dist.euclidean(eye[2], eye[4]) # for horizontal 
	C = dist.euclidean(eye[0], eye[3]) # for vertikal
````
6. Calculate the ratio of the eye using the coordinates/indexes that have been obtained
````
EAR = (A + B) / (2.0 * C)`
````
7. Find the index of right and left eye 
````
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
`````
8.Determine the eye aspect ratio for sleepy and the number of frames the person has closed their eye
````
counter = 0
eyes_ear = 0.2
eyes_per_frame = 48
````
9. Change the BGR to the grayscale
````
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
````
10. Detect the face in the grayscale image
````
faces = detector(gray)
````
11. Convert the coordinates/indexes of facial landmark to a numpy
````
point = predictor(gray, face)
points = face_utils.shape_to_np(point)
````
12. Convert the coordinates of the right and left eyes using numpy array
````
leftEye = points[lStart:lEnd]
rightEye = points[rStart:rEnd]
````
13. Calculate the eye aspect ratio
````
leftEAR = calculate_EAR(leftEye)
rightEAR = calculate_EAR(rightEye)
EAR = (leftEAR + rightEAR) / 2.0
````

# Demo

Clik the picture to see the Video
[![Watch the video](https://img.youtube.com/vi/pu1ot_mDYnc/maxresdefault.jpg)](https://youtu.be/pu1ot_mDYnc)
