/* Credit for this code goes to the tutorial at:
 * https://sparkar.facebook.com/ar-studio/learn/documentation/scripting/scripting-tutorial/
 */

 // Load the Animation module
 const Animation = require('Animation');

// Load the scene module
const Scene = require('Scene');

// Initialize a variable that will hold a reference to the base boombox object
const base = Scene.root.find('base_jnt');

// Add a time driver for boombox animation
const baseDriverParameters = {
    durationMilliseconds: 400,
    loopCount: Infinity,
    mirror: true  // object returns to starting value at end of loop
};

// Instantiate the driver and start it
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
