let projectile;
let sliderGravity, sliderVelocity, SliderAngle, startHeightSlider, finalHeightSlider, sloMoSlider;
let inputGravity, inputVelocity, inputAngle, startHeightInput, finalHeightInput, sloMoInput;
let go, submitValues, createQuestion;
let count;
let altCalc, rangeCalc;
let projectiles = [];
let sliderList;
let originalWidth, originalHeight;
let cns;
let goPlace = 150;


let window_width;

function styleIt(obj) {
    obj.style("display", 'inline-block');
    obj.style("margin", '0 auto');
    obj.style("margin-left", '20px')
    obj.style("margin-top", '5px');;
    obj.style("border-radius", '30px')
    obj.style('border-style', 'dotted')
}

function setup() {

  window_width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
  cns = createCanvas(window_width-40, 750);
  styleIt(cns);
  cns.style('margin-left', '10px');

  let d = createDiv()
  d.addClass('infozone')
  d.addClass('smaller')
  d.html('Order of sliders and inputs: Gravity, Velocity, Angle, Start Height, Land Height, Slow Motion');


  angleMode(DEGREES)
  // Sliders
  sliderGravity = new Slider(0, 9.81, 0.25, 0.01, 'g');
  sliderVelocity = new Slider(0.1, 100, 15, 0.1, 'v');
  sliderAngle = new Slider(0, 90, 45, 1, 'a');
  startHeightSlider = new Slider(0, height, 0, 1, 'sh')
  finalHeightSlider = new Slider(0, height/2, 0, 1, 'fh')
  sloMoSlider = new Slider(1, 30, 1, 1, 'sm')
  go = createButton("Go!");
  go.mousePressed(createProjectile);
  styleIt(go);

  createP();

  // Inputs
  inputGravity = new Input('gravity')
  inputVelocity = new Input('velocity')
  inputAngle = new Input('angle')
  startHeightInput = new Input('start height')
  finalHeightInput = new Input('land height')
  sloMoInput = new Input('slo mo')
  submitValues = createButton('Submit Values')
  styleIt(submitValues)

  submitValues.mousePressed(setValues)
  


  inputList = [inputGravity, inputVelocity, inputAngle, startHeightInput, finalHeightInput, sloMoInput]
  sliderList = [sliderGravity, sliderVelocity, sliderAngle, startHeightSlider, finalHeightSlider, sloMoSlider]

  for (let i = 0; i < inputList.length; i++) {
    styleIt(sliderList[i].slider)
    styleIt(inputList[i].input)
  }



}


let diff;
let newWidth;
let totalDiff = 0;


function resize() {
    window_width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    if (width > window_width) {
        cns.resize(window_width-50, height);
    } else if (width+100 < window_width) {
        cns.resize(window_width-50, height)
    }
    
}
let timerstop = false;

function calcH(v, a, g, sh, fh) {
  let h = pow(v, 2)*pow(sin(a), 2) / (2*g) 
  h += sh;
  h -= fh;
  h -= 5;
  return round(h)
}
let milli1;
let milli2;

function calcRange(v, ang, g, sh, fh) {
  y0 = sh-fh;
  if (y0 < 0) {
    return 'Cant Launch'
  }
  let d;
  angleMode(DEGREES);
  d = ((v*v)/(2*g)) * (1 + sqrt(1 + ((2*g*y0)/(v*v*sin(a)*sin(a))))) * sin(2*a)
  return round(d);
  }

let v, a, g, sh, fh;

function createProjectile() {
  if (sh >= fh) {
    milli1 = millis();
    projectile = new Projectile(0, height, v, a,50, sh)
  count = 0;
  }
}

function setValues() {
  for (let i = 0; i < inputList.length; i++) {
    let input = parseFloat(inputList[i].input.value());
    if (input >= 0) {
      
    } else {
      alert("Invalid Input: " + inputList[i].input.value() + ' At input ' + i)
      return;
    }
  }

  sliderGravity.slider.value(inputGravity.input.value());
  sliderVelocity.slider.value(inputVelocity.input.value())
  sliderAngle.slider.value(inputAngle.input.value());
  startHeightSlider.slider.value(startHeightInput.input.value());
  finalHeightSlider.slider.value(finalHeightInput.input.value());
  sloMoSlider.slider.value(sloMoInput.input.value());


}

function draw() {

  resize();
  v = sliderVelocity.slider.value();
  a = sliderAngle.slider.value();
  g = sliderGravity.slider.value();
  sh = startHeightSlider.slider.value();
  fh = finalHeightSlider.slider.value();
  sm = sloMoSlider.slider.value();

  altCalc = calcH(v, a, g, sh, fh)
  rangeCalc = calcRange(v, a, g, sh, fh)


  fill(255);
  background(0);
  stroke(255);
  textSize(20);
  textAlign(LEFT);
  line(0, height-fh, width, height-fh)
  line(0, height-sh, 50, height-sh);
  noStroke();
  if (projectile != undefined) {
    projectile.update();
    projectile.show();

    strokeWeight(1);

    if (width < 738) {
      text("ALT: " + projectile.height, 210, 90)
      text("RANGE: " + round(projectile.x), 325, 90)
    } else if (width < 483) {

    }
    else {
      text("ALT: " + projectile.height, 460, 30)
      text("RANGE: " + round(projectile.x), 550, 30)
    }
  }
  // Writing the text
  text("VELOCITY: " + v.toString(10), 10, 30)
  text("GRAVITY: " + g, 175, 30)
  text("ANGLE: " + a.toString(10), 335, 30)
  text("PRED ALT: " + altCalc, 10, 60)

  text("PRED RANGE: " + rangeCalc, 175, 60)
  text("START HEIGHT: " + sh.toString(10), 10, 90)
  text("FINAL HEIGHT: " + fh.toString(10), 10, 120)

  if (rangeCalc == 'Cant Launch') {
    fill(255, 0, 0, 100)
    textSize(60)
    textAlign(CENTER);
    text('CANNOT LAUNCH', width/2 , height/2)
    textSize(25)
    text('Please ensure launch height is higher than final height', width/2 , height/2+ 35)
    fill(255, 0, 0, 100)
  } else {
    fill(0, 255, 0, 100)
  }

  textAlign(LEFT);
  rect(width-goPlace, 0, goPlace, goPlace, 20)
  fill(255, 200);
  textSize(60)
  text('GO', width-125, 90)


}

function mousePressed() {
  let goPlace = 150
  if (mouseX > width-goPlace && mouseX < width && mouseY < goPlace && mouseY > 0) {
    createProjectile()
  }  
}