# How it's works
1. First download the library that we need
````
pip install opencv-python
pip install numpy 
pip install dlib
pip install imutils
````
2. Connect the webcam to the program 
````
cap = cv2.VideoCapture(0)
while True:
    _, frame = cap.read()
    cv2.imshow('Facial Landmark', frame)
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
5. Change the BGR to the grayscale
````
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
````
6. Detect the face in the grayscale image
````
faces = detector(gray)
````
7. Convert the coordinates of facial landmark to a numpy
````
point = predictor(gray, face)
	    points = face_utils.shape_to_np(point)
````
8. Draw a point in a face 
````
 for (x, y) in points :
		    cv2.circle(frame, (x, y), 1, (0, 0, 255), 3)
````

# Demo

Clik the picture to see the Video
[![Watch the video](https://img.youtube.com/vi/ZAtPZghs_Y4/maxresdefault.jpg)](https://youtu.be/ZAtPZghs_Y4)
