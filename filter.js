export default class Filter {
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
      // x-year y-gender ratio z-filter by genre or character
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
        text(this.filteredRatioArr[i].toFixed(2), x, y - 10);
        pop();
  
        let nextX, nextY, nextZ;
        if (i < this.filteredRatioArr.length - 1) {
          nextX = width / 2 - boxSize / 2 + gapx * (i + 1);
          nextY = map(this.filteredRatioArr[i + 1], 0, 2.5, height / 2 + boxSize / 2, height / 2 - boxSize / 2, true);
          nextZ = gapz * this.zPosition;
        }
  
        beginShape();
        strokeWeight(1);
        if (i % 60 != 59) {
          vertex(x, y, z);
          vertex(nextX, nextY, nextZ)
        }
        endShape();
      }
    }
  }