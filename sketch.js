/*
Data source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260566
Code reference: https://www.youtube.com/watch?v=ZeVbsZQiHdU
*/

// // instance mode

// import Filter from "./filter.js";
let table;
let font;
let canvasW;
let canvasH;
let myCanvas;
let numRows;
let numCols;
let pubYear = [];
let characterGender = [];
let genre = [];
let characterType = [];
let boxSize = 300;
// camera state
let easyCam;
let camState = {
  distance: boxSize + 200,
  center: [0, 0, 0],
  rotation: [0.8, 0, -0.4, 0]
};
// colors
let dark = "#31393c";
let light = "#fcf5ef";
let blue1 = "#011A51";
let blue2 = "#1957DB";
let blue3 = "#487BEA";
let orange1 = "#B83700";
let orange2 = "#F06C00";
let orange3 = "#FAB129";


const s1 = function (p) {

  p.preload = function () {
    table = p.loadTable("assets/dataset.csv", "csv", "header");
    font = p.loadFont("assets/Lato-Light.ttf");
  };

  p.setup = function () {
    // set canvas
    canvasW = p.windowWidth * 3 / 5;
    canvasH = p.windowHeight * 4 / 5;
    myCanvas = p.createCanvas(canvasW, canvasH, p.WEBGL);
    myCanvas.parent("dataViz-1");
    //myCanvas.position(p.windowWidth / 2, (p.windowHeight - p.canvasH) / 2);

    // set font
    p.textFont(font);

    // set the camera
    easyCam = p.createEasyCam();
    easyCam.setState(camState, 2000);
    easyCam.state_reset = camState;
    document.oncontextmenu = function () { return false; }
    //change cursor to hand
    p.cursor("grab");

    // get rows and cols of dataset
    numRows = table.getRowCount();
    numCols = table.getColumnCount();
    p.print(`numRows ${numRows}, numCols ${numCols}`)

    // load data
    for (let i = 0; i < numRows; i++) {
      pubYear[i] = table.getNum(i, 3);
      characterGender[i] = table.getString(i, 6);
      genre[i] = table.getString(i, 7);
      characterType[i] = table.getString(i, 8);
    }
    // get gender ratio of each filter using class
    fiction.getRatio();
    nonfiction.getRatio();
    human.getRatio();
    nonhuman.getRatio();
  };

  p.draw = function () {
    p.background(p.color(light));
    p.noFill();
    p.stroke(dark);
    p.strokeWeight(0.5);
    p.box(boxSize);
    p.push();
    p.translate(-canvasW / 2, -canvasH / 2, -boxSize / 2);
    fiction.graph(p);
    nonfiction.graph(p);
    human.graph(p);
    nonhuman.graph(p);
    p.pop();
  };
}

let sketch1 = new p5(s1, "sketch1");

const d1 = function (p) {
  // p.preload = function () {
  //   table = p.loadTable("assets/dataset.csv", "csv", "header");
  //   font = p.loadFont("assets/Lato-Light.ttf");
  // };
  p.setup = function () {
    canvasW = 200;
    canvasH = 100;
    myCanvas = p.createCanvas(canvasW, canvasH);
    myCanvas.parent("desc1");
    p.textFont(font);
  }
  p.draw = function() {
    p.background(p.color(light));
    p.textSize(5);
    p.fill(p.color(dark));
    p.textAlign(p.CENTER);
    p.text("blue: fiction", canvasW/2, canvasH/2);
  }
}

let desc1 = new p5(d1, "desc1");

const s2 = function (p) {
  p.setup = function () {
    // set canvas
    canvasW = p.windowWidth * 3 / 5;
    canvasH = p.windowHeight * 4 / 5;
    myCanvas = p.createCanvas(canvasW, canvasH, p.WEBGL);

    // set font
    p.textFont(font);

    // set the camera
    // easyCam = p.createEasyCam();
    // easyCam.setState(camState, 2000);
    // easyCam.state_reset = camState;
    // document.oncontextmenu = function () { return false; }
    //change cursor to hand
    // p.cursor("grab");

    // get rows and cols of dataset
    numRows = table.getRowCount();
    numCols = table.getColumnCount();
    p.print(`numRows ${numRows}, numCols ${numCols}`)

    // load data
    for (let i = 0; i < numRows; i++) {
      pubYear[i] = table.getNum(i, 3);
      characterGender[i] = table.getString(i, 6);
      genre[i] = table.getString(i, 7);
      characterType[i] = table.getString(i, 8);
    }
    // get gender ratio of each filter using class
    fiction.getRatio();
  };
  p.draw = function () {
    p.background(p.color(light));
    p.noFill();
    p.stroke(dark);
    p.strokeWeight(0.5);
    p.box(boxSize);
    p.push();
    p.translate(-canvasW / 2, -canvasH / 2, -boxSize / 2);
    fiction.graph(p);
    p.pop();
  };
}

