//class creating the main character inspired by hexagon animated wave
//https://www.intmath.com/math-art-code/hexagon-animated-wave-css.php

class Character{
  constructor(){
    this.pos = createVector(width/2,height/2);
    this.vel = createVector(0,0);
    this.acc = createVector(0,gravAcc);
    this.numItems = 44;   //number of items around the main circle
    this.r = 35;
    this.aI = TWO_PI / this.numItems;
  }

  display(){
    for (let i = 0; i < this.numItems; i++){
      let x =  sin(this.aI*i) * this.r;
      let y =  cos(this.aI*i) * this.r;

      fill(i*8,100,100,80);
      push();
      translate(this.pos.x,this.pos.y)
      rotate(millis() * 0.0002);
      translate(x,y);
      rotate(i * 0.5);
      rotate(0.004 * millis());
      this.item();
      pop();
    }
  }

  item(){               //method creating the items moving- consisted of 2 circles and an ellipse
    ellipse(-this.r/2,0,this.r/10,this.r/10);
    ellipse(+this.r/2,0,this.r/10,this.r/10);
    ellipse(0,0,2*this.r/3,this.r/4);
  }

  move(){     //Acceleration => Velocity => Position
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    let v = createVector (this.pos.x,this.pos.y);
  }

  detectCollision(){    //collision when character touches the obstacles or top and bottom edge of canvas
    //color detection if character touches obstacles
    //gets colour from points of circle around the character with radius 1.7*this.r
    let angle = TWO_PI / this.numItems;
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = this.pos.x + cos(a) * 1.7 * this.r;
      let sy = this.pos.y + sin(a) * 1.7 * this.r;
      let g = get(sx+2, sy+2);
      if (g[2] > 120 && g[2] < 140){
        return true;
      }
    }
    //check the edges
    if (this.pos.y + this.r > height || this.pos.y -  this.r < 0){
      return true;
    }
    return false;
  }

  detectD(){          //if CHARACTER touches blue food => make OBSTACLES dissapear
    for(f of foods){
      let d = dist(this.pos.x, this.pos.y, f.x, f.y);
      if (d < 2*this.r){
        return true;
      }
    }
  }
}
