//class creating food based on the AbstractsForms project we created in class.

class Food{
  constructor(x,y,numCircles,radius, hue){
    this.x = x;
    this.y = y;
    this.numCircles = numCircles;
    this.hue = hue;
    this.radius = radius;

    this.distances = [];
    this.distancesCalcs =[];
    this.angles = [];
    this.radiuses = [];
    this.hues = [];

    for(let i=0; i<this.numCircles; i++){
      this.distances[i]= random(this.radius);
      this.distancesCalcs[i]= random(0,TWO_PI);
      this.angles[i]= random(TWO_PI);
      this.hues[i]= hue + random(-30,30);
    }
  }

  update(){
    for(let i=0; i<this.numCircles; i++){
      this.angles[i] += 0.01;
      this.distances[i]= map(sin(this.distancesCalcs[i]),-1,1,0,this.radius);
      this.distancesCalcs[i]+=0.08;
    }
  }

  move(){
    this.x += speed1;
  }

  display() {
    for(let i=0; i<this.numCircles; i++){
      let x = this.x + this.distances[i] * sin(this.angles[i]);
      let y = this.y + this.distances[i] * cos(this.angles[i]);
      fill(this.hues[i],100,80,50);
      push();
      translate(x, y);
      rotate(frameCount / 50.0);
      this.polygon(0, 0, this.radius/2, 8);
      pop();
    }
  }

  polygon(x, y, radius, numPoints){ //creating 8gon shape
    let angle = TWO_PI / numPoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}
