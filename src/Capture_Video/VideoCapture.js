import React, { useRef, useEffect, useState } from 'react';
import '../App.css';
import * as tf from '@tensorflow/tfjs';
import { drawMesh } from '../utilities';
import { useNavigate } from 'react-router-dom';
import * as blazeface from '@tensorflow-models/blazeface';
import toast, { Toaster } from 'react-hot-toast';
import Webcam from 'react-webcam';

const VideoCapture = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [next, setNext] = useState(0);
  const navigate = useNavigate();

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
      const smallHeight = 120;

      // Capture a single frame from the webcam
      canvas.width = smallWidth;
      canvas.height = smallHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, smallWidth, smallHeight);

      // Get the image data from the canvas
      const imageSrc = canvas.toDataURL('image/jpeg');

      // Run face detection on the captured image
      await runFaceDetectorModel(imageSrc);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  const runFaceDetectorModel = async (imageSrc) => {
    const model = await blazeface.load();
    console.log('FaceDetection Model is Loaded..');
    toast.success('FaceDetection Model is Loaded..');

    try {
      // Create an HTMLImageElement from the Data URL
      const image = new Image();
      image.src = imageSrc;

      // Wait for the image to load
      await image.decode();

      // Make Detections
      const face = await model.estimateFaces(image);

      // Handle face detection results
      handleFaceDetectionResults(face);
    } catch (error) {
      console.error('Error running face detection:', error);
    }
  };

  const handleFaceDetectionResults = (face) => {
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
        document.getElementById('emotion_text').value = emotionValue;

        // Update localStorage if needed
        localStorage.setItem('User-Emotion', emotionValue);

        // Get canvas context
        const ctx = canvasRef.current.getContext('2d');
        requestAnimationFrame(() => {
          drawMesh(face, pred_log, ctx);
        });
      } else {
        console.error('Emotion data not found in prediction:', pred_log);
      }
    };
  };

  const removeImage = () => {
    // Clear the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    // Run face detection on the initial frame (optional)
    if (webcamRef.current && canvasRef.current) {
      captureImage();
    }
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    const inputValue = localStorage.getItem('User-Emotion');
    console.log(inputValue);
    if (inputValue) {
      navigate('/user/aiPlaylist');
    }
  }, [navigate]);

  return (
    <div className="front_page_container">
      <Toaster toastOptions={{ duration: 4000 }} />

      <div className="mx-auto webcam-container">
        <Webcam
          ref={webcamRef}
          style={{
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 160, // Adjust width
            height: 120, // Adjust height
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 160,
            height: 120, // Adjust height
          }}
        />
      </div>
      <header className="flex container_header">
        <div className="w-5/6 Output mx-auto flex items-center">
          <input
            id="emotion_text"
            name="emotion_text"
            value="Neutral"
            style={{
              width: 200,
            }}
          ></input>

          <button className="startRec" onClick={captureImage}>
            Capture Image
          </button>

          <button className="removeImage" onClick={removeImage}>
            Remove Image
          </button>
        </div>
      </header>
    </div>
  );
};

export default VideoCapture;
