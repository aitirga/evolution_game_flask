var w = 600;
var h = 400;
var n;
let t = 0.0


var playPressed = false

class p_canvas {
    constructor() {
        this.p = new p5(this.canvas)
        this.time = 0.0
        this.add_event_listeners()
    }

    canvas(p = new p5()) {
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
            p.ellipse(0, 0, 100 + t, 100 + t)
            if (playPressed === true) {
                t++
            }
        }
    }

    add_event_listeners() {
        document.addEventListener("click", function (e) {
            let button
            if (e.target.id === "playButton") {
                if (playPressed === false) {
                    playPressed = true
                    button = document.querySelector("#playButton")
                    button.textContent = "Stop"
                    button.className = "btn btn-danger"
                    console.log(button.classList)
                } else {
                    playPressed = false
                    button = document.querySelector("#playButton")
                    button.textContent = "Play"
                    button.className = "btn btn-primary"
                }
            }

            if (e.target.id === "resetButton") {
                t = 0.0
            }
        })
    }
}

function create_button(parent, text = "test", classname = "btn btn-primary") {
    p = new p5()
    let button = p.createButton(text).parent(parent)
    button.attribute("type", "button")
    button.attribute("class", classname)
    return button
}


p = new p_canvas()


