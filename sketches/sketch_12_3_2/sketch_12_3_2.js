const chaikin = ( c ) => {

  let max_y; 
  let min_y;
  let iterations; 

  c.setup = function(){

    let can = c.createCanvas(c.windowWidth*0.5,c.windowHeight*0.6);
    can.mousePressed(c.mpHandler); 

    c.min_y = (c.height/4); // range of y value for points is center 1/2 of screen 
    c.max_y = c.min_y + (c.height/2);
    c.iterations = 6; 

  };

  c.draw = function(){

    c.noLoop();
    let initial_points = c.genPoints(); 
    c.makeCurve(initial_points);


  };

  c.makeCurve = function(points){

    c.showPoints(points);
    let pts = points; 

    for (let j = 0; j < c.iterations; j++){

      let return_list = []

      for (let i = 0; i < pts.length - 1; i++){
        let new_vec = c.chaikin_cut(pts[i],pts[i+1],0.25);
        return_list.push(new_vec); 

        let new_vec_rev = c.chaikin_cut(pts[i+1], pts[i],0.25);
        return_list.push(new_vec_rev);
      }
      pts = [];
      pts = return_list; 
      c.showPoints(pts);
    }

};

  c.chaikin_cut = function(a, b, ratio){

    // If ratio is greater than 0.5 flip it so we avoid cutting across the midpoint of the line.
    if (ratio > 0.5){
      ratio = 1 - ratio;
    }

    let x = c.lerp(a.x, b.x, ratio);
    let y = c.lerp(a.y, b.y, ratio);

    let return_vec = c.createVector(x,y); 

    return return_vec; 

  };

  c.mpHandler = function() {

    c.clear();
    let new_pts = c.genPoints();
    c.makeCurve(new_pts); 


  }; 

  c.genPoints = function() {

    points = []; 

    let temp = []; // generate x values and sort
    for (let i = 0; i < 30; i++){
      temp.push(c.int(c.random(0,c.width))); 
    }
    temp = c.sort(temp, temp.length); 

    for (x of temp){
      points.push(c.createVector(x,c.int(c.random(c.min_y,c.max_y))));
    }

    return points; 
  }; 

  c.showPoints = function(temp_points) {

    c.stroke('black');
    c.noFill();

    c.beginShape(); 
    for (let i = 0; i < temp_points.length; i++) {
      let tempx = temp_points[i].x; 
      let tempy = temp_points[i].y; 
      c.vertex(tempx,tempy);
    }
    c.endShape();

}




};

// let myp5 = new p5(sketch, document.getElementById('sketch_12_3'));

let myp5_2 = new p5(chaikin, 'sketch_12_3_2');


