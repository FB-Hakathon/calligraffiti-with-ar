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
var SceneModule = require('Scene');
var AnimationModule = require('Animation');
var ReactiveModule = require('Reactive');

// Construct a Rotation object from a quaternion-based values.
function axisRotation(axis_x, axis_y, axis_z, angle_degrees) {
    var norm = Math.sqrt(axis_x*axis_x + axis_y*axis_y + axis_z*axis_z);
    axis_x /= norm;
    axis_y /= norm;
    axis_z /= norm;
    var angle_radians = angle_degrees * Math.PI / 180.0;
    var cos = Math.cos(angle_radians/2);
    var sin = Math.sin(angle_radians/2);
    return ReactiveModule.rotation(
        cos, axis_x*sin, axis_y*sin, axis_z*sin);
}

var time_driver = AnimationModule.timeDriver({
    durationMilliseconds: 2000,
    loopCount: Infinity
});

// Create a rotation sampler using Rotation objects generated
// by the previously-defined axisRotation() method.
var rotation_sampler = AnimationModule.samplers.polyline({
    keyframes: [
        axisRotation(0,0,0,0),
        axisRotation(0,1,0,90),
        axisRotation(0,1,0,270),
        axisRotation(1,0,0,360),
        axisRotation(1,0,0,0)
    ],
    knots: [
        0, 1, 3, 5, 7
    ]
});

// Start the animation
var rotation_signal = AnimationModule.animate(time_driver, rotation_sampler);
time_driver.start();

// Apply the rotation transform to a scene object.
var plane = SceneModule.root.find('s.0762');
// plane.transform.rotation = rotation_signal;

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
