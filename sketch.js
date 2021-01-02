// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Global variable to store the classifier
let classifier;

// Label (start by showing listening)
let label = "listening";

// Teachable Machine model URL:
let soundModelURL = 'https://kunhan0821.github.io/frog1100102/model.json';


function preload() { //網頁尚未載進時執行
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL); //ml5:第五代
}

function setup() {
  createCanvas(320, 240); //背景顏色
  // Start classifying
  // The sound model will continuously listen to the microphone
  ThunkableWebviewerExtension.postMessage("ready");
  classifier.classify(gotResult); //開始辨識
}

function draw() { //一有變數就執行，會執行多次
  background(0);
  // Draw the label in the canvas
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}


// The model recognizing a sound will trigger this event
function gotResult(error, results) {  //回傳執行結果或錯誤
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  ThunkableWebviewerExtension.postMessage(label);
}