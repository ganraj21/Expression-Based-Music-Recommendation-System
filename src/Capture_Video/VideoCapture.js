import React, { useRef, useState, useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Webcam from 'react-webcam';
import './VideoCapture.css';
import { MusicContext } from '../MusicContext';

const VideoCapture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [EmotionValue, setEmotionValue] = useState(null);
  const { userId } = useContext(MusicContext);

  const captureImage = async () => {
    if (!webcamRef.current || !canvasRef.current) {
      return;
    }

    const video = webcamRef.current.video;

    if (!video) {
      console.error('Video element not available.');
      return;
    }

    const canvas = canvasRef.current;

    try {
      // Set smaller dimensions for the captured image
      const smallWidth = 160;
      const smallHeight = 220;

      // Capture a single frame from the webcam
      canvas.width = smallWidth;
      canvas.height = smallHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, smallWidth, smallHeight);

      // Get the image data from the canvas
      const imageSrc = canvas.toDataURL('image/jpeg');
      console.log(imageSrc);
      // Run face detection on the captured image
      await handleFaceDetectionResults(imageSrc);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  const handleFaceDetectionResults = async (face) => {
    console.log('FaceDetection Model is Loaded..');
    toast.success('FaceDetection Model is Loaded..');

    // setTimeout(() => {
    //   const e = JSON.parse(localStorage.getItem('FPath'));
    //   console.log(e);
    //   navigate(`/user/playlist/${e.title}`, {
    //     state: {
    //       e,
    //     },
    //   });
    // }, 4000);

    // }
    // Websocket
    var socket = new WebSocket('ws://localhost:8000');

    var apiCall = {
      event: 'localhost:subscribe',
      data: {
        image: webcamRef.current.getScreenshot(),
      },
    };

    socket.onopen = () => socket.send(JSON.stringify(apiCall));
    socket.onmessage = function (event) {
      var pred_log = JSON.parse(event.data);

      // Log the received prediction data for debugging
      console.log('Received prediction data:', pred_log);

      // Ensure that 'emotion' property exists in pred_log
      if (pred_log && pred_log['emotion']) {
        // Get the emotion value
        const emotionValue = pred_log['emotion'];

        // Set the emotion_text input value
        setEmotionValue(emotionValue);
        toast.success(emotionValue);

        // Update localStorage if needed
        localStorage.setItem('User-Emotion', emotionValue);
      } else {
        console.error('Emotion data not found in prediction:', pred_log);
      }
    };

    socket.onerror = function (error) {
      console.error('WebSocket Error:', error);
      setTimeout(() => {
        toast.error('Socket Connection Error. Please try again later.');
        navigate(`/user/${userId}`);
      }, 2000);
    };
  };

  const removeImage = () => {
    // Clear the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setEmotionValue('');
  };

  return (
    <div className="front_page_container">
      <Toaster toastOptions={{ duration: 3000 }} />
      <div className="cameraContainer">
        <div className="cameraSettingComponent">
          <div className="mainWebCam">
            <Webcam ref={webcamRef} />
          </div>
        </div>
        <div className="operationSettingComponent">
          <div className="captureContainer">
            <div className="mainCanvas">
              <canvas ref={canvasRef} />
            </div>
            <div className="operationsBtn">
              <div className="InputDectectionDiv">
                <input
                  id="emotion_text"
                  name="emotion_text"
                  value={EmotionValue}
                />
              </div>

              <div className="captureImgDiv">
                <button className="startRec" onClick={captureImage}>
                  Capture Image
                </button>
              </div>

              <div className="removeImgdiv">
                <button className="removeImage" onClick={removeImage}>
                  Remove Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCapture;
