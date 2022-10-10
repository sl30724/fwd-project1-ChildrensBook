/*
Data source: https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260566
Code reference: https://www.youtube.com/watch?v=ZeVbsZQiHdU
*/

let table;
let myCanvas;
let pubYear = [];
let characterGender = [];
let genre = [];
let characterType = [];
let boxSize = 300;
// test
let maleCountTest = 0;
let femaleCountTest = 0;
// fiction & human
let fMaleCount = 0;
let fFemaleCount = 0;
let fMaleCountArr = [];
let fFemaleCountArr = [];
let fRatioArr = [];
// fiction & non-human
let nfMaleCount = 0;
let nfFemaleCount = 0;
let nfMaleCountArr = [];
let nfFemaleCountArr = [];
let nfRatioArr = [];
// non-fiction & human
let hMaleCount = 0;
let hFemaleCount = 0;
let hMaleCountArr = [];
let hFemaleCountArr = [];
let hRatioArr = [];
// non-fiction & non-human
let nhMaleCount = 0;
let nhFemaleCount = 0;
let nhMaleCountArr = [];
let nhFemaleCountArr = [];
let nhRatioArr = [];


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
  genreTypeGenderRatio();
  characterTypeGenderRatio();
  console.log(nhMaleCountArr);
  console.log(nhFemaleCountArr);
  console.log(nhRatioArr);
  //genderRatioTest();
  ratioMinMax();
}

function draw() {
  background(220);
  noFill();
  stroke("black");
  strokeWeight(0.5);
  box(boxSize);
  push();
  translate(-width/2, -height/2, -boxSize/2);
  mainGraph();
  pop();
}

function mainGraph() {
  // x - year
  // y - gender ratio
  // z - genre & character type

  // line 1: fRatioArr
  let gapx = boxSize / (fRatioArr.length-1);
  let gapz = boxSize / 5;
  for (let i = 0; i <= fRatioArr.length; i++) {
    let x = width / 2 - boxSize / 2 + gapx * (i);
    let y = map(fRatioArr[i], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
    let z = gapz;
    // let size = map(fRatioArr[i], 0, 2.5, 5, 20);
    strokeWeight(5);
    stroke("blue");
    point(x, y, z);
  }
  // line 2: nfRatioArr from 33
  for (let i = 33; i <= nfRatioArr.length; i++) {
    let x = width / 2 - boxSize / 2 + gapx * (i);
    let y = map(nfRatioArr[i], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
    let z = gapz * 2;
    // let size = map(fRatioArr[i], 0, 2.5, 5, 20);
    strokeWeight(5);
    stroke("green");
    point(x, y, z);
  }
  // line 3: hRatioArr from 1
  for (let i = 1; i <= hRatioArr.length; i++) {
    let x = width / 2 - boxSize / 2 + gapx * (i);
    let y = map(hRatioArr[i], 0, 9, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
    let z = gapz * 3;
    // let size = map(fRatioArr[i], 0, 2.5, 5, 20);
    strokeWeight(5);
    stroke("yellow");
    point(x, y, z);
  }
  // line 4: nhRatioArr from 22
  for (let i = 22; i <= nhRatioArr.length; i++) {
    let x = width / 2 - boxSize / 2 + gapx * (i);
    let y = map(nhRatioArr[i], 0, 9, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
    let z = gapz * 4;
    // let size = map(fRatioArr[i], 0, 2.5, 5, 20);
    strokeWeight(5);
    stroke("orange");
    point(x, y, z);
  }
}

function genreTypeGenderRatio() {
  for (let ii = 1960; ii < 2020; ii++) {
    for (let i = 0; i < numRows; i++) {
      if (pubYear[i] == ii && genre[i] == "fiction") {
        if (characterGender[i] == "male") {
          // count the male number and female number of the year
          fMaleCount++;
          fMaleCountArr[ii - 1960] = fMaleCount;
        } else if (characterGender[i] == "female") {
          fFemaleCount++;
          fFemaleCountArr[ii - 1960] = fFemaleCount;
        }
        fRatioArr[ii - 1960] = fFemaleCount / fMaleCount;
      } else if (pubYear[i] == ii && genre[i] == "non-fiction") {
        if (characterGender[i] == "male") {
          // count the male number and female number of the year
          nfMaleCount++;
          nfMaleCountArr[ii - 1960] = nfMaleCount;
        } else if (characterGender[i] == "female") {
          nfFemaleCount++;
          nfFemaleCountArr[ii - 1960] = nfFemaleCount;
        }
        nfRatioArr[ii - 1960] = nfFemaleCount / nfMaleCount;
      }
    }
    fMaleCount = fFemaleCount = 0;
    nfMaleCount = nfFemaleCount = 0;
  }
  // print(fMaleCountArr[58]);
  // print(fFemaleCountArr[58]);
  // print(fRatioArr);
}

function characterTypeGenderRatio() {
  for (let ii = 1960; ii < 2020; ii++) {
    for (let i = 0; i < numRows; i++) {
      if (pubYear[i] == ii && characterType[i] == "human") {
        if (characterGender[i] == "male") {
          // count the male number and female number of the year
          hMaleCount++;
          hMaleCountArr[ii - 1960] = hMaleCount;
        } else if (characterGender[i] == "female") {
          hFemaleCount++;
          hFemaleCountArr[ii - 1960] = hFemaleCount;
        }
        hRatioArr[ii - 1960] = hFemaleCount / hMaleCount;
      } else if (pubYear[i] == ii && characterType[i] == "non-human") {
        if (characterGender[i] == "male") {
          // count the male number and female number of the year
          nhMaleCount++;
          nhMaleCountArr[ii - 1960] = nhMaleCount;
        } else if (characterGender[i] == "female") {
          nhFemaleCount++;
          nhFemaleCountArr[ii - 1960] = nhFemaleCount;
        }
        nhRatioArr[ii - 1960] = nhFemaleCount / nhMaleCount;
      }
    }
    hMaleCount = hFemaleCount = 0;
    nhMaleCount = nhFemaleCount = 0;
  }
  // print(nhMaleCountArr[58]);
  // print(nhFemaleCountArr[58]);
  // print(nhRatioArr[58]);
}

// test if the loop statement returns correctly
// function genderRatioTest() {
//   for (let i = 0; i < numRows; i++) {
//     if (pubYear[i] == 2018 && characterType[i] == "non-human") {
//       if (characterGender[i] == "male") {
//         maleCountTest++;
//       } else if (characterGender[i] == "female") {
//         femaleCountTest++;
//       }
//     }
//   }
//   let ratioTest = femaleCountTest / maleCountTest;
//   print(maleCountTest);
//   print(femaleCountTest);
//   print(ratioTest);
// }


// find max and min value in data
let ratioMin, ratioMax = 0;
function ratioMinMax() {
  for (let i = 0; i < 60; i++) {
    if (nhRatioArr[i] > ratioMax) {
      ratioMax = nhRatioArr[i];
    }
  }

  ratioMin = ratioMax;

  for (let i = 0; i < 60; i++) {
    if (nhRatioArr[i] < ratioMin) {
      ratioMin = nhRatioArr[i];
    }
  }

  print(`ratioMax ${ratioMax}, ratioMin ${ratioMin}`);

}