let sketch2 = new p5(s2, "dataViz-2")

class Filter {
  filteredRatioArr = [];
  constructor(column, filter, startPoint, color, zPosition) {
    this.column = column;
    this.filter = filter;
    this.startPoint = startPoint;
    this.color = color;
    this.zPosition = zPosition;
  }

  getRatio() {
    let maleCount = 0;
    let femaleCount = 0;
    let maleCountArr = [];
    let femaleCountArr = [];
    let ratioArr = [];
    for (let ii = 1960; ii < 2020; ii++) {
      for (let i = 0; i < numRows; i++) {
        if (pubYear[i] == ii && this.column[i] == this.filter) {
          if (characterGender[i] == "male") {
            // count the male number and female number of the year
            maleCount++;
            maleCountArr[ii - 1960] = maleCount;
          } else if (characterGender[i] == "female") {
            femaleCount++;
            femaleCountArr[ii - 1960] = femaleCount;
          }
          ratioArr[ii - 1960] = femaleCount / maleCount;
        }
      }
      maleCount = femaleCount = 0;
    }
    this.filteredRatioArr = ratioArr;
    console.log(this.filteredRatioArr);
  }

  graph(p) {
    // x-year y-gender ratio z-filter by genre or character
    let gapx = boxSize / (this.filteredRatioArr.length - 1);
    let gapz = boxSize / 5;
    for (let i = this.startPoint; i < this.filteredRatioArr.length; i++) {
      let x = canvasW / 2 - boxSize / 2 + gapx * (i);
      let y = p.map(this.filteredRatioArr[i], 0, 2.5, canvasH / 2 + boxSize / 2, canvasH / 2 - boxSize / 2, true);
      let z = gapz * this.zPosition;
      p.strokeWeight(5);
      p.stroke(p.color(this.color));
      p.point(x, y, z);
      // tag
      p.push();
      p.translate(0, 0, z);
      p.textSize(5);
      p.fill("black");
      p.textAlign(p.CENTER);
      p.text(this.filteredRatioArr[i].toFixed(2), x, y - 10);
      p.pop();

      let nextX, nextY, nextZ;
      if (i < this.filteredRatioArr.length - 1) {
        nextX = canvasW / 2 - boxSize / 2 + gapx * (i + 1);
        nextY = p.map(this.filteredRatioArr[i + 1], 0, 2.5, canvasH / 2 + boxSize / 2, canvasH / 2 - boxSize / 2, true);
        nextZ = gapz * this.zPosition;
      }

      p.beginShape();
      p.strokeWeight(1);
      if (i % 60 != 59) {
        p.vertex(x, y, z);
        p.vertex(nextX, nextY, nextZ)
      }
      p.endShape();
    }
  }
}
let fiction = new Filter(genre, "fiction", 0, "blue", 1);
let nonfiction = new Filter(genre, "non-fiction", 33, "green", 2);
let human = new Filter(characterType, "human", 1, "yellow", 3);
let nonhuman = new Filter(characterType, "non-human", 22, "orange", 4);
fiction.getRatio();
nonfiction.getRatio();
human.getRatio();
nonhuman.getRatio();

// let table;
// let myCanvas;
// let numRows;
// let numCols;
// let pubYear = [];
// let characterGender = [];
// let genre = [];
// let characterType = [];
// let boxSize = 300;
// // camera state
// let easyCam;
// let camState = {
//   distance: boxSize + 200,
//   center: [0, 0, 0],
//   rotation: [0.8, 0, -0.4, 0]
// };
// // colors
// let dark = "#31393c";
// let light = "#fcf5ef";
// let blue1 = "#011A51";
// let blue2 = "#1957DB";
// let blue3 = "#487BEA";
// let orange1 = "#B83700";
// let orange2 = "#F06C00";
// let orange3 = "#FAB129";

