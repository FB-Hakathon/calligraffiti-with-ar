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
const Animation = require('Animation');
const Scene = require('Scene');

const base = Scene.root.find('s.0862');

const baseDriverParameters = {
    durationMilliseconds: 400,
    loopCount: Infinity,
    mirror: true
};

const baseDriver = Animation.timeDriver(baseDriverParameters);
baseDriver.start();

const baseSampler = Animation.samplers.easeInQuint(0.9,1);

const baseAnimation = Animation.animate(baseDriver,baseSampler);

const baseTransform = base.transform;

baseTransform.scaleX = baseAnimation;
baseTransform.scaleY = baseAnimation;
baseTransform.scaleZ = baseAnimation;

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
