/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
// Load in the required modules
const FaceGestures = require('FaceGestures');
const FaceTracking = require('FaceTracking');

const Scene = require('Scene');
const Materials = require('Materials');
const Time = require('Time');
const Diagnostics = require('Diagnostics');

const plane = Scene.root.find('s_0031');
const face = FaceTracking.face(0);

const colorArr = [Materials.get("blue"), Materials.get("gold"), Materials.get("purple")]
function changeColor(){
    plane.material = colorArr[Math.floor(Math.random()*colorArr.length)];
    // plane.material = colorArr[0];;
}


FaceTracking.face(0).mouth.openness.monitor().subscribe(function(event) {
    if(event.newValue > 0.3) {
        plane.transform.scaleX = 1.5;
        plane.transform.scaleY = 1.5;
        plane.transform.scaleZ = 1.5;
        
        Time.setTimeout(changeColor, 1000);
        // Diagnostics.log("happy");

    } else {
            // Diagnostics.log("not");
        plane.transform.scaleX = 1;
        plane.transform.scaleY = 1;
        plane.transform.scaleZ = 1;

        plane.material = Materials.get("Standard828635");
    }
});

// function update(){
//     // plane.material = Materials.get("blue");
//     if(FaceGestures.isHappy(face)){
//         plane.transform.scaleX = 1.5;
//         plane.transform.scaleY = 1.5;
//         plane.transform.scaleZ = 1.5;
        
//         Time.setTimeout(changeColor, 1000);
//         Diagnostics.log("happy");
        
//     }else{
//         Diagnostics.log("not")
//         plane.transform.scaleX = 1;
//         plane.transform.scaleY = 1;
//         plane.transform.scaleZ = 1;

//         plane.material = Materials.get("Standard828635");
//     }
// }
// update();
// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');
