const lineDraw = ( c ) => {

  let bottomPts = []; 
  let topPts = []; 


  c.setup = function(){

    let can = c.createCanvas(c.windowWidth/4,c.windowWidth/4);
    can.mousePressed(c.mpHandler); 
    c.genPts();

  };

  c.draw = function(){

    c.noLoop();
    c.showPts();

  };

  c.showPts = function(){

    c.background('white'); 

    for (let i = 0; i < bottomPts.length; i++) {
      c.line(bottomPts[i].x,bottomPts[i].y,topPts[i].x,topPts[i].y)
    }

  };

  c.genPts = function(){

    let i = 0; 
    while(i < 5000) {

      bottomPts.push(c.createVector(c.random(c.width),c.random(c.height/2,c.height)));
      topPts.push(c.createVector(c.random(c.width),c.random(c.height/2)));

      i++; 
    };

  };

  c.mpHandler = function(){


    bottomPts = [];
    topPts = [];

    c.genPts();
    c.showPts();

  };


};

const dotDraw = ( c ) => {

  let pts = []; 

  c.setup = function(){
    let can = c.createCanvas(c.windowWidth/4,c.windowWidth/4);
    can.mousePressed(c.mpHandler); 
    c.genPts(); 

  };

  c.draw = function(){

    c.noLoop(); 
    c.showPts(); 

  }; 

  c.showPts = function(){

    c.stroke(2);

    for (let i = 0; i < pts.length; i++) {
      c.point(pts[i].x,pts[i].y);
    }

  };

  c.genPts = function(){

    pts = []; 
    c.background('white');

    let i = 0; 
    while (i < 50000){
      pts.push(c.createVector(c.random(c.width),c.random(c.height)));
      i++;
    }

  };

  c.mpHandler = function(){

    c.genPts();
    c.showPts(); 

  };

};

const normalDotDraw = ( c ) => {

  let pts = []; 

  c.setup = function(){

    let can = c.createCanvas(c.windowWidth/4,c.windowWidth/4);
    can.mousePressed(c.mpHandler);
    c.genPts(); 

  };

  c.draw = function(){

    c.noLoop();
    c.showPts(); 

  }; 
    
  c.genPts = function(){

    pts = []; 

    let i = 0; 
    while (i < 90000){
      pts.push(c.createVector(c.random(c.width),c.randomGaussian(0,50)));
      i++;
    }

  };

  c.showPts = function(){

    c.background('white');
    c.stroke(2);

    for (let i = 0; i < pts.length; i++) {
      c.point(pts[i].x,pts[i].y);
    }
   }; 

   c.mpHandler = function(){

    c.genPts(); 
    c.showPts();

   }; 

};

const centerNormalDotDraw = ( c ) => {

  let pts = []; 

  c.setup = function(){

    let can = c.createCanvas(c.windowWidth/4,c.windowWidth/4);
    can.mousePressed(c.mpHandler);
    c.genPts(); 

  };
   
  c.draw = function(){

    c.noLoop(); 
    c.showPts();



   }; 

  c.genPts = function(){

    pts = []; 
    let i = 0; 
    while (i < 100000){
      pts.push(c.createVector(c.randomGaussian(c.width/2,60),c.randomGaussian(c.height/2,60)));
      i++;
    }

  };

  c.showPts = function(){

    c.background('white'); 
    c.stroke(2);

    for (let i = 0; i < pts.length; i++) {
      c.point(pts[i].x,pts[i].y);
    }

  };

  c.mpHandler = function(){

    c.genPts(); 
    c.showPts();

  };


};



let normalDotDrawP5 = new p5(normalDotDraw, 'sketch_12_8');
let lineDrawP5 = new p5(lineDraw, 'sketch_12_8');
let dotDrawP5 = new p5(dotDraw, 'sketch_12_8');
let centerNormalDotDrawP5 = new p5(centerNormalDotDraw, 'sketch_12_8');
