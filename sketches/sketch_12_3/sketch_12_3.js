const sketch = ( s ) => {

  let max_y; 
  let min_y;
  let iterations; 

  s.setup = function(){

    let can = s.createCanvas(s.windowWidth*0.5,s.windowHeight*0.6);
    can.mousePressed(s.mpHandler); 

    s.min_y = (s.height/4); // range of y value for points is center 1/2 of screen 
    s.max_y = s.min_y + (s.height/2);
    s.iterations = 80; 

  };

  s.draw = function(){

    s.noLoop();
    let initial_points = s.genPoints(); 
    s.makeCurve(initial_points);


  };

  s.makeCurve = function(points){

    s.showPoints(points);
    let pts = points; 

    for (let j = 0; j < s.iterations; j++){

      let return_list = []

      for (let i = 0; i < pts.length - 1; i++){
        let new_vec = s.chaikin_cut(pts[i],pts[i+1],0.25);
        return_list.push(new_vec); 
      }
      pts = [];
      pts = return_list; 
      s.showPoints(pts);
    }

};

  s.chaikin_cut = function(a, b, ratio){

    // If ratio is greater than 0.5 flip it so we avoid cutting across the midpoint of the line.
    if (ratio > 0.5){
      ratio = 1 - ratio;
    }

    let x = s.lerp(a.x, b.x, ratio);
    let y = s.lerp(a.y, b.y, ratio);

    let return_vec = s.createVector(x,y); 

    return return_vec; 

  };

  s.mpHandler = function() {

    s.clear();
    let new_pts = s.genPoints();
    s.makeCurve(new_pts); 


  }; 

  s.genPoints = function() {

    points = []; 

    let temp = []; // generate x values and sort
    for (let i = 0; i < 30; i++){
      temp.push(s.int(s.random(0,s.width))); 
    }
    temp = s.sort(temp, temp.length); 

    for (x of temp){
      points.push(s.createVector(x,s.int(s.random(s.min_y,s.max_y))));
    }

    return points; 
  }; 

  s.showPoints = function(temp_points) {

    s.stroke('black');
    s.noFill();

    s.beginShape(); 
    for (let i = 0; i < temp_points.length; i++) {
      let tempx = temp_points[i].x; 
      let tempy = temp_points[i].y; 
      s.vertex(tempx,tempy);
    }
    s.endShape();

}




};

// let myp5 = new p5(sketch, document.getElementById('sketch_12_3'));

let myp5 = new p5(sketch, 'sketch_12_3');


