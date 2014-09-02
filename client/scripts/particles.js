$(document).ready(function() {

window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
  window.setTimeout(callback, 1000 / 60);
};

var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var settings = {
  'basic': {
    'life': {min: 5, range: 2},
    'angle': {min: 0, range: 360},
    'speed': {min: 15, range: 45},
    'size': {min: 0.1, range: 4},
    'gravity': {x: 0, y: 20},
    'emissionRate': 150, // particles per second
    'color': '#82c4f5'
  }
};

function Particle() {
  var pos = {x:0, y:0}
    , vel = {x: 0, y: 0}
    , angle // degrees
    , speed = 5 // pixels per second
    , size = 2 // pixels
    , life = 1 // seconds
    , lived = 0
    , dead = false
  , color = {value: "#333", alpha: {value: 1.0, step: 0}};
  
  var self = function() {
    self.updateVelocity();
    return self;
  }
  
  self.updateVelocity = function() {
    var radians = angle * Math.PI / 180;
    vel.x = Math.cos(radians) * speed;
    
    // Negative because y-axis increases from top
    vel.y = -Math.sin(radians) * speed;
  }
  
  self.x = function(d) {
    if(!arguments.length) return pos.x;
    pos.x = d;
    return self;
  }
  
  self.y = function(d) {
    if(!arguments.length) return pos.y;
    pos.y = d;
    return self;
  }
  
  self.color = function(d) {
    if(!arguments.length) return color;
    color = d;
    return self;
  }
  
  self.vel = function(d) {
    if(!arguments.length) return vel;
    vel = d;
    return self;
  }
  
  self.pos = function(d) {
    if(!arguments.length) return pos;
    pos = d;
    return self;
  }
  
  self.angle = function(d) {
    if(!arguments.length) return angle;
    angle = d;
    return self;
  }
  
  self.speed = function(d) {
    if(!arguments.length) return speed;
    speed = d;
    return self;
  }
  
  self.life = function(d) {
    if(!arguments.length) return life;
    life = d;
    return self;
  }
  
  self.size = function(d) {
    if(!arguments.length) return size;
    size = d;
    return self;
  }
  
  self.lived = function(d) {
    if(!arguments.length) return lived;
    lived = d;
    return self;
  }
  
  self.dead = function(d) {
    if(!arguments.length) return dead;
    dead = d;
    return self;
  }
  
  return self;
}

function Emitter() {
  var pos = {x: 0, y: 0}
    , settings
    , emissionDelay = 1000 // how often particles are created in milliseconds
    , lastUpdate = 0
    , lastEmission = 0
    , particles = [];
  
  var color = d3.scale.category20();
  
  var self = function() {
    var i;
    
    if(!lastUpdate) {
      lastUpdate = Date.now();
      return;
    }
    
    var time = Date.now();
    var dt = time - lastUpdate;
    lastEmission += dt;
    lastUpdate = time;
    
    if(lastEmission > emissionDelay) {
      // number of particles to emit
      i = Math.floor(lastEmission / emissionDelay);
      lastEmission -= i * emissionDelay;
      
      while(i--) {
        var p = Particle()
                      .x(0)
                      .y(0)
                      .angle(randomValue('angle'))
                      .speed(randomValue('speed'))
                      .size(randomValue('size'))
                      .life(randomValue('life'));
        p.color().value = color(Math.floor(Math.random() * 20));
        p.color().alpha.step = -1 / p.life();
        particles.push(p());
      }
    }
    
    // to seconds
    dt /= 1000;
    i = particles.length;
    while(i--) {
      var particle = particles[i];
      
      if(particle.dead()) {
        particles.splice(i, 1);
        continue;
      }
      
      particle.lived(particle.lived() + dt);
      if(particle.lived() > particle.life()) {
        particle.dead(true);
        continue;
      }
      
      particle.vel().x += settings.gravity.x * dt;
      particle.vel().y += settings.gravity.y * dt;
      
      particle.x(particle.x() + particle.vel().x * dt);
      particle.y(particle.y() + particle.vel().y * dt);
      
      particle.color().alpha.value += particle.color().alpha.step * dt;
      
      var c = d3.rgb(particle.color().value);
      ctx.fillStyle = "rgba(" 
        + c.r + "," + c.g + "," + c.b + ","
        + particle.color().alpha.value + ")";
        
      var x = pos.x + particle.x();
      var y = pos.y + particle.y();

      ctx.beginPath();
      ctx.arc(x, y, particle.size(), 0, Math.PI * 2);
      ctx.fill();
    }
    
    return self;
  }
  
  self.settings = function(d) {
    if(!arguments.length) return settings;
    settings = d;
    emissionDelay = 1000 / settings.emissionRate;
    return self;
  }
  
  self.x = function(d) {
    if(!arguments.length) return pos.x;
    pos.x = d;
    return self;
  }
  
  self.y = function(d) {
    if(!arguments.length) return pos.y;
    pos.y = d;
    return self;
  }
  
  function randomValue(key) {
    return settings[key].min + Math.random() * settings[key].range;
  }
  
  return self; 
}

var emitter = Emitter()   // Change emitter position on canvas
  .x(canvas.width / 2)
  .y(canvas.height / 6)
  .settings(settings.basic);

function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    emitter();

    requestAnimFrame(loop);
}

loop();

});