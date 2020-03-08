/* Credit for this code goes to the tutorial at:
 * https://sparkar.facebook.com/ar-studio/learn/documentation/scripting/scripting-tutorial/
 */

 // Load the Animation module
 const Animation = require('Animation');

// Load the Scene module
const Scene = require('Scene');

// Load the TouchGeatures module
const TouchGestures = require('TouchGestures');

// Store reference to the root property in a variable
const sceneRoot = Scene.root;

// Initialize a variable that will hold a reference to the base boombox object
const base = sceneRoot.find('base_jnt');
// Initialize variables for the boombox speaker objects
const speakerLeft = sceneRoot.find('speaker_left_jnt');
const speakerRight = sceneRoot.find('speaker_right_jnt');
// Initialize a variable to reference the plane tracker
const planeTracker = sceneRoot.find('planeTracker0');
// Initialize a variable to referencd the placer
const placer = sceneRoot.find('placer');

// Add a time driver for boombox animation
const baseDriverParameters = {
    durationMilliseconds: 400,
    loopCount: Infinity,
    mirror: true  // object returns to starting value at end of loop
};

// Instantiate the driver for base, and start it!
const baseDriver = Animation.timeDriver(baseDriverParameters);
baseDriver.start();

// Create a sampler
const baseSampler = Animation.samplers.easeInQuint(0.9, 1);

// Create the animation, by combining driver and sampler!
const baseAnimation = Animation.animate(baseDriver,baseSampler);

// Initialize a variable to reference the transformation of the boombox base
const baseTransform = base.transform;

// Bind the animation to the boombox object
baseTransform.scaleX = baseAnimation;
baseTransform.scaleY = baseAnimation;
baseTransform.scaleZ = baseAnimation;

// Instantiate a driver for the speaker driver
const speakerDriverParameters = {
    durationMilliseconds: 200,
    loopCount: Infinity,
    mirror: true
};

const speakerDriver = Animation.timeDriver(speakerDriverParameters);
speakerDriver.start();

// Instantiate a sampler for the speaker animation
const speakerSampler = Animation.samplers.easeOutElastic(0.7,0.85);

// Combine the two to create an animation for the sampler!
const speakerAnimation = Animation.animate(speakerDriver,speakerSampler);

// Apply this animation to the speakers (must be done for both left and right)
const speakerLeftTransform = speakerLeft.transform;

speakerLeftTransform.scaleX = speakerAnimation;
speakerLeftTransform.scaleY = speakerAnimation;
speakerLeftTransform.scaleZ = speakerAnimation;

const speakerRightTransform = speakerRight.transform;

speakerRightTransform.scaleX = speakerAnimation;
speakerRightTransform.scaleY = speakerAnimation;
speakerRightTransform.scaleZ = speakerAnimation;

// Subscribe the plane tracker to pan gestures
TouchGestures.onPan().subscribe(function(gesture) {
    planeTracker.trackPoint(gesture.location, gesture.state);
});

// Initialize a variable to the reference to the transform property of placer
const placerTransform = placer.transform;

// Subscribe the placer to pinch gestures
TouchGestures.onPinch().subscribeWithSnapshot( {
    'lastScaleX' : placerTransform.scaleX,
    'lastScaleY' : placerTransform.scaleY,
    'lastScaleZ' : placerTransform.scaleZ
}, function (gesture, snapshot) {
    placerTransform.scaleX = gesture.scale.mul(snapshot.lastScaleX);
    placerTransform.scaleY = gesture.scale.mul(snapshot.lastScaleY);
    placerTransform.scaleZ = gesture.scale.mul(snapshot.lastScaleZ);
});

// Subscribe to rotation gestures
TouchGestures.onRotate().subscribeWithSnapshot( {
    'lastRotationY' : placerTransform.rotationY,
}, function (gesture, snapshot) {
    const correctRotation = gesture.rotation.mul(-1);
    placerTransform.rotationY = correctRotation.add(snapshot.lastRotationY);
});
