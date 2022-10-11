/*
Data source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260566
Code reference: https://www.youtube.com/watch?v=ZeVbsZQiHdU
*/

let table;
let myCanvas;
let numRows;
let numCols;
let pubYear = [];
let characterGender = [];
let genre = [];
let characterType = [];
let boxSize = 300;

function preload() {
  table = loadTable("assets/dataset.csv", "csv", "header")
  font = loadFont("assets/Lato-Light.ttf")
}

function setup() {
  let canvasW = windowWidth * 3 / 5;
  let canvasH = windowHeight * 4 / 5;
  myCanvas = createCanvas(canvasW, canvasH, WEBGL);
  myCanvas.position(windowWidth / 2, (windowHeight - canvasH) / 2);

  // set font
  textFont(font);

  // set the camera
  createEasyCam();
  document.oncontextmenu = function () { return false; }
  //change cursor to hand
  cursor("grab");

  // get the basic info of the data
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  print(`numRows ${numRows}, numCols ${numCols}`)

  // load data
  for (let i = 0; i < numRows; i++) {
    pubYear[i] = table.getNum(i, 3);
    characterGender[i] = table.getString(i, 6);
    genre[i] = table.getString(i, 7);
    characterType[i] = table.getString(i, 8);
  }

  // get data using class
  fiction.getRatio();
  nonfiction.getRatio();
  human.getRatio();
  nonhuman.getRatio();
}

function draw() {
  background(220);
  noFill();
  stroke("black");
  strokeWeight(0.5);
  box(boxSize);
  push();
  translate(-width / 2, -height / 2, -boxSize / 2);
  fiction.dots();
  nonfiction.dots();
  human.dots();
  nonhuman.dots();
  pop();
}

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
  }

  dots() {
    let gapx = boxSize / (this.filteredRatioArr.length - 1);
    let gapz = boxSize / 5;
    for (let i = this.startPoint; i < this.filteredRatioArr.length; i++) {
      let x = width / 2 - boxSize / 2 + gapx * (i);
      let y = map(this.filteredRatioArr[i], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
      let z = gapz * this.zPosition;
      strokeWeight(5);
      stroke(this.color);
      point(x, y, z);
      // tag
      push();
      translate(0, 0, z);
      textSize(5);
      fill("black");
      textAlign(CENTER);
      text(this.filteredRatioArr[i].toFixed(2), x, y + 10);
      pop();
    }
  }
}
let fiction = new Filter(genre, "fiction", 0, "blue", 1);
let nonfiction = new Filter(genre, "non-fiction", 33, "green", 2);
let human = new Filter(characterType, "human", 1, "yellow", 3);
let nonhuman = new Filter(characterType, "non-human", 22, "orange", 4);

// function mainGraph() {
//   // x - year
//   // y - gender ratio
//   // z - genre & character type

//   // line 1: fRatioArr
//   let gapx = boxSize / (fRatioArr.length - 1);
//   let gapz = boxSize / 5;
//   let color;
//   for (let i = 0; i < fRatioArr.length; i++) {
//     let x = width / 2 - boxSize / 2 + gapx * (i);
//     let y = map(fRatioArr[i], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
//     let z = gapz;
//     // if (fRatioArr[i] >= 2.5 / 4 * 3) {
//     //   color = ("#B83700");
//     // } else if (fRatioArr[i] < 2.5 / 4 * 3 && fRatioArr[i] >= 2.5 / 4 * 2) {
//     //   color = ("#F06C00");
//     // } else if (fRatioArr[i] < 2.5 / 4 * 2 && fRatioArr[i] >= 1) {
//     //   color = ("#FAB129");
//     // } else if (fRatioArr[i] < 1 && fRatioArr[i] >= 2.5 / 4) {
//     //   color = ("#1957DB");
//     // } else if (fRatioArr[i] < 2.5 / 4) {
//     //   color = ("#011A51");
//     // }
//     strokeWeight(5);
//     stroke("blue");
//     point(x, y, z);
//     // tag
//     push();
//     translate(0, 0, z);
//     textSize(5);
//     fill("black");
//     textAlign(CENTER);
//     text(fRatioArr[i].toFixed(2), x, y + 10);
//     pop();
//   }
//   // line 2: nfRatioArr from 33
//   for (let i = 33; i < nfRatioArr.length; i++) {
//     let x = width / 2 - boxSize / 2 + gapx * (i);
//     let y = map(nfRatioArr[i], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
//     let z = gapz * 2;
//     strokeWeight(5);
//     stroke("green");
//     point(x, y, z);
//     // tag
//     push();
//     translate(0, 0, z);
//     textSize(5);
//     fill("black");
//     textAlign(CENTER);
//     text(nfRatioArr[i].toFixed(2), x, y + 10);
//     pop();
//   }
//   // line 3: hRatioArr from 1
//   for (let i = 1; i < hRatioArr.length; i++) {
//     let x = width / 2 - boxSize / 2 + gapx * (i);
//     let y = map(hRatioArr[i], 0, 9, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
//     let z = gapz * 3;
//     strokeWeight(5);
//     stroke("yellow");
//     point(x, y, z);
//     // tag
//     push();
//     translate(0, 0, z);
//     textSize(5);
//     fill("black");
//     textAlign(CENTER);
//     text(hRatioArr[i].toFixed(2), x, y + 10);
//     pop();
//   }
//   // line 4: nhRatioArr from 22
//   for (let i = 22; i < nhRatioArr.length; i++) {
//     let x = width / 2 - boxSize / 2 + gapx * (i);
//     let y = map(nhRatioArr[i], 0, 9, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
//     let z = gapz * 4;
//     // let size = map(fRatioArr[i], 0, 2.5, 5, 20);
//     strokeWeight(5);
//     stroke("orange");
//     point(x, y, z);
//     // tag
//     push();
//     translate(0, 0, z);
//     textSize(5);
//     fill("black");
//     textAlign(CENTER);
//     text(nhRatioArr[i].toFixed(2), x, y + 10);
//     pop();
//   }
// }