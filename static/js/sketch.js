let w = 400;
let h = 400;
let time = 0.0
let nXCells = 50
let nYCells = 50
let nSheep = 10
let nFood = 10

var playPressed = false
var eventListenersLoaded = false
var processing5 = new p5()


class BaseCanvas {
    constructor() {
        if (eventListenersLoaded === false) {
            this.addEventListeners()
            eventListenersLoaded = true
        }
    }
    addEventListeners() {
        document.addEventListener("click", function (e) {
            if (e.target.id === "playButton") {
                console.log("click")
                if (playPressed === false) {
                    const button = document.querySelector("#playButton")
                    button.textContent = "Stop"
                    button.className = "btn btn-danger"
                    playPressed = true
                }
                else {
                    playPressed = false
                    const button = document.querySelector("#playButton")
                    button.textContent = "Play"
                    button.className = "btn btn-primary"
                }
            }

            if (e.target.id === "resetButton") {
                time = 0.0

            }
        })
    }

    static createEmptyArray(nx, ny) {
        let tempArray = new Array(nx)
        for (var i = 0; i < tempArray.length; i++) {
            tempArray[i] = new Array(ny)
        }
        return tempArray
    }
}

class Grid2D extends BaseCanvas {
    constructor(p = new p5()) {
        super();
        this._p = null
        this.cellArray = BaseCanvas.createEmptyArray(nYCells, nYCells)
        this.p = p
    }

    get setup() {
        let self = this
        return function () {
            self.p.createCanvas(w, h).parent('canvasHolder');
            self.p.background(220);
            let wCell = w / nXCells
            let hCell = h / nYCells
            let cell = new Cell(100, 100, wCell, hCell, self.p)
            // let cellArray = new nj.zeros([nXCells, nYCells], )
            for (var i = 0; i < self.cellArray.length; i++) {
                for (var j = 0; j < self.cellArray[i].length; j++) {
                    self.cellArray[i][j] = new Cell(i * wCell, j * hCell, wCell, hCell, self.p)
                    self.cellArray[i][j].color = self.p.color("#982833")
                }
            }
            self.cellArray.forEach(element => element.forEach(element => element.display()))
        }
    }

    get draw() {
        var self = this
        let testSheep = new BaseElement(5, 5)
        return function () {
            time++
            testSheep.display(self.cellArray)
            testSheep.move_x_right(self.cellArray)
            // if (time < 40) {
            //     console.log(time)
            //     self.cellArray[time][0].color = self.p.color("#1fdb64")
            //     self.cellArray[time][0].display()
            // }

            // self.cellArray.forEach(element => element.forEach(element => element.display()))
            // console.log(time)
        }
    }

    get p() {
        return this._p;
    } // end get p

    set p(original) {
        this._p = original;
        this._p.draw = this.draw;
        this._p.setup = this.setup;
    }

}

class BaseElement {
    constructor(idX, idY) {
        this.idX = idX
        this.idY = idY
    }


    /**
     * Shows the current element in the cellArray
     * @param {Array[][].<Cell>} cellArray
     * // returns "fooBar fooBar"
     * myFunction('foo', 'Bar', 2)
     */
    display(cellArray) {
        cellArray[this.idX][this.idY].color = processing5.color("#1fdb64")
        cellArray[this.idX][this.idY].display()
    }

    move_x_right(cellArray) {
        if (this.idX === nXCells - 1) {
            return false
        }
        this.displayOff(cellArray)
        this.idX += 1
        console.log(this.idX, this.idY)
        this.display(cellArray)


    }

    displayOff(cellArray) {
        cellArray[this.idX][this.idY].color = processing5.color("#982833")
        cellArray[this.idX][this.idY].display()
    }

}

class Cell {
    constructor(xValue, yValue, wValue, hValue, p = new p5()) {
        this.xValue = xValue
        this.yValue = yValue
        this.wValue = wValue
        this.hValue = hValue
        this.p = p
        this.color = 0
        this.edgeColor = 255
    }

    display() {
        this.p.stroke(this.edgeColor)
        this.p.fill(this.color)
        this.p.rect(this.xValue, this.yValue, this.wValue, this.hValue)
    }
}

class CircleCambas extends BaseCanvas {
    constructor() {
        super()
        let time = 0.0
        this.p = new p5(this.canvas)
    }

    canvas(p = new p5()) {
        var self = this
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
            p.ellipse(p.width / 2.0, p.height / 2.0, 100 + time, 100 + time)
            if (playPressed === true) {
                time++
            }
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

function builder(p) {
    sketch = new Grid2D(p);
}

var sketch = new p5(builder);

