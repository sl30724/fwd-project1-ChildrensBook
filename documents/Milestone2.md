# Data Source
I obtained the data from [Sixty years of gender representation in children’s books: Conditions associated with overrepresentation of male versus female protagonists](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0260566)
, a study by Casey K., Novick K., Lourenco S. (2021).
I first started this project by collecting my own data, but I soon realized this would extend the already tight timeline of this project.
Therefore, I decided to use [their accessible data](https://osf.io/97gfk/) that contains all the sorted information I need, including title, author gender, genre, main character's gender, and character's type from 3280 children's books collected from various sources.

# Data Visualization Design
I struggled a lot with making good visualization design choices that are reasonably challenging yet achievable with my current capabilities.
[HOW TO MAKE DOPE SHIT Part 2: Design](https://pudding.cool/process/how-to-make-dope-shit-part-2/) is an awesome read that guided me through this step.

### Inspirations
- [Gender Equality Creative Platform](https://www.pentagram.com/work/gender-equality-creative-platform/story)
- [The Naked Truth](https://pudding.cool/2021/03/foundation-names/)

### Types of Visualization
- [Line Graph](https://datavizproject.com/data-type/line-chart/) or [Spline Graph](https://datavizproject.com/data-type/spline-graph/): To present the overall trend of gender representation in children's books.
- [Waterfall plot](https://datavizproject.com/data-type/waterfall-plot/): To present the overall trend of gender representations in different children's books category over the years. X plot = year, Y plot = genre & character type, Z plot = ratio of male to female character across all books in that category that year.
- [Pictorial Fraction Chart](https://datavizproject.com/data-type/fraction-of-pictograms/): To present "the golden ratio" of gender bias in children's books when there are multiple main characters.

# Learning Resources
### Data Viz with p5js
- [P5.JS Tutorial | 3D Data Visualization Part I](https://www.youtube.com/watch?v=ZeVbsZQiHdU)
- [The Coding Train: Graphing Data](https://youtu.be/5-ptp9tRApM)
- [Linechart basics](https://www.youtube.com/watch?v=AXHkr5m_rpQ)

### p5js with Other Libraries & Multiple Sketches
- [Multiple p5.js sketches in separate divs on one HTML page](http://joemckaystudio.com/multisketches/)
- [Libraries](https://happycoding.io/tutorials/p5js/libraries)
- [Global and instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode)

### typed.js
- [typed.js Github](https://github.com/mattboldt/typed.js)

### GSAP
- [GreenSock Docs](https://greensock.com/docs/)
