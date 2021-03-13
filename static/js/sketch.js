var w = 600;
var h = 400;
var n;

p = new p5(canvas)
var playPressed = false

function canvas (p = new p5()) {
  let d = 0.0
  p.setup = function () {
    // ...
    p.createCanvas(w, h).parent('canvasHolder');
    // ...
    // n = p.createSlider(1, 1000, 500, 1).parent('nParticles');
    // ...
    // let play_button = create_button(parent='controlPanel', text="Start")
    // play_button.attribute("id", "playButton")
    // let play_button = p.createButton().parent("playButton")

  }
  p.draw = function () {
    p.background(220);
    p.ellipse(0, 0, 100 + d, 100 + d)
    if (playPressed === true) {
      d++
    }
  }
}

function create_button(parent, text = "test", classname = "btn btn-primary") {
  p = new p5()
  let button = p.createButton(text).parent(parent)
    button.attribute("type", "button")
    button.attribute("class", classname)
  return button
}

// document.addEventListener("click", function (e) {
//   if(e.target && e.target.id == 'playButton') {
//     const pressed = false
//
//
//   }
// })

document.addEventListener("click", function (e) {
  if (e.target.id === "playButton") {
      if (playPressed === false) {
        playPressed = true
      } else {
        playPressed = false
      }
  }
  console.log(playPressed)
})