// function preload() {
//   table = loadTable("assets/dataset.csv", "csv", "header")
//   font = loadFont("assets/Lato-Light.ttf")
// }
// function setup() {
//   // set canvas
//   let canvasW = windowWidth * 3 / 5;
//   let canvasH = windowHeight * 4 / 5;
//   myCanvas = createCanvas(canvasW, canvasH, WEBGL);
//   //myCanvas.position(windowWidth / 2, (windowHeight - canvasH) / 2 + 300);

//   // set font
//   textFont(font);

//   // set the camera
//   easyCam = createEasyCam();
//   easyCam.setState(camState, 2000);
//   document.oncontextmenu = function () { return false; }
//   //change cursor to hand
//   cursor("grab");

//   // get rows and cols of dataset
//   numRows = table.getRowCount();
//   numCols = table.getColumnCount();
//   print(`numRows ${numRows}, numCols ${numCols}`)

//   // load data
//   for (let i = 0; i < numRows; i++) {
//     pubYear[i] = table.getNum(i, 3);
//     characterGender[i] = table.getString(i, 6);
//     genre[i] = table.getString(i, 7);
//     characterType[i] = table.getString(i, 8);
//   }

//   // get gender ratio of each filter using class
//   fiction.getRatio();
//   nonfiction.getRatio();
//   human.getRatio();
//   nonhuman.getRatio();
// }

// function draw() {
//   p.background(color(light));
//   p.noFill();
//   p.stroke(dark);
//   p.strokeWeight(0.5);
//   p.box(boxSize);
//   p.push();
//   p.translate(-width / 2, -height / 2, -boxSize / 2);
//   fiction.dots();
//   nonfiction.dots();
//   human.dots();
//   nonhuman.dots();
//   p.pop();
// }

// class Filter {
//   filteredRatioArr = [];
//   constructor(column, filter, startPoint, color, zPosition) {
//     this.column = column;
//     this.filter = filter;
//     this.startPoint = startPoint;
//     this.color = color;
//     this.zPosition = zPosition;
//   }

//   getRatio() {
//     let maleCount = 0;
//     let femaleCount = 0;
//     let maleCountArr = [];
//     let femaleCountArr = [];
//     let ratioArr = [];
//     for (let ii = 1960; ii < 2020; ii++) {
//       for (let i = 0; i < numRows; i++) {
//         if (pubYear[i] == ii && this.column[i] == this.filter) {
//           if (characterGender[i] == "male") {
//             // count the male number and female number of the year
//             maleCount++;
//             maleCountArr[ii - 1960] = maleCount;
//           } else if (characterGender[i] == "female") {
//             femaleCount++;
//             femaleCountArr[ii - 1960] = femaleCount;
//           }
//           ratioArr[ii - 1960] = femaleCount / maleCount;
//         }
//       }
//       maleCount = femaleCount = 0;
//     }
//     this.filteredRatioArr = ratioArr;
//   }

//   dots() {
//     // x-year y-gender ratio z-filter by genre or character
//     let gapx = boxSize / (this.filteredRatioArr.length - 1);
//     let gapz = boxSize / 5;
//     for (let i = this.startPoint; i < this.filteredRatioArr.length; i++) {
//       let x = width / 2 - boxSize / 2 + gapx * (i);
//       let y = map(this.filteredRatioArr[i], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
//       let z = gapz * this.zPosition;
//       strokeWeight(5);
//       stroke(this.color);
//       point(x, y, z);
//       // tag
//       push();
//       translate(0, 0, z);
//       textSize(5);
//       fill("black");
//       textAlign(CENTER);
//       text(this.filteredRatioArr[i].toFixed(2), x, y - 10);
//       pop();

//       let nextX, nextY, nextZ;
//       if (i < this.filteredRatioArr.length - 1) {
//         nextX = width / 2 - boxSize / 2 + gapx * (i + 1);
//         nextY = map(this.filteredRatioArr[i + 1], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
//         nextZ = gapz * this.zPosition;
//       }

//       beginShape();
//       strokeWeight(1);
//       if (i % 60 != 59) {
//         vertex(x, y, z);
//         vertex(nextX, nextY, nextZ)
//       }
//       endShape();
//     }
//   }
// }
// let fiction = new Filter(p.genre, "fiction", 0, "blue", 1);
// let nonfiction = new Filter(p.genre, "non-fiction", 33, "green", 2);
// let human = new Filter(p.characterType, "human", 1, "yellow", 3);
// let nonhuman = new Filter(p.characterType, "non-human", 22, "orange", 4);