let w = 400;
let h = 400;
let time = 0.0
let nXCells = 50
let nYCells = 50
let nSheep = 50
let nFood = 15

var playPressed = false
let resetPressed = false
var eventListenersLoaded = false
var processing5 = new p5()

let colors = {
    "base" : "#ece7e7",
    "lettuce" : "#1fab52",
    "sheep" : "#1599e0"
}

let directionOptions = {
    "left": "left",
    "right": "right",
    "up": "up",
    "down": "down"
}

let initialValues = {
    "lettuce": 10,
    "sheep": 30
}


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
                console.log(document.getElementById("numberOfSheep").value)
                // Read number of sheep
                const numberOfSheepInput = document.getElementById("numberOfSheep")
                if (numberOfSheepInput.value.length == 0) {
                    initialValues.sheep = parseInt(numberOfSheepInput.getAttribute("placeholder"))
                } else {
                    initialValues.sheep = parseInt(numberOfSheepInput.value)
                }

                // Read number of lettuce
                const numberOfLettuceInput = document.getElementById("numberOfLettuce")
                if (numberOfLettuceInput.value.length == 0) {
                    initialValues.lettuce = parseInt(numberOfLettuceInput.getAttribute("placeholder"))
                } else {
                    initialValues.lettuce = parseInt(numberOfLettuceInput.value)
                }
                resetPressed = true
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
    /**
     *
     * @param {p5} p Processing instance
     */
    constructor(p) {
        super();
        this._p = null
        // this.cellArray = BaseCanvas.createEmptyArray(nYCells, nYCells)
        this.p = p
        this.cellArray = BaseCanvas.createEmptyArray(nYCells, nYCells)
    }
    get setup() {
        let self = this
        return function () {
            self.p.createCanvas(w, h).parent('canvasHolder')
            self.p.background(220);

            let wCell = w / nXCells
            let hCell = h / nYCells
            for (var i = 0; i < self.cellArray.length; i++) {
                for (var j = 0; j < self.cellArray[i].length; j++) {
                    self.cellArray[i][j] = new Cell(i * wCell, j * hCell, wCell, hCell, "base",self.p)
                    self.cellArray[i][j].color = self.p.color(colors.base)
                }
            }
            self.cellArray.forEach(element => element.forEach(element => element.display()))
            // self.testElement = new LettuceElement(5, 5, self.cellArray)
            // self.testElement.display(self.cellArray)
            self.generateSheep()
            self.generateLettuce()
            self.sheep.forEach(element => element.display())
            self.lettuce.forEach(element => element.display())
            let testCell = new LettuceElement(10, 10, self.cellArray)
        }
    }

    get draw() {
        var self = this
        return function () {
            if (playPressed) {
                time++
                self.p.frameRate(60)
                self.sheep.forEach(element => element.moveRandom())
            }
            if (resetPressed) {
                resetPressed = false
                self.setup()
            }
            // self.testElement.moveRandom(self.cellArray)

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

    generateSheep() {
        this.sheep = []
        for (var i = 0; i < initialValues.sheep; i++)
        {
            const idX = Math.floor(Math.random() * (nXCells))
            const idY = Math.floor(Math.random() * (nYCells))
            this.sheep.push(new SheepElement(idX, idY, this.cellArray))
        }
    }

    generateLettuce() {
        this.lettuce = []
        for (var i = 0; i < initialValues.lettuce; i++)
        {
            const idX = Math.floor(Math.random() * (nXCells))
            const idY = Math.floor(Math.random() * (nYCells))
            this.lettuce.push(new LettuceElement(idX, idY, this.cellArray))
        }
    }
}

class BaseElement {
    constructor(idX, idY, cellArray) {
        this.idX = idX
        this.idY = idY
        this.cellArray = cellArray
        this.classType = "base"
        this.cellArray[idX][idY].type = this.classType
    }
    /**
     * Shows the current element in the cellArray
     * @param {Array[][].<Cell>} cellArray
     * @param {string} classType: Type of the element
     * // returns "fooBar fooBar"
     * myFunction('foo', 'Bar', 2)
     */
    display() {
        this.cellArray[this.idX][this.idY].color = processing5.color(colors[this.classType])
        this.cellArray[this.idX][this.idY].display()
        this.cellArray[this.idX][this.idY].type =  this.classType
    }

    moveRandom() {
        let chosenKey = randomProperty(directionOptions)
        switch (chosenKey) {
            case "left":
                this.moveLeft()
                break
            case "right":
                this.moveRight()
                break
            case "up":
                this.moveUp()
                break
            case "down":
                this.moveDown()
                break
        }
    }

    moveRight() {
        if (this.idX === nXCells - 1) {
            this.moveLeft()
        }
        this.displayOff()
        this.idX += 1
        this.display()
    }

    moveLeft() {
        if (this.idX === 0) {
            this.moveRight()
        }
        this.displayOff()
        this.idX -= 1
        this.display()
    }

    moveUp() {
        if (this.idY === 0) {
            this.moveDown()
        }
        this.displayOff()
        this.idY -= 1
        this.display()
    }

    moveDown() {
        if (this.idY === nYCells - 1) {
            this.moveUp()
        }
        this.displayOff()
        this.idY += 1
        this.display()
    }

    displayOff() {
        this.cellArray[this.idX][this.idY].color = processing5.color(colors.base)
        this.cellArray[this.idX][this.idY].type = "base"
        this.cellArray[this.idX][this.idY].display()
    }

}

class LettuceElement extends BaseElement {
    constructor(idX, idY, cellArray) {
        super(idX, idY, cellArray);
        this.cellArray = cellArray
        this.classType = "lettuce"
        this.cellArray[idX][idY].type = this.classType
    }
}

class SheepElement extends BaseElement {
    constructor(idX, idY, cellArray) {
        super(idX, idY, cellArray);
        this.classType = "sheep"
        this.cellArray[idX][idY].type = this.classType
        this.cellArray[this.idX][this.idY].type =  this.classType
    }
}

class Cell {
    /**
     *
     * @param xValue
     * @param yValue
     * @param wValue
     * @param hValue
     * @param type
     * @param {p5} p processing5 instance
     */
    constructor(xValue, yValue, wValue, hValue, type = "base", p) {
        this.xValue = xValue
        this.yValue = yValue
        this.wValue = wValue
        this.hValue = hValue
        this.p = p
        this.color = 0
        this.edgeColor = 255
        this.type = type
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

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};


function builder(p) {
    sketch = new Grid2D(p);
}

// Initialize matrix

var sketch = new p5(builder);

