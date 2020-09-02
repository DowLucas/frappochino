class Projectile {
    constructor(x, y, vel, angle, r, sh=0) {
      this.x = x;
      this.y = height-sh;
      this.velX = vel*cos(angle);
      this.velY = vel*sin(angle);
      this.gravity = g;
      this.hist = []
      this.hist.push(createVector(this.x, this.y))
      this.r = r/2
      this.fallen = false;
      this.falling = false;
      this.height = 0;
      
    }
    
    show() {
      fill(255);
      stroke(255);
      ellipse(this.x, this.y, this.r, this.r);
      strokeWeight(2);
      for (let i = 0; i < this.hist.length-1; i++) {
        line(this.hist[i].x, this.hist[i].y, this.hist[i+1].x,this.hist[i+1].y);
      }
      fill(255, 0 , 0, 150)
      noStroke();
      if (this.velY < 0 && !this.falling) {
        this.falling = true;
        this.topX = this.x;
        this.topY = this.y;
        this.framesLeft = count;
      

        this.textHeight = height-this.topY-fh;


      } else if (this.falling) {
        circle(this.topX, this.topY, 20)
        text('(' + round(this.topX) +', ' + round(this.textHeight)+')', this.topX-40, this.topY-20)
      }

      if (this.fallen) {
        text('(' + round(this.x) +', ' + round(0)+')', this.x-40, this.y-20)
      }

      fill(255);
    }
    
    
    update() {

      if (!this.fallen) {
        if (this.y > height-fh && count > 20) {
          this.y = height-fh
          this.fallen = true;
          this.velX = 0;
      }
        count++;  
        this.height = round(height-this.y);
        this.velY -= this.gravity/sm;
        this.x += this.velX/sm;
        this.y -= this.velY/sm;
        this.hist.push(createVector(this.x, this.y))
      
      } else {
        this.y = height-fh;
      }
    }
}
  