const cover0 = ( c ) => {

  let num_cols = 12;
  let num_rows;
  let square_width;


  c.setup = function(){

    let can = c.createCanvas(c.windowWidth*0.5,c.windowHeight*0.6);

    square_width = c.width / num_cols;
    num_rows = c.height / square_width;



  };

  c.draw = function(){

    let curr_color = c.color('#1B3022');

    //c.background('black');
    c.background(curr_color);

    c.fill('white');
    c.textSize(250);
    c.text('test', c.width/4, c.height*0.6);


    c.noFill();
    //c.stroke('black');
    c.stroke(curr_color);
    c.strokeWeight(2);



    c.translate(square_width/2, square_width/2);


    for (let gridY = 0; gridY < num_rows; gridY++){
      for (let gridX = 0; gridX < num_cols; gridX++){

        let mousePos = c.createVector(c.mouseX, c.mouseY);
        let currPos = c.createVector(gridX*square_width, gridY*square_width);
        let dir = mousePos.sub(currPos);

        for (let factor = 0.25; factor <= 1; factor+=0.25){
          let shift = (square_width / 2) - ((square_width*factor)/2);
          dir.setMag(shift);
          c.ellipse(currPos.x + dir.x, currPos.y + dir.y, square_width * factor);
        }
        // c.ellipse(gridX*square_width, gridY*square_width, square_width);


      }
    }


  };

};

const cover1 = ( c ) => {

  let num_cols = 12;
  let num_rows;
  let square_width;


  c.setup = function(){

    let can = c.createCanvas(c.windowWidth*0.5,c.windowHeight*0.6);

    square_width = c.width / num_cols;
    num_rows = c.height / square_width;



  };

  c.draw = function(){

    let curr_color = c.color('#839073');

    //c.background('black');
    //c.background(curr_color);
    c.background('white');

    c.fill(curr_color);
    c.textSize(250);
    c.text('trial', c.width/4, c.height*0.6);


    c.noFill();
    //c.stroke('black');
    c.stroke(curr_color);
    c.strokeWeight(2);



    c.translate(square_width/2, square_width/2);


    for (let gridY = 0; gridY < num_rows; gridY++){
      for (let gridX = 0; gridX < num_cols; gridX++){

        let mousePos = c.createVector(c.mouseX, c.mouseY);
        let currPos = c.createVector(gridX*square_width, gridY*square_width);
        let dir = mousePos.sub(currPos);

        for (let factor = 0.25; factor <= 1; factor+=0.25){
          let shift = (square_width / 2) - ((square_width*factor)/2);
          dir.setMag(shift);
          c.ellipse(currPos.x + dir.x, currPos.y + dir.y, square_width * factor);
        }
        // c.ellipse(gridX*square_width, gridY*square_width, square_width);


      }
    }


  };

};

const cover2 = ( c ) => {

  let num_cols = 12;
  let num_rows;
  let square_width;


  c.setup = function(){

    let can = c.createCanvas(c.windowWidth*0.5,c.windowHeight*0.6);

    square_width = c.width / num_cols;
    num_rows = c.height / square_width;



  };

  c.draw = function(){

    let curr_color = c.color('#F4442E');

    //c.background('black');
    //c.background(curr_color);
    c.background('white');

    c.strokeWeight(10);
    c.fill('white');
    c.textSize(250);
    c.text('error', c.width*0.15, c.height*0.6);


    c.noFill();
    //c.stroke('black');
    c.stroke(curr_color);
    c.strokeWeight(2);



    c.translate(square_width/2, square_width/2);


    for (let gridY = 0; gridY < num_rows; gridY++){
      for (let gridX = 0; gridX < num_cols; gridX++){

        let mousePos = c.createVector(c.mouseX, c.mouseY);
        let currPos = c.createVector(gridX*square_width, gridY*square_width);
        let dir = mousePos.sub(currPos);

        for (let factor = 0.25; factor <= 1; factor+=0.25){
          let shift = (square_width / 2) - ((square_width*factor)/2);
          dir.setMag(shift);
          c.ellipse(currPos.x + dir.x, currPos.y + dir.y, square_width * factor);
        }
        // c.ellipse(gridX*square_width, gridY*square_width, square_width);


      }
    }


  };

};

let coverP5_0 = new p5(cover0, 'sketch_12_17');
let coverP5_1 = new p5(cover1, 'sketch_12_17_1');
let coverP5_2 = new p5(cover2, 'sketch_12_17_2');
