//class creating obstacles inspired by seaweed
//the shape is created by the sin wave and the amplitude is changed by a different random wave, so it looks like moving
class  Obstacle{
  constructor( x, t,sc){
    this.numDots = 40;
    this.x = x
    this.t = t;
    this.sc = 0.1*sc;
    this.counter1 = int(random(0,10));
  }

  move(){
    this.x += speed;
  }

  display(){
    let yI = height/this.numDots;
    for (let i = 10; i < this.numDots; i++){
      fill(150 + i,100,70,100);
      let y = yI * i;
      let x = (pow(sin(y*0.01),2)/(0.02*y)) * 200 * sin(this.counter1);
      
      //bottom
      if (this.t ==0){
        push();
        scale(this.sc)
        ellipse(x + (this.x/this.sc), y-(10*yI)+(height/this.sc) - 300, 50, 50);
        pop();
      }

      //top
     if (this.t ==1){
        push();
        scale(this.sc);
        ellipse(x + (this.x/this.sc), (height*this.sc) - y+(10*yI), 50, 50);
        pop();
      }
      this.counter1 += 0.001;
    }
  }
}
