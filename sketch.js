/*
the data source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260566
*/

let table;
let myCanvas;
let pubYear = [];
let characterGender = [];
let genre = [];
let characterType = [];
let maleCount2019a = 0;
let femaleCount2019a = 0;
let maleCount2019b = 0;
let femaleCount2019b = 0;
let maleCount2018 = 0;
let femaleCount2018 = 0;

function preload() {
  table = loadTable("dataset.csv", "csv", "header")
}

function setup() {
  let canvasW = windowWidth * 3 / 5;
  let canvasH = windowHeight * 4 / 5;
  myCanvas = createCanvas(canvasW, canvasH, WEBGL);
  myCanvas.position(windowWidth / 2, (windowHeight - canvasH) / 2);

  //set the camera
  createEasyCam();
  document.oncontextmenu = function () { return false; }
  //change cursor to hand
  cursor("grab");

  //get the basic info of the data
  numRows = table.getRowCount();
  numCols = table.getColumnCount();
  print(`numRows ${numRows}, numCols ${numCols}`)

  //load data
  for (let i = 0; i < numRows; i++) {
    pubYear[i] = table.getNum(i, 3);
    characterGender[i] = table.getString(i, 6);
    genre[i] = table.getString(i, 7);
    characterType[i] = table.getString(i, 8);
  }
  // minYear: 1960, maxYear: 2019
  // yearMinMax();
  genderRatio2019a();
  genderRatio2019b();
  genderRatio2018();
}

function draw() {
  background(220);
  noFill();
  stroke("black");
  strokeWeight(0.5);
  let boxSize = 400;
  box(boxSize);
}

function mainGraph() {
  // x - year
  // y - gender ratio
  // z - genre & character type

}

function genderRatio2019a() {
  for (let i = 0; i < numRows; i++) {
    if (pubYear[i] == 2019 && genre[i] == "fiction" && characterType[i] == "human") {
      if (characterGender[i] == "male") {
        maleCount2019a++;
      } else if (characterGender[i] == "female") {
        femaleCount2019a++;
      }
    }
  }
  let ratio2019a = maleCount2019a / femaleCount2019a;
  print(ratio2019a);
}

function genderRatio2019b() {
  for (let i = 0; i < numRows; i++) {
    if (pubYear[i] == 2019 && genre[i] == "non-fiction" && characterType[i] == "human") {
      if (characterGender[i] == "male") {
        maleCount2019b++;
      } else if (characterGender[i] == "female") {
        femaleCount2019b++;
      }
    }
  }
  let ratio2019b = maleCount2019b / femaleCount2019b;
  print(ratio2019b);
}

function genderRatio2018() {
  for (let i = 0; i < numRows; i++) {
    if (pubYear[i] == 2018 && genre[i] == "fiction" && characterType[i] == "human") {
      if (characterGender[i] == "male") {
        maleCount2018++;
      } else if (characterGender[i] == "female") {
        femaleCount2018++;
      }
    }
  }
  let ratio2018 = maleCount2018 / femaleCount2018;
  print(ratio2018);
}
// find max and min year in data
// let yearMin, yearMax = 0;
// function yearMinMax() {
//   for (let i = 0; i < numRows; i++) {
//     if (table.getNum(i, 3) > yearMax) {
//       yearMax = table.getNum(i, 3);
//     }
//   }

//   yearMin = yearMax;

//   for (let i = 0; i < numRows; i++) {
//     if (table.getNum(i, 3) < yearMin) {
//       yearMin = table.getNum(i, 3);
//     }
//   }

//   print(`yearMax ${yearMax}, yearMin ${yearMin}`);

// }